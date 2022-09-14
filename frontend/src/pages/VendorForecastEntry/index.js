import {
  Space,
  Card,
  BackTop,
  Table,
  Tooltip,
  Button,
  AutoComplete,
  Input,
} from "antd";
import { FilterOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const VendorForecastEntryPage = () => {
  const [columns] = useState([
    {
      title: "Vendor No.",
      dataIndex: "vendor_no",
      key: "vendor_no",
      fixed: true,
    },
    {
      title: "Item No.",
      dataIndex: "item_no",
      key: "item_no",
      fixed: true,
    },
    {
      title: "Vendor Name",
      dataIndex: "vendor_name",
      key: "vendor_name",
    },
    {
      title: "KB SD",
      dataIndex: "kb_sd",
      key: "kb_sd",
    },
    {
      title: "Item Description",
      dataIndex: "item_description",
      key: "item_description",
    },
    {
      title: "Unit of Measure",
      dataIndex: "unit_of_measure",
      key: "unit_of_measure",
    },
    {
      title: "Period of Forecast",
      dataIndex: "period_of_forecast",
      key: "period_of_forecast",
    },
    {
      title: "1st Month Quantity",
      dataIndex: "m1_quantity",
      key: "m1_quantity",
    },
    {
      title: "2nd Month Quantity",
      dataIndex: "m2_quantity",
      key: "m2_quantity",
    },
    {
      title: "3rd Month Quantity",
      dataIndex: "m3_quantity",
      key: "m3_quantity",
    },
    {
      title: "4th Month Quantity",
      dataIndex: "m4_quantity",
      key: "m4_quantity",
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
          title="Vendor Forecast Entry"
          size="small"
          extra={
            <Space>
              <AutoComplete>
                <Input.Search placeholder="Search" />
              </AutoComplete>
              <Tooltip title="Filter">
                <Button icon={<FilterOutlined />} />
              </Tooltip>
            </Space>
          }
        >
          <Table columns={columns} />
        </Card>
      </Space>
      <BackTop visibilityHeight={50} />
    </div>
  );
};

export default VendorForecastEntryPage;
