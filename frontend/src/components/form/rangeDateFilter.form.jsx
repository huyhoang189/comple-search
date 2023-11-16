import { Col, DatePicker, Divider, Input, Row, Space, Typography } from "antd";

const { RangePicker } = DatePicker;
const RangeDateFilter = ({}) => {
  return (
    <Row gutter={6}>
      <Col span={8}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Typography.Text>Thời gian</Typography.Text>
          <RangePicker
            style={{ width: "100%" }}
            picker="month"
            placeholder={["Bắt đầu", "Kết thúc"]}
            // placeholder="Chọn tháng"
          />
        </Space>
      </Col>

      <Divider style={{ margin: "10px" }}></Divider>
    </Row>
  );
};

export default RangeDateFilter;
