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
  asyncImportItems,
  setItems,
} from "features/application/migrationSlice";
import { useDispatch, useSelector } from "react-redux";

const ItemMigration = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  // const [import_data, setImport_data] = useState([]);
  const import_data = useSelector((state) => state.migration.items);
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
      title: "Description",
      dataIndex: "description",
      key: "description",
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
    {
      title: "Base Unit of Measure",
      dataIndex: "base_unit_of_measure_code",
      key: "base_unit_of_measure_code",
    },
    {
      title: "Item Category Code",
      dataIndex: "item_category_code",
      key: "item_category_code",
    },
  ]);

  const handleFileUpload = async (file) => {
    if (file) {
      // console.log("file on handle: ", file);
      const excelData = await file.arrayBuffer();

      const workbook = XLSX.read(excelData);

      if (workbook.SheetNames[0] === "Items") {
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
        const data = jsonData.map((rec, idx) => {
          return {
            key: uuidV4(),
            no: rec["No."],
            description: rec["Description"],
            kb_sd: rec["KB SD"],
            base_unit_of_measure_code: rec["Base Unit of Measure"],
            model: rec["Model"],
            item_category_code: rec["Item Category Code"],
          };
        });

        // console.log("excel data: ", data);
        // setImport_data(data);
        dispatch(setItems(data));
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
                      dispatch(asyncImportItems(import_data));
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

export default ItemMigration;
