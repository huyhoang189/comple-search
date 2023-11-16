import { Button, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
export default function DeleteButton({ onClick }) {
  return (
    <Popconfirm
      title="Bạn có muốn xoá bản ghi không ?"
      onConfirm={onClick}
      okText="Đồng ý"
      cancelText="Không đồng ý"
      placement="leftTop"
    >
      <Tooltip title="Xoá dữ liệu">
        <Button shape="retangle" danger icon={<DeleteOutlined />} />
      </Tooltip>
    </Popconfirm>
  );
}
