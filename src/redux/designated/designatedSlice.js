import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const BASE_URL = "http://localhost/php_training/React/Desiganated_app/backend-designated-app";
const BASE_URL = "http://localhost/PHP_TRAINING/designated-app";
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
export const AddDesignated = createAsyncThunk(
  "designated/AddDesignated",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/AddDesignated.php`,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue([], error);
    }
  }
);
export const GetDesignated = createAsyncThunk(
  "designated/GetDesignated",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/GetDesignated.php`);
      return response.data;
    } catch (error) {
      return rejectWithValue([], error);
    }
  }
);
export const UpdateDesignated = createAsyncThunk(
  "designated/UpdateDesignated",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/AddDesignated.php/${payload.id}`,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue([], error);
    }
  }
);
export const DeleteDesignatedFactor = createAsyncThunk(
  "designated/DeleteDesignatedFactor",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/DeleteDesignated.php/${payload.id}?id=${payload.uid}`,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue([], error);
    }
  }
);
export const GetONeDesignated = createAsyncThunk(
  "designated/GetOneDesignated",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/GetDesignated.php/${payload.id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue([], error);
    }
  }
);
const initialState = {
  designated: [],
  designated_loading: false,
  designated_error: null,
  users: JSON.parse(localStorage.getItem(SAVE_USERS)) || [],
  users_loading: false,
  users_error: null,
  salesInvoice: [],
};

const designatedSlice = createSlice({
  name: "designated",
  initialState,
  extraReducers: {
    [registerUser.fulfilled]: (state, actions) => {
      return {
        ...state,
        users_loading: false,
        users_error: null,
        users: actions.payload.userList,
      };
    },
    [registerUser.rejected]: (state, actions) => {
      return {
        ...state,
        users_loading: false,
        users: [],
        users_error: actions.meta.response,
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
    [AddDesignated.fulfilled]: (state, actions) => {
      return {
        ...state,
        designated_loading: false,
        designated_error: null,
        designated : actions.payload
      };
    },
    [AddDesignated.rejected]: (state, actions) => {
      return {
        ...state,
        designated_loading: false,
        designated_error: actions.meta.response,
        designated: [],
      };
    },
    [AddDesignated.pending]: (state, actions) => {
      return {
        ...state,
        designated_loading: true,
        designated_error: null,
        designated: [],
      };
    },
    [GetDesignated.fulfilled]: (state, actions) => {
      return {
        ...state,
        designated_loading: false,
        designated_error: actions.meta.response,
        designated: actions.payload,
      };
    },
    [GetDesignated.rejected]: (state, actions) => {
      return {
        ...state,
        designated_loading: false,
        designated_error: actions.meta.response,
        designated: [],
      };
    },
    [GetDesignated.pending]: (state, actions) => {
      return {
        ...state,
        designated_loading: true,
        designated_error: null,
        designated: [],
      };
    },
    [GetONeDesignated.fulfilled]: (state, actions) => {
      return {
        ...state,
        salesInVoice: actions.payload,
      };
    },
    [DeleteDesignatedFactor.fulfilled]: (state, actions) => {
      console.log(actions.payload);
      return {
        ...state,
        salesInVoice: actions.payload,
      };
    },
    [UpdateDesignated.fulfilled] : (state , actions) => {
      return {
        ...state , 
        salesInVoice : actions.payload
      }
    }
  },
});

export default designatedSlice.reducer;
