import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { Space, Table, Tooltip, Modal, Card, Input } from "antd";
import { DeliveredProcedureOutlined, UploadOutlined } from "@ant-design/icons";
import { v4 as uuidV4 } from "uuid";

import {
  asyncImportItemCategories,
  setItemCategories,
} from "features/application/migrationSlice";
import { useDispatch, useSelector } from "react-redux";

const ItemCategoryMigration = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  // const [import_data, setImport_data] = useState([]);

  const import_data = useSelector((state) => state.migration.itemCategories);

  const [columns] = useState([
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      fixed: true,
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ]);

  const handleFileUpload = async (file) => {
    if (file) {
      // console.log("file on handle: ", file);
      const excelData = await file.arrayBuffer();

      const workbook = XLSX.read(excelData);

      if (workbook.SheetNames[0] === "Item Categories") {
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
        const data = jsonData.map((rec, idx) => {
          return {
            key: uuidV4(),
            code: rec["Code"],
            description: rec["Description"],
          };
        });

        // console.log("excel data: ", data);
        // setImport_data(data);
        dispatch(setItemCategories(data));
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
                <DeliveredProcedureOutlined
                  onClick={(e) => {
                    // e.stopPropagation();
                    // console.log("Items: ", import_data);
                    dispatch(asyncImportItemCategories(import_data));
                  }}
                />
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

export default ItemCategoryMigration;
