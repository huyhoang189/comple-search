import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  fmcs: [],
  fmc: {
    _id: "",
    name: "",
    department: {},
  },
  selectedFmc: {
    _id: "",
    name: "",
    department: {},
  },
  limit: 10,
  page: 1,
  total: 0,
  errorMassage: false,
  isLoading: false,
  modalActive: false,
};

const reducer = createSlice({
  name: "fmcs",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedFmc =
        action.payload !== null ? action.payload : initialState.fmc;
    },
    getFmcs: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
    },
    getFmcsSuccess: (state, action) => {
      state.errorMassage = false;
      state.fmcs = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },
    getFmcsError: (state, action) => {
      state.errorMassage = "Error";
    },

    processingFmc: (state, action) => {},
    processingFmcSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
    },
    processingFmcError: (state, action) => {},
    updateSelectedFmcInput: (state, action) => {
      state.selectedFmc = action.payload;
    },
  },
});

export default reducer;
