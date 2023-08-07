import { ExclamationCircleFilled } from "@ant-design/icons";
import { Space } from "antd";
import "./style.scss";

interface RequiredMessageProps {
  label?: string;
}

const RequiredMessage = ({ label }: RequiredMessageProps) => {
  return (
    <Space className="required-message" size="small">
      <ExclamationCircleFilled />
      {label || "This field is mandatory"}
    </Space>
  );
};

export default RequiredMessage;
