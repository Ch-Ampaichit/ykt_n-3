import React, { useState } from "react";
import "antd-table-infinity/index.css";
import {
  Space,
  Card,
  Table,
  Button,
  Modal,
  BackTop,
  AutoComplete,
  Input,
  Tooltip,
  Drawer,
  Typography,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import axios from "axios";
// import { InfinityTable as Table } from "antd-table-infinity";

import { url } from "config/api";

const item_model = {
  no: "",
  description: "",
  unit_of_measure_code: "",
};

const ItemsPage = () => {
  // console.log("toglle: ", itemVisibleToggle);
  const [itemRecord, setItemRecord] = useState(item_model);
  const [dataLoading, setDataLoading] = useState(true);
  const [columns] = useState([
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      fixed: true,
      // sorter: true,
      // sortOrder: "ascend",
      render: (text, record, index) => {
        return (
          <Button
            type="link"
            onClick={() => {
              // console.log("record: ", record);
              setItemRecord(record);
              setitemDetailVisible(true);
            }}
          >
            {text}
          </Button>
        );
      },
      width: 200,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 400,
    },
    {
      title: "Base Unit of Measure",
      dataIndex: "base_unit_of_measure_code",
      key: "base_unit_of_measure_code",
      align: "center",
      // width: 100,
    },
    {
      title: "Item Category Code",
      dataIndex: "item_category_code",
      key: "item_category_code",
      align: "center",
      width: 180,
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
  ]);
  const [itemsData, setItemsData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [itemDetailVisible, setitemDetailVisible] = useState(false);
  const [pageSize, setPageSize] = useState(500);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(url.items, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((resp) => {
        // console.log("resp: ", resp.data);
        setItemsData(resp.data);
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
            <Typography.Text className="label-header">Items</Typography.Text>
          }
          size="small"
          extra={
            <Space size={8}>
              <AutoComplete>
                <Input.Search placeholder="Search" />
              </AutoComplete>
              {selectedRowKeys.length > 0 && (
                <Button
                  icon={
                    <DeleteOutlined
                      onClick={() => {
                        // console.log("selectedRow: ", selectedRowKeys[0]);
                        const filterItem = itemsData.filter(
                          (item) => item.no !== selectedRowKeys[0]
                        );
                        // console.log("filterItem: ", filterItem);
                        selectedRowKeys.length > 0
                          ? Modal.confirm({
                              title: "Confirm",
                              content: (
                                <p>{`Are you sure to delete Item No. ${selectedRowKeys}`}</p>
                              ),
                              onOk: () => {
                                setItemsData(filterItem);
                              },
                            })
                          : Modal.error({
                              title: "Error!",
                              content: "There is no selected Item to delete.",
                            });
                      }}
                    />
                  }
                />
              )}
              <Button icon={<PlusOutlined />} />
            </Space>
          }
        >
          <Table
            loading={dataLoading}
            size="small"
            columns={columns}
            dataSource={itemsData}
            rowSelection={rowSelection}
            bordered
            scroll={{
              y: 500,
              x: 1200,
            }}
            pagination={{
              pageSize: pageSize,
              pageSizeOptions: [500, 1000, 2000],
              onChange: (page, pageSize) => {
                // console.log("page: ", page + ", pageSize: ", pageSize);
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
        title={`${itemRecord.no} ${itemRecord.description}`}
        width={800}
        visible={itemDetailVisible}
        closable={false}
        onClose={() => {
          setitemDetailVisible(false);
          setItemRecord(item_model);
        }}
      ></Drawer>
    </div>
  );
};

export default ItemsPage;
