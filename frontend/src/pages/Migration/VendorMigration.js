import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { Space, Table, Tooltip, Modal, Card, Input, Spin } from "antd";
import {
  DeliveredProcedureOutlined,
  UploadOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { v4 as uuidV4 } from "uuid";

import {
  asyncImportVendors,
  setVendors,
} from "features/application/migrationSlice";
import { useDispatch, useSelector } from "react-redux";

const VendorMigration = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  // const [import_data, setImport_data] = useState([]);
  const import_data = useSelector((state) => state.migration.vendors);
  const status = useSelector((state) => state.migration.status);

  const [columns] = useState([
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      fixed: true,
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
    {
      title: "Phone No.",
      dataIndex: "phone_no",
      key: "phone_no",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ]);

  const handleFileUpload = async (file) => {
    if (file) {
      // console.log("file on handle: ", file);
      const excelData = await file.arrayBuffer();

      const workbook = XLSX.read(excelData);

      if (workbook.SheetNames[0] === "Vendor") {
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
        const data = jsonData.map((rec, idx) => {
          return {
            key: uuidV4(),
            no: rec["No."],
            name: rec["Name"],
            address: rec["Address"],
            city: rec["City"],
            post_code: rec["Post Code"],
            phone_no: rec["Phone No."],
            email: rec["Email"],
          };
        });

        // console.log("excel data: ", data);
        // setImport_data(data);
        dispatch(setVendors(data));
      }
    } else {
      console.log("File was undefiend");
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
          extra={
            <Space>
              <Tooltip title="Import Data">
                <UploadOutlined
                  onClick={(e) => {
                    Modal.confirm({
                      onOk: () => {
                        const file = fileRef.current.input.files[0];
                        // console.log("\nfileRef: ", file);
                        handleFileUpload(file);
                      },
                      title: "Choose your excel data.",
                      content: (
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
                          />
                        </Space>
                      ),
                    });
                  }}
                />
              </Tooltip>
              <Tooltip title="Save to Database">
                {status === "Loading" ? (
                  <Spin indicator={<LoadingOutlined />} />
                ) : (
                  <DeliveredProcedureOutlined
                    onClick={(e) => {
                      dispatch(asyncImportVendors(import_data));
                    }}
                  />
                )}
              </Tooltip>
            </Space>
          }
        >
          <Table columns={columns} dataSource={import_data} size="small" />
        </Card>
      </Space>
    </div>
  );
};

export default VendorMigration;
