use serde::Serialize;

#[derive(Serialize, Debug)]
pub struct BoxError {
    pub message: String,
}

impl From<Box<dyn std::error::Error>> for BoxError {
    fn from(err: Box<dyn std::error::Error>) -> Self {
        BoxError {
            message: err.to_string(),
        }
    }
}