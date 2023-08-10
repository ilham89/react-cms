import * as React from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider, Spin } from "antd";
import Cookies from "js-cookie";
import { BrowserRouter } from "react-router-dom";

import RenderRouter from "./router";
import useUser from "./stores/user";

const queryClient = new QueryClient();

const App = () => {
  const [setUserItem] = useUser((state) => [state.setUserItem]);

  React.useEffect(() => {
    setUserItem({
      logged: !!Cookies.get("user_ct"),
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1F456E",
            colorText: "#252525",
            colorError: "#DA4453",
            colorSuccess: "#44DA80",
          },
          components: {
            Button: {},
            Table: {},
            Tag: {
              borderRadiusSM: 40,
              colorErrorBg: "#FAD7DD",
              colorSuccessBg: "#E7FFF5",
            },
          },
        }}
      >
        <BrowserRouter>
          <React.Suspense
            fallback={<Spin spinning className="app-loading-wrapper" tip="Loading..." />}
          >
            <RenderRouter />
          </React.Suspense>
        </BrowserRouter>
      </ConfigProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
