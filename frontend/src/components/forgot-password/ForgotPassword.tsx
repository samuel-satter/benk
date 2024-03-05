import "./forgotPassword.scss"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();



  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await invoke('send_verification_code', { email });
      navigate('verify-code/', { state: { email } });
    } catch (error) {
      console.error('Ts failed to send verification code', error)
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
        name="email" 
        id="email"
        placeholder="Enter your email"
        required
      />
    <button>Submit</button>
    </form>
     <button onClick={() => navigate('verify-code/')}>Go to Verify Code!</button>
    </div>
  );
};

export default ForgotPassword;
