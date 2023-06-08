import type { FC } from "react";

import "./index.scss";

import { Typography } from "antd";

const RoutePermissionPage: FC = () => {
  return (
    <div className="permission-page">
      <Typography className="permission-intro">
        When you see this page, it means you are logged in.
      </Typography>
    </div>
  );
};

export default RoutePermissionPage;
