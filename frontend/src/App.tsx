import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Home from './admin/pages/home/Home';
import Users from './admin/pages/users/Users';
import Navbar from './admin/components/navbar/Navbar';
import Menu from './admin/components/menu/Menu';
import Footer from './admin/components/footer/Footer';
import Login from "./components/login/Login";
import Finance from "./admin/pages/finance/finance";
import CreateAccount from "./components/create-account/CreateAccount";
import ForgotPassword from "./components/forgot-password/ForgotPassword";
import ResetPassword from "./components/reset-password/ResetPassword";
import VerifyCode from "./components/verify-code/VerifyCode";

function App() {

  const Layout = () => {
    return (
      <div className="main">
        <Navbar/> 
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password/*" element={<ForgotPassword />}>
          <Route path="verify-code/" element={<VerifyCode />} />
        </Route>
          {/* <Route path="reset-password" element={<ResetPassword />} /> */}

        <Route path="/admin/*" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="finance" element={<Finance />} />
          
        </Route>
        <Route path="/user/*" element={<Home />}>

        </Route>

      </Routes>
    </Router>
  );
}
export default App;