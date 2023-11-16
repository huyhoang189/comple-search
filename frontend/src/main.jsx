import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers";
import { Provider } from "react-redux";
import { store } from "./toolkits/store";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  // <Provider store={store}>
  //   <RouterProvider router={router} />
  // </Provider>
  // </React.StrictMode>,
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#004280",
        colorBgHeader: "#99ebff",
        colorBgNavbar: "#003566",
        borderRadius: 2,
        fontSize: 13,
      },
    }}
  >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ConfigProvider>
);
