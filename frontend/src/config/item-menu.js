import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const itemMenu = {
  profile: [
    {
      label: <Link to={"/profile"}>Profile</Link>,
      key: "profile",
      icon: <UserOutlined />,
    },
    // {
    //   label: <Link to={"/setting"}>Setting</Link>,
    //   key: "setting",
    //   icon: <SettingOutlined />,
    // },
  ],
  footer: [],
};
