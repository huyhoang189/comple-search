import {
  MenuFoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { LayoutWrapper } from "../../assets/style/layout.style";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./siderbar";
import Navbar from "./navbar";
const { Footer, Content } = Layout;
const Layouts = () => {
  return (
    <LayoutWrapper>
      <Content
        className="site-layout-background"
        style={{
          margin: 5,
          minHeight: "60rem",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          padding: "10px",
          marginLeft: 5,
        }}
      >
        <Outlet />
      </Content>
    </LayoutWrapper>
  );
};
export default Layouts;
