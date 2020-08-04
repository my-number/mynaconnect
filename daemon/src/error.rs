use hex::FromHexError;
use jsonrpc_core::types::error::{Error as RpcErr, ErrorCode as RpcErrCode};
use jsonrpc_core::types::Value;
use myna::error::ApduError;
use pcsc;

#[repr(i64)]
pub enum ErrorCode {
    PcscError = -1,
    UnknownError = -2,
    CommandError = -3,
}

pub enum Error {
    Pcsc(pcsc::Error),
    Command,
    Execution(&'static str),
    Parse,
    Other,
}

impl From<pcsc::Error> for Error {
    fn from(e: pcsc::Error) -> Self {
        Self::Pcsc(e)
    }
}
impl From<ApduError<pcsc::Error>> for Error {
    fn from(e: ApduError<pcsc::Error>) -> Self {
        match e {
            ApduError::Transmission(e) => Self::Pcsc(e),
            ApduError::Command(sw1, sw2) => Self::Command,
            ApduError::Execution(s) => Self::Execution(s),
            _ => Self::Other,
        }
    }
}
impl From<FromHexError> for Error {
    fn from(_: FromHexError) -> Self {
        Self::Parse
    }
}

impl Into<RpcErr> for Error {
    fn into(self) -> RpcErr {
        match self {
            Error::Pcsc(e) => RpcErr {
                code: RpcErrCode::ServerError(ErrorCode::PcscError as i64),
                message: e.to_string(),
                data: Some(Value::Number((e as u64).into())),
            },
            _ => RpcErr {
                code: RpcErrCode::ServerError(ErrorCode::UnknownError as i64),
                message: "Unknown Error".to_string(),
                data: None,
            },
        }
    }
}
