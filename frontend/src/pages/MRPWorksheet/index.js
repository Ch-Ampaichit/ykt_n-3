// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import dateformat from "dateformat";
import { v4 as uuidV4 } from "uuid";
import numeral from "numeral";
import moment from "moment";

// import "antd-table-infinity/index.css";
import {
  Space,
  Card,
  Button,
  Table,
  Modal,
  Input,
  BackTop,
  Typography,
  message,
  Divider,
  Select,
  DatePicker,
} from "antd";
import {
  DeleteOutlined,
  ThunderboltOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  asyncInitPage,
  asyncGetMRPJournalBatch,
  asyncImportMRPJournalLine,
  asyncClearAll,
} from "features/application/mrpWorksheetSlice";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const MRPWorksheetPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultJnlBatch = useSelector(
    (state) => state.authentication.user.user_setup.mrp_jnl_batch.batch_name
  );

  const [batchName, setBatchName] = useState("");
  // console.log("batchName: ", batchName);
  const jnlBatches = useSelector((state) => state.mrp_worksheet.jnl_batches);
  // console.log("jnl_batches: ", jnlBatches);
  const status = useSelector((state) => state.mrp_worksheet.status);
  // console.log("pageStatus: ", status);
  const datasource = useSelector((state) => state.mrp_worksheet.datasource);
  // console.log("datasource: ", datasource);

  const vendor_batch = useSelector((state) => state.mrp_worksheet.vendor_batch);
  // console.log("vendor_batch: ", vendor_batch);

  const generateBtnRef = useRef(null);

  const periodProps = {
    format: "MMMM-YYYY",
    picker: "month",
  };

  const fileRef = useRef(null);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [executeVisible, setExecuteVisible] = useState(false);
  const [files, setFiles] = useState(null);
  const [startingPeriod, setStartingPeriod] = useState(null);
  const [endingPeriod, setEndingPeriod] = useState(null);

  const columns = [
    {
      title: "Vendor No.",
      dataIndex: "vendor_no",
      key: "vendor_no",
      fixed: true,
      width: 100,
      render: (text) => {
        return <Button type="link">{text}</Button>;
      },
    },
    {
      title: "Item No.",
      dataIndex: "item_no",
      key: "item_no",
      fixed: true,
      width: 150,
      // sorter: true,
      render: (text) => {
        return <Button type="link">{text}</Button>;
      },
    },
    {
      title: "KB SD",
      dataIndex: "kb_sd",
      key: "kb_sd",
      fixed: true,
      width: 100,
      // sortOrder: "ascend",
      // sorter: (a, b) => a.kb_sd - b.kb_sd,
    },
    {
      title: "Vendor Name",
      dataIndex: "vendor_name",
      key: "vendor_name",
      width: 300,
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 300,
      ellipsis: true,
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: "due_date",
      align: "center",
      width: 100,
      // render: (text) => {
      //   return dateformat(new Date(text), "dd/mm/yyyy");
      // },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "right",
      // sorter: (a, b) => a.quantity - b.quantity,
      width: 100,
      render: (text) => {
        // text % 1 !== 0 && console.log("qty: ", text % 1);
        const format = text % 1 !== 0 ? "0,0.0000" : "0,0";
        return numeral(text).format(format);
      },
    },
    {
      title: "Unit of Measure",
      dataIndex: "unit_of_measure_code",
      key: "unit_of_measure_code",
      align: "center",
      width: 110,
    },
  ];

  useEffect(() => {
    // console.log("Initial MRP Worksheet Page\n", jnlBatch);
    dispatch(asyncInitPage());
    setBatchName(defaultJnlBatch);
    // eslint-disable-next-line
  }, []);

  const handleFileUpload = async (e) => {
    // console.log("Files: ", files);

    if (files) {
      const file = files;

      const excelData = await file.arrayBuffer();

      const workbook = XLSX.read(excelData);

      if (workbook.SheetNames[0] === "Planning Worksheets") {
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
        const JnlLineData = jsonData.map((rec, idx) => {
          return {
            key: uuidV4(),
            vendor_no: rec["Vendor No."],
            item_no: rec["No."],
            description: rec["Description"],
            kb_sd: rec["KB SD"],
            due_date: dateformat(new Date(rec["Due Date"]), "yyyy-mm-dd"),
            quantity: parseFloat(rec["Quantity"]),
            unit_of_measure_code: rec["Unit of Measure Code"],
            vendor_name: rec["Vendor Name"],
            journal_batch: batchName,
          };
        });

        // console.log("JnlLineData: ", JnlLineData);

        dispatch(
          asyncImportMRPJournalLine({
            batch: batchName,
            jnl_line: JnlLineData,
          })
        );

        setFiles(null);
        setUploadModalVisible(false);
      } else {
        message.error(
          "Please Check your excel file again!, your file is mistake."
        );
      }
    } else {
      // console.log("fileRef: ", fileRef.current);
      fileRef.current.input.files.length !== 0
        ? message.error("Please clear choosen file, then choose a new file.")
        : message.error("Yor must choose file to import.");
    }
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
            <Space>
              <Typography.Text className="label-header">
                MRP Worksheet
              </Typography.Text>
            </Space>
          }
          size="small"
          extra={
            <Space>
              <label>Batch Name:</label>
              <Select
                value={batchName}
                style={{ width: 200 }}
                onChange={(val, opt) => {
                  // console.log("Value: ", val, ", \noption: ", opt);
                  setBatchName(val);
                  dispatch(asyncGetMRPJournalBatch(val));
                }}
              >
                {jnlBatches.map((jnl) => {
                  return (
                    <Option key={jnl.name} value={jnl.name}>
                      {jnl.name}
                    </Option>
                  );
                })}
              </Select>
              <Divider type="vertical" />

              {datasource.length === 0 ? (
                <Button
                  title="Import"
                  icon={<CloudUploadOutlined />}
                  onClick={(e) => {
                    // console.log("fileRef(onImport): ", fileRef.current);
                    setUploadModalVisible(true);
                  }}
                >
                  Import
                </Button>
              ) : (
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => dispatch(asyncClearAll(batchName))}
                >
                  Clear
                </Button>
              )}

              <Button
                disabled={status === "Loading" || status === "Importing"}
                icon={<ThunderboltOutlined />}
                onClick={(e) => {
                  // console.log("vendor_batch(onExecute): ", vendor_batch);
                  if (vendor_batch.length === 0) {
                    message.error(
                      "There is nothing data to create vendor forecast!"
                    );
                  } else {
                    // console.log("setCreateVFVisible");
                    setExecuteVisible(true);
                  }
                }}
              >
                Execute
              </Button>
            </Space>
          }
        >
          <Table
            size="small"
            loading={
              status === "Loading" || status === "Importing"
                ? {
                    tip: `${status}...`,
                  }
                : false
            }
            bordered
            columns={columns}
            dataSource={datasource}
            // rowSelection={rowSelection}
            scroll={{
              x: 1300,
              y: 500,
            }}
            pagination={{
              pageSize: 1000,
              pageSizeOptions: [1000, 2000, 5000],
            }}
          />
        </Card>
      </Space>
      <BackTop visibilityHeight={50} />
      <Modal
        title={
          <Space>
            <CloudUploadOutlined />
            Import MRP Data
          </Space>
        }
        visible={uploadModalVisible}
        onOk={handleFileUpload}
        onCancel={() => {
          setUploadModalVisible(false);
        }}
        // footer={null}
      >
        <Space
          direction="vertical"
          size={"small"}
          style={{
            display: "flex",
          }}
        >
          <Input
            id="upload"
            ref={fileRef}
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            allowClear
            onChange={(e) => {
              let file = e.target.files[0];
              setFiles(file);
            }}
          />
        </Space>
      </Modal>
      <Modal
        title="Generate Vendor Forecast"
        width={600}
        visible={executeVisible}
        onOk={() => setExecuteVisible(false)}
        onCancel={() => setExecuteVisible(false)}
        footer={false}
      >
        <Space
          direction="vertical"
          size={20}
          style={{
            display: "flex",
          }}
        >
          <Space
            align="center"
            style={{
              display: "flex",
            }}
          >
            <label>Starting:</label>
            <DatePicker
              {...periodProps}
              value={startingPeriod}
              onChange={(date) => {
                if (date) {
                  setStartingPeriod(moment(date));
                  setEndingPeriod(moment(date.add(3, "M")));
                  generateBtnRef.current.focus();
                } else {
                  setStartingPeriod(null);
                  setEndingPeriod(null);
                }
              }}
            />
            <label>Ending:</label>
            <DatePicker
              {...periodProps}
              value={endingPeriod}
              onChange={(date) => {
                if (date) {
                  setEndingPeriod(moment(date));
                  setStartingPeriod(moment(date).subtract(3, "M"));
                  generateBtnRef.current.focus();
                } else {
                  setStartingPeriod(null);
                  setEndingPeriod(null);
                }
              }}
            />
            <Button
              ref={generateBtnRef}
              type="primary"
              icon={<ThunderboltOutlined />}
              onClick={() => {
                // console.log("Generate");
                // <Navigate to={"/vendor_forecast"} replace />;
                navigate(`/vendor_forecast`);
              }}
            >
              Generate
            </Button>
          </Space>
          <Table
            size="small"
            columns={[
              {
                key: "vendor_no",
                dataIndex: "vendor_no",
                title: "Vendor No.",
                align: "center",
                width: "120px",
              },
              {
                key: "vendor_name",
                dataIndex: "vendor_name",
                title: "Vendor Name",
              },
            ]}
            pagination={{
              pageSize: 100,
              position: [],
            }}
            scroll={{
              y: 210,
            }}
            dataSource={vendor_batch}
          />
          <div></div>
        </Space>
      </Modal>
    </div>
  );
};

export default MRPWorksheetPage;
