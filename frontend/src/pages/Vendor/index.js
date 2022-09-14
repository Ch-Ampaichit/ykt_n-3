// eslint-disable-next-line
import React, { useState, useEffect } from "react";

// import "antd-table-infinity/index.css";
import {
  Space,
  Card,
  Button,
  Table,
  BackTop,
  AutoComplete,
  Input,
  Tooltip,
  Drawer,
  Typography,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

import { url } from "config/api";

const vendor = {
  no: "",
  name: "",
};

const VendorPage = (props) => {
  const [vendorDetailVisible, setVendorDetailVisible] = useState(false);
  const [vendorRecord, setVendorRecord] = useState(vendor);
  const [dataLoading, setDataLoading] = useState(true);
  const [columns] = useState([
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      fixed: true,
      width: 100,
      render: (text, record, index) => {
        return (
          <Button
            type="link"
            onClick={() => {
              // console.log("record: ", record);
              setVendorRecord(record);
              setVendorDetailVisible(true);
            }}
          >
            {text}
          </Button>
        );
      },
    },
    {
      title: "Name.",
      dataIndex: "name",
      key: "name",
      width: 400,
    },
    {
      title: "Phone No.",
      dataIndex: "phone_no",
      key: "phone_no",
      width: 200,
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
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
  ]);
  const [vendorsData, setVendorsData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageSize, setPageSize] = useState(500);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(url.vendors, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((resp) => {
        // console.log("resp: ", resp.data);
        setVendorsData(resp.data);
        setDataLoading(false);
      });
    // console.log("token : ", token);
  }, []);

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    // console.log("selectedRows: ", selectedRows);
    // console.log("newSelectedRowKeys: ", newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

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
            <Typography.Text className="label-header">Vendors</Typography.Text>
          }
          size="small"
          extra={
            <Space>
              <AutoComplete>
                <Input.Search placeholder="Search" />
              </AutoComplete>
              <Button icon={<DeleteOutlined />} />
              <Button icon={<PlusOutlined />} />
            </Space>
          }
        >
          <Table
            loading={dataLoading}
            rowSelection={rowSelection}
            // rowClassName={(rec, index) => {
            //   console.log("rec: ", rec, ", index: ", index);
            // }}
            size="small"
            columns={columns}
            dataSource={vendorsData}
            bordered
            scroll={{
              x: 1300,
              y: 500,
            }}
            pagination={{
              pageSize: pageSize,
              pageSizeOptions: [500, 1000, 2000],
              onChange: (page, pageSize) => {
                setPageSize(pageSize);
              },
            }}
          />
        </Card>
      </Space>
      <Tooltip title="Back to top">
        <BackTop visibilityHeight={50} />
      </Tooltip>
      <Drawer
        title={`${vendorRecord.no} ${vendorRecord.name}`}
        width={800}
        visible={vendorDetailVisible}
        closable={false}
        onClose={() => {
          setVendorDetailVisible(false);
        }}
      ></Drawer>
    </div>
  );
};

export default VendorPage;
