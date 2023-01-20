import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost/PHP_TRAINING/Designated-app";
const SAVE_USERS = "DESIGNATED_USERS";

export const registerUser = createAsyncThunk(
  "designated/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/rejister.php`,
        payload.values
      );

      return response.data;
    } catch (error) {
      return rejectWithValue([], error);
    }
  }
);

export const LoginUser = createAsyncThunk(
  "designated/LoginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/login.php`,
        payload.values
      );
      return response.data;
    } catch (error) {
      return rejectWithValue([], { error });
    }
  }
);

const initialState = {
  designated: JSON.parse(localStorage.getItem("DESIGNATED")) || [],
  users: JSON.parse(localStorage.getItem(SAVE_USERS)) || [],
  users_loading: false,
  users_error: null,
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
      salesInVoice.remaining = payload.remaining;
      designatedSaveToStorage(state.designated);
    },
    addNewDesignatedSalesInVoice: (state, { payload }) => {
      const findUser = state.designated.find(
        (item) => item.id === parseInt(payload.id)
      );
      findUser.salesInvoices.push(payload.salesInvoices);
      designatedSaveToStorage(state.designated);
    },
    deleteDesignatedSalesInVoices: (state, { payload }) => {
      const findUser = state.designated.find(
        (item) => item.id === parseInt(payload.id)
      );
      const userSalesInVoices = findUser.salesInvoices.filter(
        (item) => item.id !== payload.salesInVoicesId
      );
      findUser.salesInvoices = userSalesInVoices;
      designatedSaveToStorage(state.designated);
    },
  },
  extraReducers: {
    [registerUser.fulfilled]: (state, actions) => {
      return {
        ...state,
        users_loading: false,
        users_error: null,
        users: actions.payload.userList,
      };
    },
    [LoginUser.pending]: (state, actions) => {
      return { ...state, users_loading: true, users_error: null, users: [] };
    },
    [LoginUser.rejected]: (state, actions) => {
      return {
        ...state,
        users_loading: false,
        users_error: actions.meta.error,
        users: [],
      };
    },
    [LoginUser.fulfilled]: (state, actions) => {
      return {
        ...state,
        users_loading: false,
        users_error: null,
        users: actions.payload.userList,
      };
    },
  },
});

export const {
  addDesignated,
  addDesignatedPayment,
  addNewDesignatedSalesInVoice,
  deleteDesignatedSalesInVoices,
} = designatedSlice.actions;

export default designatedSlice.reducer;
