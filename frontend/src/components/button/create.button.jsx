import { Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
export default function CreateButton({ onClick, size = "medium" || "large" }) {
  return (
    <Tooltip title="Thêm mới dữ liệu">
      <Button
        className="blue-button"
        icon={<PlusOutlined />}
        type="none"
        onClick={onClick}
        style={{ width: size === "large" && 80 }}
      />
    </Tooltip>
  );
}
