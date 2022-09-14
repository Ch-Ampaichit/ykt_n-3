import { Space, Card, Collapse, Tooltip } from "antd";
import { UploadOutlined, DeliveredProcedureOutlined } from "@ant-design/icons";
import React from "react";
import ItemCategoryMigration from "./ItemCategoryMigration";
import ItemMigration from "./ItemMigration";
import ItemUOMMigration from "./ItemUOMMigration";
import VendorMigration from "./VendorMigration";
import PersonMigration from "./PersonMigration";
import PhoneMigration from "./PhoneMigration";
import ContactMigration from "./ContactMigration";

const { Panel } = Collapse;

const MigrationPage = () => {
  return (
    <div>
      <Space
        direction="vertical"
        size={"small"}
        style={{
          display: "flex",
        }}
      >
        <Card title="Data Migrations">
          <Collapse>
            <Panel
              header="Items"
              key={"items"}
              extra={
                <Space>
                  <Tooltip title="Import Data">
                    <UploadOutlined onClick={(e) => e.stopPropagation()} />
                  </Tooltip>
                  <Tooltip title="Save to Database">
                    <DeliveredProcedureOutlined
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Tooltip>
                </Space>
              }
            >
              <ItemMigration />
            </Panel>
            <Panel
              header="Item Category"
              key={"item_category"}
              extra={
                <Space>
                  <Tooltip title="Import Data">
                    <UploadOutlined onClick={(e) => e.stopPropagation()} />
                  </Tooltip>
                  <Tooltip title="Save to Database">
                    <DeliveredProcedureOutlined
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Tooltip>
                </Space>
              }
            >
              <ItemCategoryMigration />
            </Panel>
            <Panel
              header="Unit of Measure"
              key={"unit_of_measure"}
              extra={
                <Space>
                  <Tooltip title="Import Data">
                    <UploadOutlined onClick={(e) => e.stopPropagation()} />
                  </Tooltip>
                  <Tooltip title="Save to Database">
                    <DeliveredProcedureOutlined
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Tooltip>
                </Space>
              }
            >
              <ItemUOMMigration />
            </Panel>
            <Panel
              header="Vendors"
              key={"venoors"}
              extra={
                <Space>
                  <Tooltip title="Import Data">
                    <UploadOutlined onClick={(e) => e.stopPropagation()} />
                  </Tooltip>
                  <Tooltip title="Save to Database">
                    <DeliveredProcedureOutlined
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Tooltip>
                </Space>
              }
            >
              <VendorMigration />
            </Panel>
            <Panel
              header="Contact"
              key={"contact"}
              extra={
                <Space>
                  <Tooltip title="Import Data">
                    <UploadOutlined onClick={(e) => e.stopPropagation()} />
                  </Tooltip>
                  <Tooltip title="Save to Database">
                    <DeliveredProcedureOutlined
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Tooltip>
                </Space>
              }
            >
              <ContactMigration />
            </Panel>
            <Panel
              header="Person"
              key={"person"}
              extra={
                <Space>
                  <Tooltip title="Import Data">
                    <UploadOutlined onClick={(e) => e.stopPropagation()} />
                  </Tooltip>
                  <Tooltip title="Save to Database">
                    <DeliveredProcedureOutlined
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Tooltip>
                </Space>
              }
            >
              <PersonMigration />
            </Panel>
            <Panel
              header="Phones"
              key={"phones"}
              extra={
                <Space>
                  <Tooltip title="Import Data">
                    <UploadOutlined onClick={(e) => e.stopPropagation()} />
                  </Tooltip>
                  <Tooltip title="Save to Database">
                    <DeliveredProcedureOutlined
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Tooltip>
                </Space>
              }
            >
              <PhoneMigration />
            </Panel>
          </Collapse>
        </Card>
      </Space>
    </div>
  );
};

export default MigrationPage;
