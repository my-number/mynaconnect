use pcsc::{Context, Scope, Card, Error};

use std::ffi::CStr;
pub(crate) fn open_card(name: String) -> Result<Card, Error> {
    let context = Context::establish(Scope::User)?;
    let mut vname = name.as_bytes().to_vec();
    vname.push(0u8);
    context.connect(
        unsafe { CStr::from_bytes_with_nul_unchecked(&vname[..]) },
        pcsc::ShareMode::Exclusive,
        pcsc::Protocols::ANY,
    )
}
