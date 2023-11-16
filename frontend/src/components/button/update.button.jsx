import { Button, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
export default function UpdateButton({ onClick }) {
  return (
    <Tooltip title="Cập nhật dữ liệu">
      <Button
        className="yellow-button"
        icon={<EditOutlined />}
        type="none"
        onClick={onClick}
      />
    </Tooltip>
  );
}
