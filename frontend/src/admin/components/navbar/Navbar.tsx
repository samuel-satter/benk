import "./navbar.scss"
// import mainLogo from "../../../assets/logo.png"
import logoOnly from "../../../assets/logo-only.png"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import AppsIcon from '@mui/icons-material/Apps';
import ExpandIcon from '@mui/icons-material/Expand';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logoOnly} alt="" className="logo-image" />
        <span>BENK ADMIN</span>
      </div>
      <div className="icons">
        <SearchIcon />
        <AppsIcon />
        <ExpandIcon />
        <div className="notification">
        <NotificationsNoneIcon />
          <span>1</span>
        </div>
        <div className="user">
          <AccountCircleIcon />
          <span>Samuel</span>
        </div>
        <SettingsIcon />
      </div>
    </div>
  );
};

export default Navbar
