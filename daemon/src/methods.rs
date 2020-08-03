use crate::error::Error;
use hex::decode;
use crate::utils::open_card;
use jsonrpc_core::types::Value;
use jsonrpc_derive::rpc;
use myna::card::Apdu;
use myna::utils::check_pin;

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
    fn transmit(&self, data: Vec<u8>) -> Result<Vec<u8>, Self::TransErr> {
        let card = &self.0;

        let mut buf = [0u8; 300];
        let result = card.transmit(&data[..], &mut buf)?;
        println!("{:?}", data);
        Ok(result.to_vec())
    }
}

#[rpc(server)]
pub trait Methods {
    #[rpc(name = "getReaders")]
    fn get_readers(&self) -> Result<Vec<Reader>, Error>;
    #[rpc(name = "getStatus")]
    fn get_status(&self, name: String) -> Result<Value, Error>;
    #[rpc(name = "getAuthCert")]
    fn get_auth_cert(&self, name: String) -> Result<Value, Error>;
    #[rpc(name = "computeAuthSig")]
    fn compute_auth_sig(&self, name: String, pin: String, hash_hex: String) -> Result<Value,Error>;
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
                            // TODO: Check jpki token(if needed)
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
    fn get_auth_cert(&self, name: String) -> Result<Value, Error> {
        let card = open_card(name)?;

        let mut responder = Responder(card);

        // TODO: Check jpki token(if needed)
        responder.select_jpki_ap()?;
        responder.select_jpki_cert_auth()?;
        let cert = responder.read_binary()?;
        Ok(json!({ "cert": cert }))
    }
    fn compute_auth_sig(&self, name: String, pin: String, hash_hex: String) -> Result<Value, Error> {
        if !check_pin(&pin) {
            return Err(Error::Execution("PIN is invalid"))
        }
        let card = open_card(name)?;

        let mut responder = Responder(card);

        // TODO: Check jpki token(if needed)
        responder.select_jpki_ap()?;
        responder.select_jpki_auth_pin()?;
        responder.verify_pin(&pin)?;
        responder.select_jpki_auth_key()?;
        let hash = decode(hash_hex)?;
        let sig = responder.compute_sig(&hash[..])?;
        Ok(json!({ "sig": sig }))
    }
}
