// eslint-disable-next-line
import React, { useState, useEffect } from "react";

// import "antd-table-infinity/index.css";
import { Space, Card, Button, Table, Typography } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
// import axios from "axios";

const VendorForecastPage = (props) => {
  const [columns] = useState([
    {
      title: "Vendor No.",
      dataIndex: "vendor_no",
      key: "vendor_no",
    },
    {
      title: "Vendor Name.",
      dataIndex: "vendor_name",
      key: "vendor_name",
    },
    {
      title: "Period",
      dataIndex: "period",
      key: "period",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ]);
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
          title={
            <Typography.Text className="label-header">
              Vendor Forecast
            </Typography.Text>
          }
          size="small"
          extra={
            <Space>
              <Button icon={<DeleteOutlined />} />
              <Button icon={<PlusOutlined />} />
            </Space>
          }
        >
          <Table size="small" columns={columns} />
        </Card>
      </Space>
    </div>
  );
};

export default VendorForecastPage;
