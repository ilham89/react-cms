import * as React from "react";

import { Button, Result } from "antd";
import type { RouteProps } from "react-router";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

import useUser from "@/stores/user";

const PrivateRoute: React.FC<RouteProps> = ({ element }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logged] = useUser((state) => [state.logged]);

  return logged ? (
    (element as React.ReactElement)
  ) : (
    <div className="box-wrapper">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button
            type="primary"
            onClick={() =>
              navigate(`/login${"?from=" + encodeURIComponent(location.pathname)}`, {
                replace: true,
              })
            }
          >
            Go To Login
          </Button>
        }
      />
    </div>
  );
};

export default PrivateRoute;
