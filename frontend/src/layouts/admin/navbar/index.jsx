import {
  Button,
  Image,
  Layout,
  Menu,
  Popover,
  Row,
  Space,
  Typography,
  theme,
} from "antd";
import userLogo from "../../../assets/user_1.png";
import { useNavigate } from "react-router-dom";
import {
  AlignLeftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import appSlice from "../../../toolkits/app/slice";
import { useDispatch, useSelector } from "react-redux";
const { Header } = Layout;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { collapsed } = useSelector((state) => state.app);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Header
      style={{
        width: "100%",
        position: "relative",
        backgroundColor: colorBgContainer,
        paddingLeft: 0,
      }}
    >
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          type="none"
          icon={<AlignLeftOutlined />}
          onClick={() => dispatch(appSlice.actions.collapsedSiderbar())}
          style={{
            width: 64,
            height: 64,
          }}
        />

        <Popover
          content={
            <Menu mode="inline" theme="light" style={{ margin: 0 }}>
              <Menu.Item>Quản trị tài khoản</Menu.Item>
              <Menu.Item
                onClick={() => {
                  // dispatch(authSlice.actions.logout());
                  navigate("login", { replace: true });
                }}
              >
                Đăng xuất
              </Menu.Item>
            </Menu>
          }
          trigger="click"
        >
          <Space direction="horizontal">
            <Image width={30} height={30} preview={false} src={userLogo} />
            <Typography.Text style={{ color: "#000", fontWeight: "bold" }}>
              {user?.name}
            </Typography.Text>
          </Space>
        </Popover>
      </Row>
    </Header>
  );
};

export default Navbar;
