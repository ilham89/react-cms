import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="box-wrapper">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            When you see this page, it means you are logged in.
          </Button>
        }
      ></Result>
    </div>
  );
};

export default NotFoundPage;
