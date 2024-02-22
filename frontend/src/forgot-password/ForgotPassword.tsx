import "./forgotPassword.scss"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string | undefined>();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    navigate('/forgot-password/verify');
  };

  return (
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
    </form>
  );
};

export default ForgotPassword
