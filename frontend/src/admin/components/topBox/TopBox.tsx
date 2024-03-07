import "./topBox.scss";
import image from "../../../assets/logo-only.png";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

type User = {
  id: number;
  first_name: string;
  email: string;
  balance: number;
};

const TopBox = () => {
  const [topUsers, setTopUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await invoke<User[]>("get_top_users");
        setTopUsers(data);
      } catch (error) {
        console.error("failed to fetch users:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="topBox">
      <h1>Top Users</h1>
      <div className="list">
        {topUsers.map((user) => (
          <div className="listItem" key={user.id}>
            <div className="user">
              <img src={image} alt="" />
              <div className="userTexts">
                <span className="firstname">{user.first_name}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <span className="balance">${user.balance}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
