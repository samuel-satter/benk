// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod user;
mod login;
mod errors;

use tauri_plugin_log::LogTarget;
use user::{get_all_users, get_user, save_user};
use login::login;
use login::is_admin;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
    .plugin(tauri_plugin_log::Builder::default().targets([
        LogTarget::LogDir,
        LogTarget::Stdout,
        LogTarget::Webview,
    ]).build())
        .invoke_handler(tauri::generate_handler![
            greet,
            get_all_users,
            get_user,
            save_user,
            is_admin,
            login
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

