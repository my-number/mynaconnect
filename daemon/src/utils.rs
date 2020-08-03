use crate::error::Error;
use pcsc::{Card, Context, Error as PcscError, Scope};
use std::ffi::CStr;
pub(crate) fn open_card(name: String) -> Result<Card, PcscError> {
    let context = Context::establish(Scope::User)?;
    let mut vname = name.as_bytes().to_vec();
    vname.push(0u8);
    context.connect(
        unsafe { CStr::from_bytes_with_nul_unchecked(&vname[..]) },
        pcsc::ShareMode::Exclusive,
        pcsc::Protocols::ANY,
    )
}

const fn is_digit(ch: u8) -> bool {
    ('0' as u8 <= ch) & (ch <= '9' as u8)
}
pub(crate) fn check_pin(pin_str: &str) -> bool {
    let pin = pin_str.as_bytes();
    pin.len() == 4
        && is_digit(pin[0])
        && is_digit(pin[1])
        && is_digit(pin[2])
        && is_digit(pin[3])
}
