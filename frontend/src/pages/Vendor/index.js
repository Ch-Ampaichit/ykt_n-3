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
  Form,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  // SearchOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import {
  asyncLoadVendor,
  asyncUpdateVendor,
} from "features/application/vendorSlice";

let vendor = {
  address: null,
  address_2: null,
  city: "",
  contact_no: null,
  email: null,
  key: "",
  no: "",
  phone_no: "",
  post_code: "",
  search_name: "",
};

const VendorPage = (props) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [vendorDetailVisible, setVendorDetailVisible] = useState(false);
  const [vendorRecord, setVendorRecord] = useState(vendor);

  const [columns] = useState([
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      fixed: true,
      width: 100,
      render: (text, record, index) => {
        return <Button type="link">{text}</Button>;
      },
    },
    {
      title: "Name.",
      dataIndex: "name",
      key: "name",
      // width: 400,
      ellipsis: true,
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
      width: 400,
    },
    {
      title: "City",
      dataIndex: "city",
      width: 160,
      key: "city",
    },
    {
      title: "Post Code",
      dataIndex: "post_code",
      key: "post_code",
      width: 100,
      align: "center",
    },
  ]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageSize, setPageSize] = useState(500);

  const dataSource = useSelector((state) => state.vendors.datasource);

  const status = useSelector((state) => state.vendors.status);

  useEffect(() => {
    dispatch(asyncLoadVendor());
    // eslint-disable-next-line
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

  const handleOnRowClick = (record) => {
    // console.log("handleOnRowClick: ", record);
    form.setFieldsValue({
      no: record.no,
      name: record.name,
      address: record.address,
      address_2: record.address_2,
      city: record.city,
      contact_no: null,
      email: record.email,
      phone_no: record.phone_no,
      post_code: record.post_code,
      search_name: "",
    });
    setVendorRecord(record);
    setVendorDetailVisible(true);
  };

  const handleChageVendor = (val) => {
    // console.log("vendor data: ", val, "\ncurrRec: ", vendorRecord);
    vendor = {
      no: vendorRecord.no,
      name: val.name,
      address: val.address,
      address_2: val.address_2,
      city: val.city,
      email: val.email,
      phone_no: val.phone_no,
      post_code: val.post_code,
    };
    dispatch(asyncUpdateVendor(vendor));
    setVendorRecord(vendor);
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
              <AutoComplete
                onSearch={(e) => {
                  console.log("e = ", e);
                }}
              >
                <Input.Search placeholder="Search" />
              </AutoComplete>
              <Button icon={<DeleteOutlined />} />
              <Button icon={<PlusOutlined />} />
            </Space>
          }
        >
          <Table
            loading={status === "Loading"}
            rowSelection={rowSelection}
            // rowClassName={(rec, index) => {
            //   console.log("rec: ", rec, ", index: ", index);
            // }}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  // console.log("record: ", record, "\nrowIndex: ", rowIndex);
                  handleOnRowClick(record);
                },
              };
            }}
            size="small"
            columns={columns}
            dataSource={dataSource}
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
      >
        <Space
          direction="vertical"
          size={"small"}
          style={{
            padding: 16,
            display: "flex",
          }}
        >
          <Form
            form={form}
            labelAlign="left"
            labelCol={{
              span: 3,
            }}
            // onFieldsChange={(_, allFileds) => {
            //   console.log("allField: ", allFileds);
            // }}
            onFinish={(value) => {
              handleChageVendor(value);
            }}
          >
            <Form.Item label={"Name"} name={"name"}>
              <Input />
            </Form.Item>
            <Form.Item label={"Address"} name={"address"}>
              <Input />
            </Form.Item>
            <Form.Item label={"Address 2"} name={"address_2"}>
              <Input />
            </Form.Item>
            <Form.Item label={"City"} name={"city"}>
              <Input />
            </Form.Item>
            <Form.Item label={"Post Code"} name={"post_code"}>
              <Input />
            </Form.Item>
            <Form.Item label={"Phone No."} name={"phone_no"}>
              <Input />
            </Form.Item>
            <Form.Item
              label={"Email"}
              name={"email"}
              rules={[
                {
                  type: "email",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 12,
              }}
            >
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Drawer>
    </div>
  );
};

export default VendorPage;
