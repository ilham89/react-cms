import type { FC } from "react";

import { Typography } from "antd";

const RoutePermissionPage: FC = () => {
  return (
    <div className="box-wrapper">
      <Typography className="permission-intro">
        When you see this page, it means you are logged in.
      </Typography>
    </div>
  );
};

export default RoutePermissionPage;
