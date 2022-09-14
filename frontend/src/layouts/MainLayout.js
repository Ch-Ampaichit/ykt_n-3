import React, { useEffect, useState } from "react";
import {
  Layout,
  Drawer,
  Typography,
  Affix,
  Row,
  Menu,
  Col,
  Avatar,
  Space,
  Badge,
  Dropdown,
  List,
} from "antd";
import {
  BellOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// project import
import { itemMenu } from "config";
import { logout } from "features/authentication/authenSlice";
import MenuIcon from "./Menu";

const { Content, Header, Footer } = Layout;

const { Text } = Typography;

const configMenuItem = (menus) => {
  let items = menus
    .map((menu) => {
      // console.log("menu: ", menu.icon);
      let subMenu = [];
      if (menu.children.length > 0) {
        subMenu = configMenuItem(menu.children);
      }

      return {
        key: menu.key,
        title: menu.title,
        icon: <MenuIcon iconName={menu.icon} />,
        label:
          menu.children.length > 0 ? (
            menu.label
          ) : (
            <Link to={`/${menu.key}`}>{menu.title}</Link>
          ),
        type: menu.type,
        children: subMenu.length > 0 ? subMenu : null,
      };
    })
    .sort();
  return items;
};

let menuItems = [];

const MainLayout = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [notiVisibleDrawer, setNotiVisibleDrawer] = useState(false);
  // eslint-disable-next-line
  const [notiCount, setNotiCount] = useState(0);

  const navigation = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const authUser = useSelector((state) => state.authentication.user);

  // authUser && console.log("authUser: ", authUser.user_setup.menu_suite.menus);

  if (authUser) {
    menuItems = authUser.user_setup.menu_suite.menus;
  }
  // const menus = authUser.user_setup.menu_suite.menus;
  // console.log("menu: ", menus);
  const items = configMenuItem(menuItems);

  // console.log("menu MainLayout: ", items);

  const profileMenu = [
    { type: "divider" },
    {
      label: "Signout",
      key: "signout",
      icon: <LogoutOutlined />,
      onClick: () => {
        handleLogout();
      },
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigation("/login");
  };

  useEffect(() => {
    // console.log("Main layout location: ", location);
    localStorage.setItem("currLocation", location.pathname);
    document.title = location.pathname.replace("/", "").toUpperCase();
  }, [location]);

  useEffect(() => {
    // console.log("user: ", user);
  }, []);

  return (
    <Layout>
      <Affix offsetTop={0}>
        <Header
          style={{
            width: "100%",
            // boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
            padding: "6, 16px",
          }}
        >
          <Row justify="space-around" gutter={1}>
            <Col>
              {React.createElement(MenuUnfoldOutlined, {
                onClick: () => setDrawerVisible(!drawerVisible),
                style: { fontSize: 18 },
              })}
            </Col>
            <Col
              flex={12}
              style={{
                textAlign: "left",
                marginLeft: 5,
              }}
            >
              <Text style={{ fontSize: 17 }}>
                YOKOYAM KOGYO (THAILAND) CO.,LTD.
              </Text>
            </Col>
            <Col flex={1} style={{ textAlign: "right" }} xs={0} sm={3}>
              <Space size={8} direction={"horizontal"}>
                <div onClick={() => setNotiVisibleDrawer(true)}>
                  <Badge
                    count={notiCount}
                    size="small"
                    offset={[-25, 28]}
                    title="Notification"
                    color={"orange"}
                  >
                    <Avatar
                      src={
                        <BellOutlined
                          style={{
                            fontSize: 22,
                            padding: 3,
                            color: "#001529",
                          }}
                        />
                      }
                    />
                  </Badge>
                </div>
                <Dropdown
                  arrow
                  trigger={["click"]}
                  overlayStyle={{ width: 180 }}
                  overlay={
                    <Menu
                      items={[
                        {
                          label: authUser
                            ? authUser.first_name
                              ? `${authUser.first_name}  ${authUser.last_name}`
                              : `${authUser.username.toUpperCase()}`
                            : "Usere profile",
                          key: "userProfile",
                          // type: "group",
                        },
                        { type: "divider" },
                        ...itemMenu.profile,
                        ...profileMenu,
                      ]}
                    />
                  }
                >
                  <Avatar
                    style={{
                      backgroundColor: "#fff",
                      color: "#001529",
                      padding: 5,
                      width: 40,
                      height: 40,
                    }}
                    src={<UserOutlined style={{ fontSize: 28 }} />}
                  />
                </Dropdown>
              </Space>
            </Col>
          </Row>
        </Header>
      </Affix>
      <Layout>
        <Content style={{ margin: 15 }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <Space direction="horizontal" align="center">
            <Text style={{ fontSize: 12 }}>
              &copy; YOKOYAMA KOGYO (THAILAND) CO.,LTD. - Powered by CHATCHAI
              AMPAICHIT
            </Text>
          </Space>
        </Footer>
      </Layout>
      <Drawer
        title={<Typography.Title level={4}>N+3 Forecast</Typography.Title>}
        headerStyle={{ backgroundColor: "#26c9ff" }}
        drawerStyle={{ backgroundColor: "#b3ecff" }}
        // footer={<Button>YKT</Button>}
        // footerStyle={{ backgroundColor: "#26c9ff" }}
        closable={false}
        // extra={<UserOutlined />}
        width={250}
        placement="left"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        <Menu
          style={{ backgroundColor: "#b3ecff" }}
          mode="inline"
          items={items}
        />
      </Drawer>
      <Drawer
        visible={notiVisibleDrawer}
        title="Notification"
        onClose={() => setNotiVisibleDrawer(false)}
      >
        <List
          style={{ padding: 10 }}
          itemLayout="horizontal"
          // dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={item.title}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
      </Drawer>
    </Layout>
  );
};

export default MainLayout;
