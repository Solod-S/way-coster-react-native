import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  itemsPerPage: 4,
};

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setItemsPerPage(state, action) {
      state.itemsPerPage = action.payload;
    },
  },
});

export const { setPage, setItemsPerPage } = tripsSlice.actions;

export default tripsSlice.reducer;
