import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../../assets/style/modal.style";
import InputWrapper from "../../components/form/inputWrapper.form";
import TextArea from "antd/es/input/TextArea";
import { Input, InputNumber, Select, DatePicker, TreeSelect } from "antd";
import { useEffect } from "react";
import departmentSlice from "../../toolkits/department/slice";
import { HANDLE_TYPE } from "../../commons/constant";
import { generateTrees } from "../../utils";

export default function ModalItem() {
  const dispatch = useDispatch();

  const { modalActive, selectedDepartment, departments, departmentsRaw } =
    useSelector((state) => state.departments);

  //use for change input component
  const onChangeInputRecord = (key, event) => {
    let record = Object.assign({}, selectedDepartment);
    if (key) {
      record[key] = event.target.value;
    }
    dispatch(departmentSlice.actions.updateSelectedDepartmentInput(record));
  };

  //use for change selected component
  const onChangeSelectedRecord = (key, event) => {
    let record = Object.assign({}, selectedDepartment);

    if (key) {
      let temp = departmentsRaw.find((e) => e._id === event);
      record[key] = temp;
    }
    dispatch(departmentSlice.actions.updateSelectedDepartmentInput(record));
  };

  const onProcessingRecord = (actionName, _item) => {
    //validate data here

    //call processing data
    dispatch(
      departmentSlice.actions.processingDepartment({
        item: _item,
        actionName: actionName,
      })
    );
  };

  const handleModal = (_item) => {
    dispatch(departmentSlice.actions.toggleModal(_item));
  };

  // side effect (call any state that you need for modal)
  useEffect(() => {
    if (modalActive === true) {
      dispatch(departmentSlice.actions.getRaw());
    }
  }, [modalActive]);

  let treeData = [];
  treeData = generateTrees(departmentsRaw);

  return (
    <ModalWrapper
      okText="Chấp nhận"
      cancelText="Từ chối"
      // width={500}
      onCancel={() => handleModal(null)}
      open={modalActive}
      maskClosable={false}
      title={selectedDepartment?._id ? "Cập nhật đơn vị" : "Thêm mới đơn vị"}
      onOk={
        selectedDepartment._id
          ? () =>
              onProcessingRecord(HANDLE_TYPE.UPDATE_ITEM, selectedDepartment)
          : () => onProcessingRecord(HANDLE_TYPE.ADD_ITEM, selectedDepartment)
      }
    >
      <InputWrapper title="Tên đơn vị">
        <Input
          placeholder="Nhập tên đơn vị"
          value={selectedDepartment?.name}
          onChange={(e) => onChangeInputRecord("name", e)}
        />
      </InputWrapper>

      <InputWrapper title="Ký hiệu">
        <Input
          placeholder="Nhập ký hiệu"
          value={selectedDepartment?.shortName}
          onChange={(e) => onChangeInputRecord("shortName", e)}
        />
      </InputWrapper>
      <InputWrapper title="Cấp">
        <Input
          placeholder="Nhập cấp"
          value={selectedDepartment?.level}
          onChange={(e) => onChangeInputRecord("level", e)}
        />
      </InputWrapper>
      <InputWrapper title="Phòng cấp trên">
        {/* <Select
          placeholder="Chọn phòng"
          showSearch
          style={{ width: "100%" }}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: null,
              label: "Không có đơn vị cha",
            },
            ...departmentsRaw.map((e, i) => {
              return {
                value: e._id,
                label: `${e.name} - ${e?.parent?.shortName || "BQP"}`,
              };
            }),
          ]}
          value={selectedDepartment?.parent?._id}
          onChange={(e) => onChangeSelectedRecord("parent", e)}
        /> */}

        <TreeSelect
          treeLine={true}
          style={{
            width: "100%",
          }}
          treeData={treeData}
          value={selectedDepartment?.parent?._id}
          onChange={(e) => onChangeSelectedRecord("parent", e)}
        />
      </InputWrapper>
    </ModalWrapper>
  );
}
