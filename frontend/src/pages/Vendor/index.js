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
  Row,
  Col,
  Tabs,
  // Divider,
  Modal,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  // SearchOutlined,
  CloseOutlined,
  RetweetOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import {
  asyncLoadVendor,
  asyncUpdateVendor,
} from "features/application/vendorSlice";
import { useRef } from "react";
import axios from "axios";
import { api_url } from "config/api";

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

  const [contactForm] = Form.useForm();

  const [vendorDetailVisible, setVendorDetailVisible] = useState(false);
  const [vendorRecord, setVendorRecord] = useState(vendor);

  const [contactModalVisible, setContactModalVisible] = useState(false);
  const firstNameRef = useRef(null);
  const lasttNameRef = useRef(null);
  const emailContactRef = useRef(null);
  const addContactBtnRef = useRef(null);

  const [columns] = useState([
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      fixed: true,
      width: 100,
      // defaultSortOrder: "descend",
      sortDirections: ["descend"],
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

  const [selectedContactRowKeys, setSelectedContactRowKeys] = useState([]);
  const [selectedContactRows, setSelectedContactRows] = useState([]);
  const [modifyContact, setModifyContact] = useState(false);

  const dataSource = useSelector((state) => state.vendors.datasource);
  const [contacts, setContacts] = useState([]);

  const status = useSelector((state) => state.vendors.status);

  useEffect(() => {
    // setContacts([
    //   {
    //     key: "chatchai",
    //     first_name: "Chatchai",
    //     last_name: "Ampaichit",
    //     email: "chatchai@yokoyama.coth",
    //   },
    // ]);
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

  const getContact = async (vend_no) => {
    // console.log("api_url.contact: ", api_url.contacts);
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "get",
        url: `${api_url.contacts}${vend_no}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      });
      // console.log("contact response: ", response.data.persons);
      setContacts(response.data.persons);
    } catch (err) {
      // console.log("error: ", err);
      setContacts([]);
    }
  };

  const handleCreateContact = async (person) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "post",
        url: `${api_url.person}new_by_contact_no/`,
        data: person,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      });
      // console.log("ContactPerson: ", response.data);
      setContacts(response.data);
      contactForm.resetFields();
    } catch (error) {
      console.log("ContactPersonError: ", error);
    }
  };

  const handleUpdateContact = async (person) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "put",
        url: `${api_url.person}${person.no}/`,
        data: person,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      });
      // console.log("UpdateContactPerson: ", response.data);
      setContacts(response.data);
    } catch (error) {
      console.log("ContactPersonError: ", error);
    }
  };

  const handleDeleteContact = async (person) => {
    // console.log("handleDeleteContact: ", person);
    const token = localStorage.getItem("token");

    try {
      const response = await axios({
        method: "delete",
        url: `${api_url.person}del_selected/`,
        data: person,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      });
      // console.log("ContactPerson: ", response.data);
      setContacts(response.data);
      setSelectedContactRowKeys([]);
      setSelectedContactRows([]);
      contactForm.resetFields();
    } catch (error) {
      console.log("ContactPersonError: ", error);
    }
  };

  const handleOnRowClick = (record) => {
    // console.log("handleOnRowClick: ", record);
    getContact(record.no);
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
          setContacts([]);
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
          <Tabs defaultActiveKey="gen_tab" tabBarExtraContent={<Space></Space>}>
            <Tabs.TabPane tab="General" key={"gen_tab"}>
              <Form
                form={form}
                labelAlign="left"
                // onFieldsChange={(_, allFileds) => {
                //   console.log("allField: ", allFileds);
                // }}
                onFinish={(value) => {
                  handleChageVendor(value);
                }}
              >
                <Form.Item labelCol={{ span: 3 }} label={"Name"} name={"name"}>
                  <Input />
                </Form.Item>

                <Form.Item
                  labelCol={{ span: 3 }}
                  label={"Address"}
                  name={"address"}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  labelCol={{ span: 3 }}
                  label={"Address 2"}
                  name={"address_2"}
                >
                  <Input />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      labelCol={{ span: 6 }}
                      label={"City"}
                      name={"city"}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item label={"Post Code"} name={"post_code"}>
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  labelCol={{ span: 3 }}
                  label={"Phone No."}
                  name={"phone_no"}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  labelCol={{ span: 3 }}
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
            </Tabs.TabPane>

            <Tabs.TabPane tab={"Contact"} key={"contact_tab"}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Row justify="end" gutter={10}>
                    <Col>
                      <Button
                        type="primary"
                        icon={<UserAddOutlined />}
                        onClick={() => {
                          // console.log("currRec: ", vendorRecord.no);
                          setModifyContact(false);
                          setContactModalVisible(true);
                          contactForm.resetFields();
                          // firstNameRef.current.focus({ cursor: "end" });
                        }}
                      >
                        New
                      </Button>
                    </Col>

                    <Col>
                      <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        disabled={selectedContactRowKeys.length === 0}
                        onClick={() => {
                          const person = {
                            contact: vendorRecord.no,
                            persons: selectedContactRows,
                          };
                          handleDeleteContact(person);
                        }}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </Col>

                <Col>
                  <Table
                    size="small"
                    bordered
                    columns={[
                      {
                        title: "Code",
                        dataIndex: "no",
                        align: "left",
                        width: "15%",
                      },
                      {
                        title: "Nick name",
                        dataIndex: "nick_name",
                        align: "left",
                        width: "20%",
                      },
                      {
                        title: "Name",
                        // dataIndex: "first_name",
                        align: "left",
                        // width: "20%",
                        render: (txt, rec) => {
                          return `${rec.first_name}  ${
                            rec.last_name ? rec.last_name : ""
                          }`;
                        },
                      },
                      {
                        title: "Email",
                        dataIndex: "email_address",
                        // width: "30%",
                        render: (txt) => {
                          return <Button type="link">{txt}</Button>;
                        },
                      },
                    ]}
                    dataSource={contacts}
                    rowSelection={{
                      selectedRowKeys: selectedContactRowKeys,
                      onChange: (slKeys, slRows) => {
                        setSelectedContactRowKeys(slKeys);
                        setSelectedContactRows(slRows);
                        // console.log(
                        //   "selectedRowsKey: ",
                        //   slKeys,
                        //   "\nslRows: ",
                        //   slRows
                        // );
                      },
                    }}
                    scroll={{ x: 700, y: 400 }}
                    onRow={(row) => {
                      return {
                        onClick: () => {
                          setModifyContact(true);
                          contactForm.setFieldsValue({
                            no: row.no,
                            first_name: row.first_name,
                            last_name: row.last_name,
                            nick_name: row.nick_name,
                            email_address: row.email_address,
                          });
                          setContactModalVisible(true);
                        },
                      };
                    }}
                  />
                </Col>
              </Row>
            </Tabs.TabPane>
          </Tabs>
        </Space>

        <Modal
          style={{ marginLeft: 100 }}
          footer={null}
          visible={contactModalVisible}
          title="New Contact"
          onCancel={() => {
            setContactModalVisible(false);
          }}
        >
          <Form
            // layout="inline"
            name="contact_form"
            form={contactForm}
            onFinish={(val) => {
              const person = {
                no: val.no,
                contact_no: vendorRecord.no,
                nick_name: val.nick_name,
                first_name: val.first_name,
                last_name: val.last_name,
                email_address: val.email_address,
              };
              // console.log("OnFinish \nperson: ", person);
              if (modifyContact === false) {
                handleCreateContact(person);
              } else {
                handleUpdateContact(person);
              }
            }}
            labelCol={{ span: 5 }}
            labelAlign="left"
          >
            <Form.Item
              name={"no"}
              label="Code"
              // rules={[{ required: true }]}
              hidden
            >
              <Input placeholder="Short name" />
            </Form.Item>

            <Form.Item
              name="first_name"
              label="First name"
              rules={[
                {
                  required: true,
                  message: "First name is require.",
                },
              ]}
            >
              <Input
                ref={firstNameRef}
                onPressEnter={() => {
                  lasttNameRef.current.focus({
                    cursor: "end",
                  });
                }}
                placeholder="First name"
              />
            </Form.Item>

            <Form.Item name="last_name" label="Last name">
              <Input
                ref={lasttNameRef}
                onPressEnter={() =>
                  emailContactRef.current.focus({
                    cursor: "end",
                  })
                }
                placeholder="Last name"
              />
            </Form.Item>
            <Form.Item name={"nick_name"} label="Nick name">
              <Input />
            </Form.Item>

            <Form.Item
              name="email_address"
              label="Email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input
                ref={emailContactRef}
                // onPressEnter={() => {
                //   addContactBtnRef.current.focus();
                // }}
                placeholder="Email"
              />
            </Form.Item>
            <Row gutter={16}>
              <Col span={14}>
                {" "}
                <Form.Item shouldUpdate wrapperCol={{ offset: 8 }}>
                  {() => (
                    <Button
                      ref={addContactBtnRef}
                      icon={<UserAddOutlined />}
                      style={{ width: "100%" }}
                      type="primary"
                      htmlType="submit"
                      // disabled={!contactForm.isFieldsTouched(true)}
                      // onClick={() => {
                      //   const data = contactForm.getFieldsValue();
                      //   console.log("data: ", data);
                      //   contactForm.resetFields();
                      // }}
                    >
                      {modifyContact ? "Save" : "Add"}
                    </Button>
                  )}
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item>
                  {modifyContact ? (
                    <Button
                      // type="primary"
                      icon={<CloseOutlined />}
                      style={{ width: "100%" }}
                      onClick={() => setContactModalVisible(false)}
                    >
                      Close
                    </Button>
                  ) : (
                    <Button
                      icon={<RetweetOutlined />}
                      onClick={() => {
                        contactForm.resetFields();
                      }}
                      style={{ width: "100%" }}
                    >
                      Clear
                    </Button>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Drawer>
    </div>
  );
};

export default VendorPage;
