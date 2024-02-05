import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CommentIcon from '@mui/icons-material/Comment';
import AppsIcon from '@mui/icons-material/Apps';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import BackupIcon from '@mui/icons-material/Backup';
import BarChartIcon from '@mui/icons-material/BarChart';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { menu } from "../../../data";
import { Link } from "react-router-dom";
import "./menu.scss"

interface IconComponents {
  [key: string]: React.ComponentType<any>;
}

const Menu = () => {
  const IconComponents: IconComponents = {
    HomeIcon: HomeIcon,
    PersonIcon: PersonIcon ,
    GroupIcon: GroupIcon,
    InventoryIcon: InventoryIcon,
    ShoppingCartIcon: ShoppingCartIcon,
    CommentIcon: CommentIcon,
    AppsIcon: AppsIcon,
    NoteAltIcon: NoteAltIcon,
    FormatAlignLeftIcon: FormatAlignLeftIcon,
    CalendarMonthIcon: CalendarMonthIcon,
    SettingsIcon: SettingsIcon,
    BackupIcon: BackupIcon,
    BarChartIcon: BarChartIcon,
    MenuBookIcon: MenuBookIcon,
  };

  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => {
            const Icon = IconComponents[listItem.icon];
            return (
              <Link to={listItem.url} className="listItem" key={listItem.id}>
                {Icon && <Icon />}
                <span className="listItemTitle">{listItem.title}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
