import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  categories: [],
  category: {
    _id: "",
    name: "",
    description: "",
  },
  selectedCategory: {
    _id: "",
    name: "",
    description: "",
  },
  errorMassage: false,
  isLoading: false,
  modalActive: false,
};

const reducer = createSlice({
  name: "categories",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedCategory =
        action.payload !== null ? action.payload : initialState.category;
    },
    getCategories: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
    },
    getCategoriesSuccess: (state, action) => {
      state.errorMassage = false;
      state.categories = action.payload;
    },
    getCategoriesError: (state, action) => {
      state.errorMassage = "Error";
    },
    processingCategory: (state, action) => {},
    processingCategorySuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.employees = action.payload;
    },
    processingCategoryError: (state, action) => {},
    updateSelectedCategoryInput: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export default reducer;
