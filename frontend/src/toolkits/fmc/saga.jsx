import { call, put, all, takeEvery, take, select } from "redux-saga/effects";
import fmcSlice from "./slice";
import { getAll, create, update, deleteItem } from "../../services/fmc.service";
import {
  HANDLE_TYPE,
  MESSAGE_DEPARTMENT_DESCRIPTION,
  MESSAGE_DESCRIPTION,
} from "../../commons/constant";
import { notification } from "antd";
function* _getFmcs({ payload }) {
  try {
    const response = yield call(getAll, payload);
    if (response.metadata.data.length >= 0) {
      yield put(fmcSlice.actions.getFmcsSuccess(response.metadata));
    }
  } catch (error) {
    console.log(error);
    notification.error({ message: MESSAGE_DEPARTMENT_DESCRIPTION.GET_ERROR });
    yield put(fmcSlice.actions.getFmcsError());
  }
}

function* _processingFmc({ payload }) {
  try {
    let { actionName } = payload;
    if (actionName === HANDLE_TYPE.ADD_ITEM) {
      const response = yield call(create, payload);
      if (response) {
        notification.success({
          message: MESSAGE_DEPARTMENT_DESCRIPTION.ADD_SUCCESS,
        });
      }
    } else if (actionName === HANDLE_TYPE.UPDATE_ITEM) {
      const response = yield call(update, payload);
      if (response) {
        notification.success({
          message: MESSAGE_DEPARTMENT_DESCRIPTION.UPDATE_SUCCESS,
        });
      }
    } else if (actionName === HANDLE_TYPE.DELETE_ITEM) {
      const response = yield call(deleteItem, payload);
      if (response) {
        notification.success({
          message: MESSAGE_DEPARTMENT_DESCRIPTION.DELETE_SUCCESS,
        });
      }
    }
    yield put(fmcSlice.actions.getFmcs(payload));
  } catch (error) {
    notification.error({ message: MESSAGE_DESCRIPTION.PROCESSING_ERROR });
    yield put(fmcSlice.actions.processingFmcError());
  }
}
export default function* saga() {
  yield all([
    yield takeEvery(fmcSlice.actions.getFmcs().type, _getFmcs),
    yield takeEvery(fmcSlice.actions.processingFmc().type, _processingFmc),
  ]);
}
