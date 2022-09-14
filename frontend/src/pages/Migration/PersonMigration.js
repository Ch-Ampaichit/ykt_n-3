import React, { useState } from "react";
import { Table } from "antd";

const PersonMigration = (props) => {
  const { data } = props;
  const [columns] = useState([
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      fixed: true,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Nick Name",
      dataIndex: "nick_name",
      key: "nick_name",
    },
    {
      title: "Email Address",
      dataIndex: "email_address",
      key: "email_address",
    },
  ]);
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default PersonMigration;
