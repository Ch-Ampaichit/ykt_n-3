import { Col, Row, Typography } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";

const { Title } = Typography;

const ProfilePage = () => {
  return (
    <div>
      <Row wrap>
        <Col>
          <Title level={4}>User Profile</Title>
        </Col>
      </Row>
      <Row>
        <Outlet />
      </Row>
    </div>
  );
};

export default ProfilePage;
