import { invoke } from '@tauri-apps/api/tauri';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  

  useEffect(() => {
    if (location.state) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/reset-password');
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