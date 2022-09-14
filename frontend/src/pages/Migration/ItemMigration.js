import React, { useState } from "react";
import { Table } from "antd";

const ItemMigration = (props) => {
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
    },
    {
      title: "KB SD",
      dataIndex: "kb_sd",
      key: "kb_sd",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Base Unit of Measure Code",
      dataIndex: "base_unit_of_measure_code",
      key: "base_unit_of_measure_code",
    },
    {
      title: "Item Category Code",
      dataIndex: "item_category_code",
      key: "item_category_code",
    },
  ]);
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ItemMigration;
