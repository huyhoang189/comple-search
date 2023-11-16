import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  departments: [],
  departmentsRaw: [],
  department: {
    _id: "",
    name: "",
    shortName: "",
    parent: "",
    // parent: {
    //   _id: null,
    //   name: "",
    // },
    level: 1,
  },
  selectedDepartment: {
    _id: "",
    name: "",
    shortName: "",
    // parent: {
    //   _id: null,
    //   name: "",
    // },
    level: 1,
  },
  errorMassage: false,
  isLoading: false,
  modalActive: false,
};

const reducer = createSlice({
  name: "departments",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedDepartment =
        action.payload !== null ? action.payload : initialState.department;
    },
    getDepartments: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
    },
    getDepartmentsSuccess: (state, action) => {
      state.errorMassage = false;
      state.departments = action.payload;
    },
    getDepartmentsError: (state, action) => {
      state.errorMassage = "Error";
    },

    getRaw: (state, action) => {},
    getRawSuccess: (state, action) => {
      state.errorMassage = false;
      state.departmentsRaw = action.payload;
    },
    getRawError: (state, action) => {
      state.errorMassage = "Error";
    },
    processingDepartment: (state, action) => {},
    processingDepartmentSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.employees = action.payload;
    },
    processingDepartmentError: (state, action) => {},
    updateSelectedDepartmentInput: (state, action) => {
      state.selectedDepartment = action.payload;
    },
  },
});

export default reducer;
