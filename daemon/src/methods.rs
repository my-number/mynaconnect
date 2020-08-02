use crate::error::Error;
use crate::utils::open_card;
use jsonrpc_core::types::Value;
use jsonrpc_derive::rpc;
use myna::card::apdu_trait::{Apdu, Error as ApduError};
use pcsc::{Card, Context, Disposition, Protocols, Scope, ShareMode};
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Serialize, Deserialize)]
pub struct Reader {
    /// Reader name
    name: String,
    /// PCSC Error code
    error: Option<u32>,
}

struct Responder(Card);
impl Apdu for Responder {
    type TransErr = pcsc::Error;
    fn raw_transmit(&self, data: Vec<u8>) -> Result<Vec<u8>, Self::TransErr> {
        let card = &self.0;

        let mut buf = [0u8; 300];
        let result = card.transmit(&data[..], &mut buf)?;
        println!("{:?}", result);
        Ok(result.to_vec())
    }
}

#[rpc(server)]
pub trait Methods {
    #[rpc(name = "getReaders")]
    fn get_readers(&self) -> Result<Vec<Reader>, Error>;
    #[rpc(name = "getStatus")]
    fn get_status(&self, name: String) -> Result<Value, Error>;
    #[rpc(name = "getCert")]
    fn get_cert(&self, name: String) -> Result<Value, Error>;
}

pub struct RpcImpl {}
impl Default for RpcImpl {
    fn default() -> Self {
        Self {}
    }
}

impl Methods for RpcImpl {
    fn get_readers(&self) -> Result<Vec<Reader>, Error> {
        let context = Context::establish(Scope::User)?;
        let buflen = context.list_readers_len()?;
        let mut buf: Vec<u8> = vec![0u8; buflen];
        let reader_iter = context.list_readers(&mut buf)?;
        let readers: Vec<Reader> = reader_iter
            .map(|raw_name| {
                let card_result = context.connect(raw_name, ShareMode::Shared, Protocols::ANY);

                Reader {
                    name: raw_name
                        .to_str()
                        .expect("PCSC reader names is always valid UTF8")
                        .to_string(),
                    error: match card_result {
                        Ok(card) => {
                            let _ = card.disconnect(Disposition::LeaveCard);
                            None
                        }
                        Err(e) => Some(e as u32),
                    },
                }
            })
            .collect();
        Ok(readers)
    }
    fn get_status(&self, name: String) -> Result<Value, Error> {
        let card = open_card(name)?;
        let (name_len, atr_len) = card.status2_len()?;
        let mut name_buf = vec![0u8; name_len];
        let mut atr_buf = vec![0u8; atr_len];
        let status = card.status2(&mut name_buf[..], &mut atr_buf[..])?;
        let readers: Vec<String> = status
            .reader_names()
            .map(|s| s.to_str().unwrap().to_string())
            .collect();
        //Ok(1)
        Ok(json!({
            "name": readers,
            "atr": status.atr()
        }))
    }
    fn get_cert(&self, name: String) -> Result<Value, Error> {
        let card = open_card(name)?;

        let mut responder = Responder(card);

        responder.select_jpki_ap()?;
        responder.select_jpki_cert_auth()?;
        let cert = responder.read_binary()?;
        Ok(json!({ "cert": cert }))
    }
}
