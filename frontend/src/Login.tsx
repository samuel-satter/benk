interface LoginProps {
    onLogin: (role: string) => void;
  }
  
  const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const handleAdminLogin = async () => {
      onLogin('admin');
    };
  
    const handleUserLogin = async () => {
      onLogin('user');
    };
  
    return (
      <div>
        <h2>Login</h2>
        <button onClick={handleAdminLogin}>Login as Admin</button>
        <button onClick={handleUserLogin}>Login as User</button>
      </div>
    );
};
  
  export default Login;
