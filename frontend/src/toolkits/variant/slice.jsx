import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  variants: [],
  variant: {
    _id: "",
    name: "",
    hash: "",
    malwareId: "",
  },
  selectedVariant: {
    _id: "",
    name: "",
    hash: "",
    malwareId: "",
  },
  errorMassage: false,
  isLoading: false,
  modalActive: false,
};

const reducer = createSlice({
  name: "variants",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedVariant =
        action.payload !== null ? action.payload : initialState.variant;
    },
    getVariants: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
    },
    getVariantsSuccess: (state, action) => {
      state.errorMassage = false;
      state.variants = action.payload;
    },
    getVariantsError: (state, action) => {
      state.errorMassage = "Error";
    },
    processingVariant: (state, action) => {},
    processingVariantSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.employees = action.payload;
    },
    processingVariantError: (state, action) => {},
    updateSelectedVariantInput: (state, action) => {
      state.selectedVariant = action.payload;
    },
  },
});

export default reducer;
