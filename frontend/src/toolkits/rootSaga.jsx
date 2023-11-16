import { all } from "redux-saga/effects";
import departmentSaga from "./department/saga";
import malwareSaga from "./malware/saga";
import categorySaga from "./category/saga";
import variantSaga from "./variant/saga";
import fmcSaga from "./fmc/saga";
export default function* rootSaga() {
  yield all([
    departmentSaga(),
    malwareSaga(),
    categorySaga(),
    variantSaga(),
    fmcSaga(),
  ]);
}
