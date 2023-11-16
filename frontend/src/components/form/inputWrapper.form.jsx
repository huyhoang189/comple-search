import { Space, Typography } from "antd";

const InputWrapper = ({ title = "Tilte element", children }) => {
  return (
    <Space
      style={{ width: "100%", marginBottom: 10 }}
      direction="vertical"
      size={4}
    >
      <Typography.Text style={{ marginBottom: 0 }}>{title}</Typography.Text>
      {children}
    </Space>
  );
};

export default InputWrapper;
