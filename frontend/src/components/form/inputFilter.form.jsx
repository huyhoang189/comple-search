import { Col, DatePicker, Divider, Input, Row, Space, Typography } from "antd";

const InputFilter = ({}) => {
  return (
    <Row gutter={6}>
      <Col span={6}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Typography.Text>Tháng</Typography.Text>
          <DatePicker
            style={{ width: "100%" }}
            picker="month"
            placeholder="Chọn tháng"
          />
        </Space>
      </Col>
      <Col span={6}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Typography.Text>Tìm kiếm</Typography.Text>
          <Input placeholder="Tìm kiếm công việc" />
        </Space>
      </Col>
      <Divider style={{ margin: "10px" }}></Divider>
    </Row>
  );
};

export default InputFilter;
