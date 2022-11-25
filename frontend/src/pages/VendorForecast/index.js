// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import moment from "moment";
import * as XLSX from "xlsx";

// import "antd-table-infinity/index.css";
import {
  Space,
  Card,
  Button,
  Table,
  Typography,
  // Drawer,
  Row,
  Col,
  Descriptions,
  Radio,
  Modal,
  Spin,
} from "antd";
import {
  // PlusOutlined,
  DeleteOutlined,
  SendOutlined,
  // DownloadOutlined,
  LoadingOutlined,
  AuditOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncLoadDataSource,
  asyncPostApprove,
  asyncSendEmail,
  asyncDelete,
  setModalVisible,
  asyncSetCurrRec,
  clearErrors,
} from "features/application/vendorForecastSlice";
import { report_url } from "config";

const VendorForecastPage = (props) => {
  const dispatch = useDispatch();
  const dataSource = useSelector((state) => state.vend_forecast.datasource);
  // console.log("data: ", dataSource);

  const currRec = useSelector((state) => state.vend_forecast.currRec);
  // console.log("currRec: ", currRec);

  const modalVisible = useSelector((state) => state.vend_forecast.modalVisible);

  const status = useSelector((state) => state.vend_forecast.status);
  // console.log("status: ", status);
  const line_columns = [
    {
      title: "KB SD",
      dataIndex: "kb_sd",
      key: "kb_sd",
      align: "center",
      width: "10%",
    },
    {
      title: "Part No/Part Name",
      dataIndex: "item_no",
      key: "item_no",
      width: "40%",
      render: (txt, rec) => {
        return `${rec.item_no} : ${rec.item_description}`;
      },
    },
    {
      title: "UOM",
      dataIndex: "unit_of_measure",
      key: "unit_of_measure",
      align: "center",
      width: "10%",
    },
    {
      title: currRec.periodMonth.m1,
      dataIndex: "m1_qty",
      key: "m1_qty",
      align: "right",
      width: "10%",
      render: (dt) => {
        const qty = parseFloat(dt);
        return qty.toLocaleString(undefined, { maximumFractionDigits: 2 });
      },
    },
    {
      title: currRec.periodMonth.m2,
      dataIndex: "m2_qty",
      key: "m2_qty",
      align: "right",
      width: "10%",
      render: (dt) => {
        const qty = parseFloat(dt);
        return qty.toLocaleString(undefined, { maximumFractionDigits: 2 });
      },
    },
    {
      title: currRec.periodMonth.m3,
      dataIndex: "m3_qty",
      key: "m3_qty",
      align: "right",
      width: "10%",
      render: (dt) => {
        const qty = parseFloat(dt);
        return qty.toLocaleString(undefined, { maximumFractionDigits: 2 });
      },
    },
    {
      title: currRec.periodMonth.m4,
      dataIndex: "m4_qty",
      key: "m4_qty",
      align: "right",
      width: "10%",
      render: (dt) => {
        const qty = parseFloat(dt);
        return qty.toLocaleString(undefined, { maximumFractionDigits: 2 });
      },
    },
  ];

  const mail_status = useSelector((state) => state.vend_forecast.mail_status);
  // console.log("mail_status: ", mail_status);

  const errors = useSelector((state) => state.vend_forecast.errors);
  // const error_content = useSelector(
  //   (state) => state.vend_forecast.errors.content
  // );

  const [columns] = useState([
    {
      title: "Document No.",
      dataIndex: "description",
      key: "description",
      width: "15%",
      render: (txt, rec) => {
        return <Button type="link">{txt}</Button>;
      },
    },
    {
      title: "Approved",
      align: "center",
      width: 80,
      render: (txt, rec) => {
        // console.log("approver: ", rec.approved_fullname);
        return <Radio checked={rec.approved_fullname ? true : false} />;
      },
    },
    {
      title: "Vendor No.",
      dataIndex: "vendor_no",
      key: "vendor_no",
      align: "center",
      width: "10%",
      // render: (txt) => <Button type="link">{txt}</Button>,
    },
    {
      title: "Vendor Name.",
      dataIndex: "vendor_name",
      key: "vendor_name",
      width: "25%",
    },
    {
      title: "From",
      dataIndex: "starting_period",
      key: "starting_period",
      render: (dt) => {
        const st_date = new Date(dt);
        return moment(st_date).format("DD-MMMM-YYYY");
      },
    },
    {
      title: "To",
      dataIndex: "ending_period",
      key: "ending_period",
      render: (dt) => {
        const st_date = new Date(dt);
        return moment(st_date).format("DD-MMMM-YYYY");
      },
    },
    {
      title: "Issued By",
      dataIndex: "issued_fullname",
      align: "center",
    },
    {
      title: "Approved By",
      dataIndex: "approved_fullname",
      align: "center",
    },
    // Table.EXPAND_COLUMN,
  ]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(0);

  const onSelectChange = (keys, rows) => {
    setSelectedRowKeys(keys);
    setSelectedRows(rows);
    // console.log(
    //   "selectedRows: ",
    //   selectedRows,
    //   "newSelectedRowKeys: ",
    //   newSelectedRowKeys
    // );
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const sheetData = [
    [
      "KB SD",
      "Part No/Part Name",
      "UOM",
      currRec.periodMonth.m1,
      currRec.periodMonth.m2,
      currRec.periodMonth.m3,
      currRec.periodMonth.m4,
    ],
  ];

  const handleExportExcel = () => {
    const td = currRec.lines.map((rec) => {
      const m1qty = parseFloat(rec.m1_qty);
      const m2qty = parseFloat(rec.m2_qty);
      const m3qty = parseFloat(rec.m3_qty);
      const m4qty = parseFloat(rec.m4_qty);
      return [
        rec.kb_sd,
        `${rec.item_no} ${rec.item_description}`,
        rec.unit_of_measure,
        m1qty.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        m2qty,
        m3qty,
        m4qty,
      ];
    });

    sheetData.push(...td);

    // console.log("sheetData: ", sheetData);

    var wb = XLSX.utils.book_new();
    // var ws = XLSX.utils.json_to_sheet(lineDataSource);
    var ws = XLSX.utils.aoa_to_sheet(sheetData);

    XLSX.utils.book_append_sheet(wb, ws, currRec.header.description);
    XLSX.writeFile(wb, currRec.header.description + ".xlsx");
  };

  const handlePostApprove = () => {
    // console.log("currRec: ", currRec.header);
    dispatch(asyncPostApprove(currRec.header.description));
  };

  const handleSendEmail = () => {
    dispatch(asyncSendEmail(currRec.header.description));
  };

  const handleOnRowClick = (rec, rowIndex) => {
    // console.log("rowIndex: ", rowIndex);
    setSelectedRowId(rowIndex);
    dispatch(asyncSetCurrRec(rec.description));
    // dispatch(setCurrRecord(rec));
  };

  useEffect(() => {
    // console.log("Initial MRP Worksheet Page\n", jnlBatch);
    dispatch(asyncLoadDataSource());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // console.log("mail_status: ", mail_status);
    if (mail_status === "Rejected") {
      Modal.error({
        title: errors.title,
        content: errors.content,
        // onOk: () => dispatch(clearErrors()),
      });
    }

    // console.log("selectedRowId: ", selectedRowId);
    return () => {
      if (mail_status === "Rejected") {
        dispatch(clearErrors());
      }
    };
    // eslint-disable-next-line
  }, [mail_status, errors]);

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
              <Button
                disabled={selectedRowKeys.length === 0}
                icon={<DeleteOutlined />}
                onClick={() => {
                  // console.log("onDelete: ", selectedRows.length);
                  dispatch(asyncDelete(selectedRows));
                }}
              />
            </Space>
          }
        >
          <Table
            loading={status === "Loading"}
            bordered
            size="small"
            columns={columns}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  // console.log("record: ", record, "\nrowIndex: ", rowIndex);
                  handleOnRowClick(record, rowIndex);
                },
              };
            }}
            // expandable={{
            //   expandedRowRender,
            // }}
            scroll={{
              x: 1300,
              y: 455,
            }}
            pagination={{
              pageSize: 1000,
              pageSizeOptions: [1000, 2000, 5000],
            }}
            rowSelection={rowSelection}
            dataSource={dataSource}
          />
        </Card>
        <Modal
          visible={modalVisible}
          title={`Vendor Forecast`}
          onCancel={() => dispatch(setModalVisible(false))}
          onOk={() => dispatch(setModalVisible(false))}
          width={"80vw"}
          style={{
            top: 16,
          }}
          footer={
            <Row justify="center">
              <Col>
                <Button
                  icon={
                    <LeftOutlined
                      onClick={() => {
                        // console.log("currId: ", selectedRowId);
                        if (selectedRowId > 0) {
                          const newId = selectedRowId - 1;
                          setSelectedRowId(newId);
                          const currRec = dataSource[newId];
                          // console.log("currRec: ", datasource[newId]);
                          dispatch(asyncSetCurrRec(currRec.description));
                        }
                      }}
                    />
                  }
                />
                <Button
                  icon={
                    <RightOutlined
                      onClick={() => {
                        // console.log("currId: ", selectedRowId);
                        if (selectedRowId < dataSource.length - 1) {
                          const newId = selectedRowId + 1;
                          setSelectedRowId(newId);
                          const currRec = dataSource[newId];
                          dispatch(asyncSetCurrRec(currRec.description));
                        }
                      }}
                    />
                  }
                />
              </Col>
            </Row>
          }
        >
          <div style={{ height: "72vh" }}>
            <Space
              direction="vertical"
              size={"small"}
              style={{
                display: "flex",
              }}
            >
              <Row>
                <Col span={24}>
                  <Descriptions
                    title={currRec.header.description}
                    extra={
                      <Space>
                        <Button
                          icon={<AuditOutlined />}
                          disabled={currRec.header.approved_fullname}
                          onClick={handlePostApprove}
                        >
                          Approve
                        </Button>
                        <Button
                          icon={<FilePdfOutlined />}
                          href={`${report_url.vendor_forecast}${currRec.header.description}`}
                          target={"_blank"}
                        >
                          PDF
                        </Button>
                        <Button
                          icon={<FileExcelOutlined />}
                          onClick={handleExportExcel}
                        >
                          Excel
                        </Button>
                        {/* <Button icon={<SendOutlined />}>Email</Button> */}
                        <Button
                          icon={
                            mail_status === "Loading" ? (
                              <Spin indicator={<LoadingOutlined spin />} />
                            ) : (
                              <SendOutlined />
                            )
                          }
                          onClick={handleSendEmail}
                        >
                          Send
                        </Button>
                      </Space>
                    }
                  ></Descriptions>

                  <Row align="top" justify="start">
                    <Col
                      // span={14}
                      lg={{
                        span: 13,
                      }}
                      md={{
                        span: 12,
                      }}
                      xs={{
                        span: 12,
                      }}
                    >
                      <Descriptions column={1}>
                        <Descriptions.Item label="Vendor">
                          {`${currRec.header.vendor_no}-${currRec.header.vendor_name}`}
                        </Descriptions.Item>
                        <Descriptions.Item label="Period">
                          {`${moment(currRec.header.starting_period).format(
                            "MMMM YYYY"
                          )} - ${moment(currRec.header.ending_period).format(
                            "MMMM YYYY"
                          )}`}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                    <Col
                      // span={10}
                      lg={{
                        span: 11,
                      }}
                      md={{
                        span: 12,
                      }}
                      xs={{
                        span: 12,
                      }}
                    >
                      <Descriptions
                        contentStyle={{
                          color: "blue",
                        }}
                        size="small"
                        column={{
                          xxl: 2,
                          xl: 2,
                          lg: 2,
                          md: 1,
                          sm: 1,
                          xs: 1,
                        }}
                      >
                        <Descriptions.Item label="Issued by">
                          {currRec.header.issued_fullname}
                        </Descriptions.Item>
                        <Descriptions.Item label="Approved">
                          {currRec.header.approved_fullname}
                        </Descriptions.Item>
                        <Descriptions.Item label="Issued at">
                          {currRec.header.created_at &&
                            moment(currRec.header.created_at).format(
                              "DD/MM/YYYY H:mm:ss"
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Approved at">
                          {currRec.header.approved_at &&
                            moment(currRec.header.approved_at).format(
                              "DD/MM/YYYY H:mm:ss"
                            )}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Table
                    size="small"
                    columns={line_columns}
                    dataSource={currRec.lines}
                    scroll={{
                      // x: 1000,
                      y: 400,
                    }}
                  />
                </Col>
              </Row>
            </Space>
          </div>
        </Modal>
      </Space>
    </div>
  );
};

export default VendorForecastPage;
