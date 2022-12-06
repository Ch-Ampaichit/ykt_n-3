import React, { useEffect, useState } from "react";
import {
  Space,
  Card,
  Table,
  Typography,
  Button,
  Modal,
  Row,
  Col,
  Descriptions,
  Spin,
  message,
} from "antd";
import {
  // CloseCircleOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  SendOutlined,
  LeftOutlined,
  RightOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import {
  asyncInitPageData,
  asyncSetCurrRec,
  // asyncSendEmail,
  setModalVisible,
} from "features/application/postedVendForecastSlice";
import * as XLSX from "xlsx";
import { report_url } from "config";
import axios from "axios";

import { api_url } from "config/api";

const PostedVendForecastPage = () => {
  const dispatch = useDispatch();

  const [selectedRowId, setSelectedRowId] = useState(0);

  const datasource = useSelector(
    (state) => state.posted_vend_forecast.datasource
  );
  // console.log("datasource: ", datasource);

  const currRec = useSelector((state) => state.posted_vend_forecast.currRec);
  // console.log("currRec: ", currRec);

  const status = useSelector((state) => state.posted_vend_forecast.status);
  const mail_status = useSelector(
    (state) => state.posted_vend_forecast.mail_status
  );
  // console.log("mail_status: ", mail_status);

  const modalVisible = useSelector(
    (state) => state.posted_vend_forecast.modalVisible
  );
  // console.log("modalVisible: ", modalVisible);

  //   const columns = [{ title: "" }];
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

  useEffect(() => {
    dispatch(asyncInitPageData());
    // eslint-disable-next-line
  }, []);

  const handleOnRow = (rec, rowIndex) => {
    return {
      onClick: () => {
        setSelectedRowId(rowIndex);
        // generatePeriodMonths();
        dispatch(asyncSetCurrRec(rec.description));
      },
    };
  };

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

  const handleSendEmail = async () => {
    // dispatch(asyncSendEmail(currRec.header.description));

    const token = localStorage.getItem("token");
    try {
      await axios({
        method: "Post",
        url: `${api_url.posted_vendor_forecast}${currRec.header.description}/send_email/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      });
      // console.log("response: ", resp);
      message.success("You already sent email.");
      // return resp.data;
    } catch (err) {
      // console.log("Error: ", err.response);
      message.error(err.response.data.detail);
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
            <Typography.Text className="label-header">
              Posted Vendor Forecast
            </Typography.Text>
          }
          size="small"
        >
          <Table
            loading={status === "Loading"}
            size="small"
            bordered
            columns={[
              {
                title: "Document No.",
                dataIndex: "description",
                key: "key",
                width: "15%",
                render: (txt, rec) => {
                  return <Button type="link">{txt}</Button>;
                },
              },
              {
                title: "Vendor No.",
                dataIndex: "vendor_no",
                key: "vendor_no",
                align: "center",
                width: "10%",
              },
              {
                title: "Vendor Name",
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
                key: "issued_fullname",
              },
              {
                title: "Approved By",
                dataIndex: "approved_fullname",
                key: "approved_fullname",
              },
            ]}
            dataSource={datasource}
            onRow={handleOnRow}
            scroll={{
              x: 1300,
              y: 455,
            }}
            pagination={{
              pageSize: 1000,
              pageSizeOptions: [1000, 2000, 5000],
            }}
          />
        </Card>
        <Modal
          visible={modalVisible}
          title={"Posted Vendor Forecast"}
          onCancel={() => dispatch(setModalVisible(false))}
          onOk={() => dispatch(setModalVisible(false))}
          width={"80vw"}
          style={{
            top: 16,
          }}
          footer={
            <Row justify="center">
              <Button
                icon={
                  <LeftOutlined
                    onClick={() => {
                      if (selectedRowId > 0) {
                        const newId = selectedRowId - 1;
                        setSelectedRowId(newId);
                        const currRec = datasource[newId];
                        // console.log("currRec: ", datasource[newId]);
                        dispatch(asyncSetCurrRec(currRec.description));
                        // generatePeriodMonths();
                      }
                    }}
                  />
                }
              />
              <Button
                icon={
                  <RightOutlined
                    onClick={() => {
                      if (selectedRowId < datasource.length - 1) {
                        const newId = selectedRowId + 1;
                        setSelectedRowId(newId);
                        const currRec = datasource[newId];
                        // console.log("currRec: ", datasource[newId]);
                        dispatch(asyncSetCurrRec(currRec.description));
                      }
                    }}
                  />
                }
              />
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
                          icon={<FilePdfOutlined />}
                          href={`${report_url.posted_vendor_forecast}${currRec.header.description}`}
                          target={"_blank"}
                        >
                          PDF
                        </Button>
                        <Button
                          icon={<FileExcelOutlined />}
                          onClick={() => {
                            handleExportExcel();
                          }}
                        >
                          Excel
                        </Button>
                        <Button
                          icon={
                            mail_status === "Loading" ? (
                              <Spin indicator={<LoadingOutlined spin />} />
                            ) : (
                              <SendOutlined />
                            )
                          }
                          onClick={() => handleSendEmail()}
                        >
                          Email
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
                          {moment(currRec.header.created_at).format(
                            "DD/MM/YYYY H:mm:ss"
                          )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Approved at">
                          {moment(currRec.header.apporved_at).format(
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
                    columns={[
                      {
                        title: "KB SD",
                        dataIndex: "kb_sd",
                        key: "kb_sd",
                        align: "center",
                      },
                      {
                        title: "Part No./Part Name",
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
                      },
                      {
                        title: currRec.periodMonth.m1,
                        dataIndex: "m1_qty",
                        key: "m1_qty",
                        align: "right",
                        render: (dt) => {
                          const qty = parseFloat(dt);
                          return qty.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          });
                        },
                      },
                      {
                        title: currRec.periodMonth.m2,
                        dataIndex: "m2_qty",
                        key: "m2_qty",
                        align: "right",
                        render: (dt) => {
                          const qty = parseFloat(dt);
                          return qty.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          });
                        },
                      },
                      {
                        title: currRec.periodMonth.m3,
                        dataIndex: "m3_qty",
                        key: "m3_qty",
                        align: "right",
                        render: (dt) => {
                          const qty = parseFloat(dt);
                          return qty.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          });
                        },
                      },
                      {
                        title: currRec.periodMonth.m4,
                        dataIndex: "m4_qty",
                        key: "m4_qty",
                        align: "right",
                        render: (dt) => {
                          const qty = parseFloat(dt);
                          return qty.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          });
                        },
                      },
                    ]}
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

export default PostedVendForecastPage;
