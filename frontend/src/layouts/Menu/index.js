import {
  InboxOutlined,
  TeamOutlined,
  SettingOutlined,
  ReconciliationOutlined,
  FolderOutlined,
  TagOutlined,
  DashboardOutlined,
  ContactsOutlined,
  BarChartOutlined,
  LineChartOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import React from "react";

// <FolderOutlined />,<TagOutlined />, <DashboardOutlined />,<ContactsOutlined />,<BarChartOutlined />,<LineChartOutlined />
// <DatabaseOutlined />

const MenuIcon = (props) => {
  const { iconName } = props;
  //   console.log("iconName: ", iconName);
  switch (iconName) {
    case "InboxOutlined":
      return <InboxOutlined />;
    case "TeamOutlined":
      return <TeamOutlined />;
    case "SettingOutlined":
      return <SettingOutlined />;
    case "ReconciliationOutlined":
      return <ReconciliationOutlined />;
    case "TagOutlined":
      return <TagOutlined />;
    case "FolderOutlined":
      return <FolderOutlined />;
    case "DashboardOutlined":
      return <DashboardOutlined />;
    case "ContactsOutlined":
      return <ContactsOutlined />;
    case "BarChartOutlined":
      return <BarChartOutlined />;
    case "LineChartOutlined":
      return <LineChartOutlined />;
    case "DatabaseOutlined":
      return <DatabaseOutlined />;
    default:
      return <></>;
  }
};

export default MenuIcon;
