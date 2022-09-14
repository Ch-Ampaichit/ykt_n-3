import React, { useState } from "react";
import { Table } from "antd";

const ItemUOMMigration = (props) => {
  const { data } = props;
  const [columns] = useState([
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      fixed: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Quantity Per",
      dataIndex: "quantity_per",
      key: "quantity_per",
    },
  ]);
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ItemUOMMigration;
