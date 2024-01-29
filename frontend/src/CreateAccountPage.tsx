import React, {useState} from "react";
import { TextField, Button, Link } from "@mui/material";
import { invoke } from "@tauri-apps/api/tauri";
import LoginPage from "./LoginPage";

const CreateAccountPage: React.FC = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');

    const handleCreateAccount = async () => {
        try {
            const response = await invoke('create_account', {email, password});
            console.log(response)
            //TODO handle successfull create_account attempt by redirecting to back to main page 
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
          <h2>Create Account</h2>
          <form>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" onClick={handleCreateAccount}>
              Create Account
            </Button>
          </form>
          <p>
            Already have an account?{' '}
            <Link href="#" onClick={() => LoginPage}>
              Login
            </Link>
          </p>
        </div>
      );
    };
    
    export default CreateAccountPage;