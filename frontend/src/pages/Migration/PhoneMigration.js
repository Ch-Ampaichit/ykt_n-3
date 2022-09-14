import React, { useState } from "react";
import { Table } from "antd";

const PhoneMigration = (props) => {
  const { data } = props;
  const [columns] = useState([
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      fixed: true,
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ]);
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default PhoneMigration;
