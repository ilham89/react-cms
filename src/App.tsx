import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";

import RenderRouter from "./router";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <BrowserRouter>
          <RenderRouter />
        </BrowserRouter>
      </ConfigProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
