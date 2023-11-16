import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  collapsed: false,
};

const reducer = createSlice({
  name: "Apps",
  initialState,
  reducers: {
    collapsedSiderbar: (state, action) => {
      state.collapsed = !state.collapsed;
    },
  },
});

export default reducer;
