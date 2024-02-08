import Navbar from "../../../admin/components/navbar/Navbar";
import Footer from "../../../admin/components/footer/Footer";
import Menu from "../../../admin/components/menu/Menu";

interface LayoutProps {
    isAdmin: boolean;
}

const Layout: React.FC<LayoutProps> = ({ isAdmin, children}) => {
    return (
        <div className="main">
          <Navbar isAdmin={isAdmin}/> 
          <div className="container">
            <div className="menuContainer">
              <Menu />
            </div>
            <div className="contentContainer">
               { children }
            </div>
          </div>
          <Footer />
        </div>
    );
};