import Sider from "antd/es/layout/Sider";
import Logo from "../../../assets/logo.png";
import { Image, Menu } from "antd";
import * as iconsAnt from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import appSlice from "../../../toolkits/app/slice";
import { useDispatch, useSelector } from "react-redux";
const items = [
  {
    key: "departments",
    label: "Đơn vị",
    icon: <iconsAnt.AiFillHome />,
  },
  {
    key: "malwares",
    label: "Mã độc",
    icon: <iconsAnt.AiFillMail />,
  },
  {
    key: "fmcs",
    label: "Danh mục máy chủ FMC",
    icon: <iconsAnt.AiFillMail />,
  },
  {
    key: "category",
    label: "Danh mục báo cáo",
    icon: <iconsAnt.AiFillMail />,
  },
  {
    key: "today",
    label: "Trong ngày",
    icon: <iconsAnt.AiFillMail />,
  },
  {
    key: "search",
    label: "Tìm kiếm",
    icon: <iconsAnt.AiFillMail />,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate(e.key);
  };

  const { collapsed } = useSelector((state) => state.app);

  // console.log(window.location);
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <Image src={Logo} preview={false} style={{ padding: 5 }} />
      <Menu
        selectedKeys={window.location.pathname.split("/")[2]}
        items={items}
        theme="dark"
        onClick={onClick}
      />
    </Sider>
  );
};

export default Sidebar;
