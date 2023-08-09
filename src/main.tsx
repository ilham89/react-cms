import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.scss";
import "antd/dist/reset.css";
import "react-quill/dist/quill.snow.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
