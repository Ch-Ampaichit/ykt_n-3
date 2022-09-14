import React from "react";
import { Col, Row, Typography, Card } from "antd";
// import axios from "axios";
import { v4 as uuidV4 } from "uuid";

// import {
//   DeleteOutlined,
//   EditOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";

const { Title } = Typography;

const DashboardPage = (props) => {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   axios.get("https://jsonplaceholder.typicode.com/posts").then((resp) => {
  //     // console.log("response : ", resp.data);
  //     setPosts([...resp.data]);
  //   });
  // }, [posts]);

  return (
    <div>
      <Row wrap>
        <Col>
          <Title level={3}>Dashboard</Title>
        </Col>
      </Row>
      <Row
        gutter={[18, 18]}
        align={"stretch"}
        justify={"start"}
        style={{ paddingBottom: 15 }}
      >
        <Col
          key={uuidV4()}
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
          xl={{ span: 6 }}
        >
          <Card
            key="absent-card"
            title="Last Generated Forecast Period"
            // actions={[
            //   <SettingOutlined />,
            //   <EditOutlined />,
            //   <DeleteOutlined />,
            // ]}
          >
            <div style={{ height: 100 }}></div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
