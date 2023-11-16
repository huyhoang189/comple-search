import { call, put, all, takeEvery, take, select } from "redux-saga/effects";
import departmentSlice from "./slice";
import {
  getDepartments,
  creatDepartments,
  updateDepartments,
  deleteDepartments,
  getDepartmentRaw,
} from "../../services/department.service";
import {
  HANDLE_TYPE,
  MESSAGE_DEPARTMENT_DESCRIPTION,
  MESSAGE_DESCRIPTION,
} from "../../commons/constant";
import { notification } from "antd";
function* _getDepartments({ payload }) {
  try {
    const response = yield call(getDepartments, payload);
    if (response.metadata.data.length >= 0) {
      yield put(
        departmentSlice.actions.getDepartmentsSuccess(response.metadata.data)
      );
    }
  } catch (error) {
    notification.error({ message: MESSAGE_DEPARTMENT_DESCRIPTION.GET_ERROR });
    yield put(departmentSlice.actions.getDepartmentsError());
  }
}

function* _getRaw({ payload }) {
  try {
    const response = yield call(getDepartmentRaw);
    // console.log(response);
    if (response.metadata.data.length >= 0) {
      yield put(departmentSlice.actions.getRawSuccess(response.metadata.data));
    }
  } catch (error) {
    notification.error({ message: MESSAGE_DEPARTMENT_DESCRIPTION.GET_ERROR });
    yield put(departmentSlice.actions.getRawError());
  }
}
function* _processingDepartment({ payload }) {
  try {
    let { actionName } = payload;
    if (actionName === HANDLE_TYPE.ADD_ITEM) {
      const response = yield call(creatDepartments, payload);
      if (response) {
        notification.success({
          message: MESSAGE_DEPARTMENT_DESCRIPTION.ADD_SUCCESS,
        });
      }
    } else if (actionName === HANDLE_TYPE.UPDATE_ITEM) {
      const response = yield call(updateDepartments, payload);
      if (response) {
        notification.success({
          message: MESSAGE_DEPARTMENT_DESCRIPTION.UPDATE_SUCCESS,
        });
      }
    } else if (actionName === HANDLE_TYPE.DELETE_ITEM) {
      const response = yield call(deleteDepartments, payload);
      if (response) {
        notification.success({
          message: MESSAGE_DEPARTMENT_DESCRIPTION.DELETE_SUCCESS,
        });
      }
    }
    yield put(departmentSlice.actions.getDepartments());
  } catch (error) {
    notification.error({ message: MESSAGE_DESCRIPTION.PROCESSING_ERROR });
    yield put(departmentSlice.actions.processingDepartmentError());
  }
}
export default function* saga() {
  yield all([
    yield takeEvery(
      departmentSlice.actions.getDepartments().type,
      _getDepartments
    ),
    yield takeEvery(
      departmentSlice.actions.processingDepartment().type,
      _processingDepartment
    ),

    yield takeEvery(departmentSlice.actions.getRaw().type, _getRaw),
  ]);
}
