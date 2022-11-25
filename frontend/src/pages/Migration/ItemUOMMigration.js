import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { Space, Table, Tooltip, Modal, Card, Input } from "antd";
import { DeliveredProcedureOutlined, UploadOutlined } from "@ant-design/icons";
import { v4 as uuidV4 } from "uuid";

import {
  asyncImportUnitsOfMeasure,
  setUnitOfMeasureData,
} from "features/application/migrationSlice";
import { useDispatch, useSelector } from "react-redux";

const ItemUOMMigration = () => {
  const dispatch = useDispatch();

  const fileRef = useRef(null);
  // const [import_data, setImport_data] = useState([]);

  const import_data = useSelector((state) => state.migration.unitsOfMeasure);

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
    {
      title: "Quantity Per",
      dataIndex: "quantity_per",
      key: "quantity_per",
    },
  ]);

  const handleFileUpload = async (file) => {
    if (file) {
      // console.log("file on handle: ", file);
      const excelData = await file.arrayBuffer();

      const workbook = XLSX.read(excelData);

      if (workbook.SheetNames[0] === "Units of Measure") {
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
        const data = jsonData.map((rec, idx) => {
          return {
            key: uuidV4(),
            code: rec["Code"],
            description: rec["Description"],
            quantity_per: 1,
          };
        });

        // console.log("excel data: ", data);
        dispatch(setUnitOfMeasureData(data));
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
                    // console.log("import_data: ", import_data);
                    dispatch(asyncImportUnitsOfMeasure(import_data));
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

export default ItemUOMMigration;
