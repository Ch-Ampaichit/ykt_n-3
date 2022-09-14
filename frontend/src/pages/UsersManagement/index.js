import { Space, Card, Table, Button } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const UsersManagementPage = () => {
  const [columns] = useState([
    { title: "Username", dataIndex: "username", key: "username", fixed: true },
    { title: "First Name", dataIndex: "first_name", key: "first_name" },
    { title: "Last Name", dataIndex: "last_name", key: "last_name" },
    {
      title: "Email Address",
      dataIndex: "email_address",
      key: "email_address",
    },
    { title: "Last Login", dataIndex: "last_login", key: "last_login" },
  ]);
  // const [data, setData] = useState([]);
  return (
    <div>
      <Space
        direction="vertical"
        size={"small"}
        style={{
          display: "flex",
        }}
      >
        <Card
          title="Users"
          extra={
            <Space>
              <Button icon={<DeleteOutlined />} />
              <Button icon={<PlusOutlined />} />
            </Space>
          }
        >
          <Table columns={columns} dataSource={[]} scroll={{ x: 1000 }} />
        </Card>
      </Space>
    </div>
  );
};

export default UsersManagementPage;
