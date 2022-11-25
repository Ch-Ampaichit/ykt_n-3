import { Space, Card, Collapse, Tooltip, Modal } from "antd";
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
            <Panel header="Items" key={"items"}>
              <ItemMigration />
            </Panel>
            <Panel header="Item Category" key={"item_category"}>
              <ItemCategoryMigration />
            </Panel>
            <Panel header="Unit of Measure" key={"unit_of_measure"}>
              <ItemUOMMigration />
            </Panel>
            <Panel header="Vendors" key={"venoors"}>
              <VendorMigration />
            </Panel>
            <Panel header="Contact" key={"contact"}>
              <ContactMigration />
            </Panel>
            <Panel header="Person" key={"person"}>
              <PersonMigration />
            </Panel>
            <Panel header="Phones" key={"phones"}>
              <PhoneMigration />
            </Panel>
          </Collapse>
        </Card>
      </Space>
    </div>
  );
};

export default MigrationPage;
