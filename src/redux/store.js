import { configureStore,  } from "@reduxjs/toolkit";
import designatedSlice from "./designated/designatedSlice";

export const store = configureStore({
  reducer: { designated: designatedSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
