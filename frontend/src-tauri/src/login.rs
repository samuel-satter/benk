use serde::Serialize;

use crate::errors::BoxError;

#[derive(Serialize)]
struct MyState {
  s: std::sync::Mutex<String>,
  t: std::sync::Mutex<std::collections::HashMap<String, String>>,
}

#[derive(Serialize)]
struct LoginDTO {
  email: String,
  password: String,
}

// remember to call `.manage(MyState::default())` please :praying_hands: :100: 
#[tauri::command]
async fn command_name(state: tauri::State<'_, MyState>) -> Result<(), String> {
  *state.s.lock().unwrap() = "new string".into();
  state.t.lock().unwrap().insert("key".into(), "value".into());
  Ok(())
}

#[tauri::command]
pub async fn login(email: String, password: String) -> Result<String, BoxError> {
    let client = reqwest::Client::new();
    let auth_url = "http://localhost:8080/jwt/authenticate";
    
    let login_dto = LoginDTO{
        email,
        password,
    };
    
    let response = match client.post(auth_url).json(&login_dto).send().await {
        Ok(resp) => resp,
        Err(e) => return Err(BoxError {
            message: e.to_string()
        })
    };

    if !response.status().is_success() {
        return Err(BoxError {
            message: "Failed to authenticate".to_string(),
        });
    }

    let jwt: String = match response.text().await {
        Ok(text) => text,
        Err(e) => return Err(BoxError {  
            message: e.to_string()
        })
    };

  Ok(jwt)
}

#[tauri::command]
pub async fn is_admin(email: String) -> Result<bool, BoxError> {
    let client = reqwest::Client::new();
    let url = format!("http://localhost:8080/user/{}/isAdmin", email);
    let response = match client.get(&url).send().await {
        Ok(resp) => resp,
        Err(e) => return Err(BoxError { message: e.to_string() }),
    };

    println!("Response status: {}", &response.status());
  

    if !response.status().is_success() {
        return Err(BoxError {
            message: "Failed to check if user is admin".to_string(),
        });
    }

    let is_admin: bool = match response.json().await {
        Ok(u) => {
          println!("response body {:?}", u);
          u
        },

        Err(e) => return Err(BoxError { message: e.to_string() }),
    };

    Ok(is_admin)
}

// #[tauri::command]
// pub async fn is_admin(user_id: String) -> Result<bool, BoxError> {
//   let client = reqwest::Client::new();
//   let check_admin_url = format!("http://localhost:8080/user/{}/isAdmin", user_id);
//   let response = client.get(&check_admin_url).await?;

//   let is_admin: bool = response.json().await?;
//   Ok(is_admin)
// }
// #[tauri::command]
// pub async fn login(email: String, password: String) -> Result<String, BoxError> {
//   let client = reqwest::Client::new();
//   let auth_url = "http://localhost:8080/jwt/authenticate";
//   let admin_check_url = "http://localhost:8080/user/isAdmin";
  
//   let login_dto = LoginDTO{
//     email,
//     password,
//   };
  
//   let response = match client.post(auth_url).json(&login_dto).send().await {
//     Ok(resp) => resp,
//     Err(e) => return Err(BoxError {
//       message: e.to_string()
//     })
//     };

//     if !response.status().is_success() {
//       return Err(BoxError {
//         message: "failed to auth :(".to_string(),
//       });
//     }

//     let body: String = match response.text().await {
//       Ok(text) => text,
//       Err(e) => return Err(BoxError { 
//         message: e.to_string()
//       })
//     };

//     println!("response body: {}", body);

//     let user_id: i64 = match serde_json::from_str(&body) {
//       Ok(id) => id,
//       Err(e) => return Err(BoxError {
//           message: e.to_string(),
//       }),
//     };


//     let admin_response = match client.get(admin_check_url).query(&[("id", user_id)]).send().await {
//       Ok(resp) => resp,
//       Err(e) => return Err(BoxError {
//         message: e.to_string(),
//       }),
//     };

//     if !admin_response.status().is_success() {
//       return Err(BoxError {
//         message: "failed to check admin status".to_string(),
//       });
//     }

//     let is_admin: bool = match admin_response.json().await {
//       Ok(admin) => admin,
//       Err(e) => return Err(BoxError {
//         message: e.to_string(),
//       }),
//     };

//     Ok(is_admin.to_string())
//   }
