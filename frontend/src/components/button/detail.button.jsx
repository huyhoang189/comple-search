import { Button, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
export default function DetailButton({ onClick }) {
  return (
    <Tooltip title="Cập nhật dữ liệu">
      <Button
        className="red-button"
        icon={<InfoCircleOutlined />}
        type="none"
        onClick={onClick}
      />
    </Tooltip>
  );
}
