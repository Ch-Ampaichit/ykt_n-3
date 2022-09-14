import React, { useState } from "react";
import { Table } from "antd";

const ContactMigration = (props) => {
  const { data } = props;
  const [columns] = useState([
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      fixed: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      fixed: true,
    },
  ]);
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ContactMigration;
