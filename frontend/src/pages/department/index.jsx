import {
  Breadcrumb,
  Button,
  Divider,
  Popconfirm,
  Row,
  Space,
  Table,
  Tooltip,
  Col,
  Typography,
  Input,
} from "antd";
import { departmentColumn } from "./column";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import departmentsSlice from "../../toolkits/department/slice";
import * as icons from "react-icons/ai";
import ModalItem from "./modal";
import UpdateButton from "../../components/button/update.button";
import DeleteButton from "../../components/button/delete.button";
import CreateButton from "../../components/button/create.button";
import { HANDLE_TYPE } from "../../commons/constant";
const Departments = () => {
  const dispatch = useDispatch();
  const { departments, department } = useSelector((state) => state.departments);
  const [keyword, setKeyword] = useState("");

  const columns = [
    ...departmentColumn,
    {
      title: "Công cụ",
      key: "tool",
      align: "center",
      width: 140,
      render: (text, record) => (
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "center" }}
        >
          <CreateButton
            onClick={() =>
              handleModal({
                ...department,
                parent: {
                  ...record,
                },
              })
            }
          />
          <UpdateButton onClick={() => handleModal(record)} />
          <DeleteButton
            onClick={() =>
              dispatch(
                departmentsSlice.actions.processingDepartment({
                  item: record,
                  actionName: HANDLE_TYPE.DELETE_ITEM,
                })
              )
            }
          />
        </Space>
      ),
    },
  ];

  //filter for data
  const onFilterInputChange = (key, event) => {
    setKeyword(event.target.value);
  };
  //handle open modal
  const handleModal = (_item) => {
    dispatch(departmentsSlice.actions.toggleModal(_item));
  };

  let dataSource = [];

  departments.map((e, i) => {
    dataSource.push({
      ...e,
      key: i + 1,
    });
  });
  //effect
  useEffect(() => {
    dispatch(departmentsSlice.actions.getDepartments({ keyword }));
  }, [dispatch, keyword]);
  return (
    <div>
      <Row>
        <Breadcrumb
          style={{ margin: "auto", marginLeft: 0 }}
          items={[
            {
              title: "Chung",
            },
            {
              title: (
                <span style={{ fontWeight: "bold" }}>Danh sách đơn vị</span>
              ),
            },
          ]}
        />
        <CreateButton
          onClick={() => handleModal(null)}
          style={{ marginLeft: "auto" }}
          size="large"
        />
        <ModalItem />
        <Divider style={{ margin: "10px" }}></Divider>
      </Row>
      <Row
        gutter={16}
        style={{
          width: "100%",
        }}
      >
        <Col span={6}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Typography.Text level={5}>Tìm kiếm</Typography.Text>
            <Input
              placeholder="Nhập từ khoá"
              onChange={(e) => onFilterInputChange("Keyword", e)}
            />
          </Space>
        </Col>
        <Divider style={{ margin: "10px" }}></Divider>
      </Row>
      <Table
        style={{ width: "100%" }}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default Departments;
