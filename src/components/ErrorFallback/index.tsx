import { Space, Typography } from "antd";
import { FallbackProps } from "react-error-boundary";
import "./style.scss";

const ErrorFallback = ({ error }: FallbackProps) => {
  const { Title, Text } = Typography;
  return (
    <div role="alert" className="error-fallback">
      <Space direction="vertical">
        <Title level={4} type="danger">
          Something went wrong:
        </Title>
        <Text type="danger">{error.message}</Text>
      </Space>
    </div>
  );
};

export default ErrorFallback;
