use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub id: u64,
    pub is_admin: bool,
    pub first_name: String,
    pub last_name: String,
    pub pwd: String,
    pub email: String,
    pub phone_number: String,
    pub origin: String,
    pub account_number: String,
    pub balance: f64,
    pub status: bool,
    pub created_at: Option<String>,
    pub updated_at: Option<String>,
}