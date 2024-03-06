import { invoke } from '@tauri-apps/api/tauri';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';



interface VerifyCodeResponse {
  success: boolean;
  message: string;
}

const VerifyCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    if (location.state) {
      setEmail(location.state.email);
      (window as any).__TAURI__.invoke('log', `Email from state: ${location.state.email}`)
    }
  }, [location]);

  console.log("we are now in the verify component");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response: VerifyCodeResponse = await invoke('verify_code', { email, code })
      if (response.success) {
        navigate('/reset-password')
      } else {
        setErrorMessage(response.message)
      }
    } catch (error) {
      console.error('Ts failed to verify code', error)
    }
  };

  const handleResend = async () => {
    try {
      await invoke('send_verification_code', { email });
    } catch (error) {
      console.error('TS failed to resend verification code', error);
    }
  }

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter verification code"
        required
      />
      <button type="submit">Verify</button>
    </form>
    <button onClick={handleResend}>Resend code</button>
    </div>
  );
};

export default VerifyCode;
