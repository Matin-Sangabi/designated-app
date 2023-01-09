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
    addDesignatedPayment: (state, { payload }) => {
      const findUser = state.designated.find(
        (item) => item.id === parseInt(payload.id)
      );
      const salesInVoice = findUser.salesInvoices.find(
        (item) => item.id === payload.factorId
      );
      salesInVoice.payment.push(payload.payment);
      designatedSaveToStorage(state.designated);
    },
  },
});

export const { addDesignated, addDesignatedPayment } = designatedSlice.actions;

export default designatedSlice.reducer;
