import { Table } from "antd";
import { formatDateAndTime } from "../../utils";

export const departmentColumn = [
  {
    title: "STT",
    dataIndex: "key",
    key: "key",
    width: 300,
    align: "center",
  },
  {
    title: "Tên đơn vị",
    dataIndex: "name",
    key: "name",
    align: "center",
    width: 350,
    render: (text, record) => {
      return <p style={{ textAlign: "left" }}>{record?.name}</p>;
    },
  },
  {
    title: "Ký hiệu",
    dataIndex: "shortName",
    key: "shortName",
    align: "center",
    width: 150,
  },
  {
    title: "Cấp",
    dataIndex: "level",
    key: "level",
    align: "center",
    width: 50,
  },

  {
    title: "Tên đơn vị cha",
    dataIndex: "parentName",
    key: "parentName",
    align: "center",
    width: 220,
    render: (text, record) => {
      return record?.parent?.shortName;
    },
  },
  {
    title: "Cập nhật mới nhất",
    dataIndex: "updatedAt",
    key: "updatedAt",
    align: "center",
    render: (text, record) => {
      return formatDateAndTime(record?.updatedAt);
    },
  },
];
