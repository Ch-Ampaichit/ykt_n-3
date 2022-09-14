import {
  Avatar,
  Col,
  Row,
  Typography,
  Form,
  Input,
  // Checkbox,
  Button,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getWindowSize } from "utils";
import CompanyLogo from "components/Logo/CompanyLogo";
import { authLogin } from "features/authentication/authenSlice";

const Login = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize);
  const dispatch = useDispatch();

  const boxsize = (hPercent) => {
    return (hPercent / 100) * windowSize.innerHeight;
  };

  function handleSubmitLogin(event) {
    // console.log("login data: ", event);
    dispatch(authLogin(event));
  }

  useEffect(() => {
    document.title = "Login";

    function handleWindowResize() {
      setWindowSize(getWindowSize);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div>
      <Row
        justify="center"
        align="middle"
        // gutter={(10, 10)}
        // style={{ backgroundColor: "#ededed", height: "100vh" }}
      >
        <Col xs={24} sm={18} md={13} lg={9} xl={8}>
          <Row justify="center" align="bottom" style={{ height: boxsize(15) }}>
            <div>
              <CompanyLogo />
            </div>
          </Row>
          <Row justify="center" align="top">
            <div style={{ marginTop: -10 }}>
              <Typography.Title level={5}>
                YOKOYAMA KOGYO (THAILAND) CO.,LTD.
              </Typography.Title>
            </div>
          </Row>
          <Row
            justify="space-around"
            align="top"
            style={{
              height: boxsize(65),
            }}
          >
            <Col
              xs={22}
              sm={22}
              md={22}
              lg={21}
              xl={18}
              style={{
                marginTop: 15,
                padding: 20,
                borderRadius: 10,
                backgroundColor: "#fff",
                backgroundImage:
                  "linear-gradient(0deg, rgba(32, 158, 155,0.1), rgba(32, 158, 155,0.4))",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              }}
            >
              <Row justify="space-around">
                <Avatar
                  size={"large"}
                  style={{
                    marginTop: 10,
                    marginBottom: 30,
                    padding: 13,
                    width: 60,
                    height: 60,
                    backgroundColor: "#333",
                  }}
                >
                  <Typography.Title
                    level={3}
                    style={{ fontWeight: "bold", color: "#fff" }}
                  >
                    FN
                  </Typography.Title>
                </Avatar>
              </Row>
              <Form
                onFinish={handleSubmitLogin}
                onFinishFailed={(value) => {
                  console.log("Fail", value);
                }}
              >
                <Form.Item
                  wrapperCol={24}
                  name={"username"}
                  rules={[
                    { required: true, message: "Please input your username" },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={
                      <UserOutlined style={{ color: "rgba(0,0,0,0.25" }} />
                    }
                    placeholder="Username"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  wrapperCol={24}
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    size="large"
                    prefix={
                      <LockOutlined style={{ color: "rgba(0,0,0,0.25" }} />
                    }
                    placeholder="Password"
                  />
                </Form.Item>
                {/* <Form.Item name={"remember"} valuePropName="checked">
                  <Row justify="space-between">
                    <Checkbox>Remember me</Checkbox>
                  </Row>
                </Form.Item> */}
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                    // onSubmit={() => console.log("Login")}
                  >
                    LOGIN
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Row justify="space-around" align="center" style={{ marginTop: 50 }}>
            <Typography.Text type="secondary" style={{ fontSize: 11 }}>
              &copy; YOKOYAMA KOGYO (THAILAND) CO.,LTD.
            </Typography.Text>
          </Row>
          <Row justify="space-around" align="top" style={{ fontSize: 11 }}>
            <Typography.Text type="secondary">
              Powered by CHATCHAI AMPAICHIT
            </Typography.Text>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
