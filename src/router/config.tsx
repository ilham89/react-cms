import * as React from "react";

import type { RouteProps } from "react-router";

import PrivateRoute from "./privateRoute";

export type WrapperRouteProps = RouteProps & {
  titleId: string;
  auth?: boolean;
};

const WrapperRouteComponent: React.FC<WrapperRouteProps> = ({ titleId, auth, ...props }) => {
  if (titleId) {
    document.title = titleId;
  }

  return auth ? <PrivateRoute {...props} /> : (props.element as React.ReactElement);
};

export default WrapperRouteComponent;
