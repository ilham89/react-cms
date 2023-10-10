import * as React from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider, App as AppAntd } from "antd";
import { BrowserRouter } from "react-router-dom";

import RenderRouter from "./router";
import { queryClient } from "./utils/queryClient";

const App = () => {
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
        <AppAntd
          notification={{
            placement: "topRight",
          }}
        >
          <BrowserRouter>
            <React.Suspense fallback={null}>
              <RenderRouter />
            </React.Suspense>
          </BrowserRouter>
        </AppAntd>
      </ConfigProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
