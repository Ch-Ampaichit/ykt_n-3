import React, { useState } from "react";
import { Table } from "antd";

const VendorMigration = (props) => {
  const { data } = props;
  const [columns] = useState([
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      fixed: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Post Code",
      dataIndex: "post_code",
      key: "post_code",
    },
    {
      title: "Email Address",
      dataIndex: "email_address",
      key: "email_address",
    },
    {
      title: "Phone No.",
      dataIndex: "phone_no",
      key: "phone_no",
    },
  ]);
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default VendorMigration;
