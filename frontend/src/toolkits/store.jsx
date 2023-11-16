import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

import departmentSlice from "./department/slice";
import malwareSlice from "./malware/slice";
import categorySlice from "./category/slice";
import variantSlice from "./variant/slice";
import fmcSlice from "./fmc/slice";

import appSlice from "./app/slice";

const sagaMiddleware = createSagaMiddleware();
// const middleware = [
//   ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
//   sagaMiddleware,
// ];
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(sagaMiddleware);

export const store = configureStore({
  reducer: {
    departments: departmentSlice.reducer,
    malwares: malwareSlice.reducer,
    categories: categorySlice.reducer,
    variants: variantSlice.reducer,
    app: appSlice.reducer,
    fmcs: fmcSlice.reducer,
  },
  middleware,
});
sagaMiddleware.run(rootSaga);
