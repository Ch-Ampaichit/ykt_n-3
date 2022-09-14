import React from "react";
import { Result } from "antd";
import { Link } from "react-router-dom";

const Result500Page = () => {
  return (
    <div>
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Link to={"/"}>Back Home</Link>}
      />
    </div>
  );
};

export default Result500Page;
