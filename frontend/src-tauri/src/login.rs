#[derive(Default)]
struct MyState {
  s: std::sync::Mutex<String>,
  t: std::sync::Mutex<std::collections::HashMap<String, String>>,
}

#[dervie(Serialize)]
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

async fn login(email: String, password: String) -> Result<String, BoxError> {
  let client = reqwest::Client::new();
  let auth_url = "http://localhost:8080/jwt/authenticate";
  let admin_check_url = "http://localhost:8080/user/isAdmin";
  
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
        message: "failed to auth :(".to_string(),
      });
    }

    let body: String = match response.text().await {
      Ok(text) => text,
      Err(e) => return Err(BoxError { 
        message: e.to_string()
      })
    };

    println!("response body: {}", body);

    let user_id: i64 = match response.json().await {
      Ok(id) => id,
      Err(e) => return Err(BoxError {
        message: e.to_string(),
      }),
    };

    let admin_response = match client.get(admin_check_url).query(&[("id", user_id)]).send().await {
      Ok(resp) => resp,
      Err(e) => return Err(BoxError {
        message: e.to_string(),
      }),
    };

    if !admin_response.status().is_success() {
      return Err(BoxError {
        message: "failed to check admin status".to_string(),
      });
    }

    let is_admin: bool = match admin_response.json().await {
      Ok(admin) => admin,
      Err(e) => return Err(BoxError {
        message: e.to_string(),
      }),
    };

    Ok(is_admin)
  }


fn create_account(email: String, password: String) -> Result<String, String> {
    Ok(format!("user successfully created account with email: {}"), email)
}