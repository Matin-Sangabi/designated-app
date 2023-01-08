import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  designated: JSON.parse(localStorage.getItem("DESIGNATED")) || [],
};

function designatedSaveToStorage(values) {
  localStorage.setItem("DESIGNATED", JSON.stringify(values));
}

const designatedSlice = createSlice({
  name: "designated",
  initialState,
  reducers: {
    addDesignated: (state, { payload }) => {
      state.designated.push(payload);
      designatedSaveToStorage(state.designated);
    },
  },
});

export const { addDesignated } = designatedSlice.actions;

export default designatedSlice.reducer;
