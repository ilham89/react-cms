import { CloudUploadOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";

import "./style.scss";

const UploadImage = () => {
  const { Text } = Typography;
  return (
    <div className="upload-image">
      <Space direction="vertical" align="center">
        <CloudUploadOutlined />
        <Text color="#6C6C6C">Drop files here to upload</Text>
      </Space>
    </div>
  );
};

export default UploadImage;
