import * as React from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider, Spin } from "antd";
import { BrowserRouter } from "react-router-dom";

import RenderRouter from "./router";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
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
