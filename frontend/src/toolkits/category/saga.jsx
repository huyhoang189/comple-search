import { call, put, all, takeEvery, take, select } from "redux-saga/effects";
import categorySlice from "./slice";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/category.service";
import {
  MESSAGE_DEPARTMENT_DESCRIPTION,
  MESSAGE_DESCRIPTION,
} from "../../commons/constant";
import { notification } from "antd";
function* _getCategories({ payload }) {
  try {
    const response = yield call(getCategories, payload);
    // console.log(response);
    if (response.metadata.data.length >= 0) {
      // const list = response.list;
      // console.log(response);
      yield put(
        categorySlice.actions.getCategoriesSuccess(response.metadata.data)
      );
    }
  } catch (error) {
    notification.error({ message: MESSAGE_DEPARTMENT_DESCRIPTION.GET_ERROR });
    yield put(categorySlice.actions.getCategoriesError());
  }
}

function* _processingCategory({ payload }) {
  try {
    let { actionName, item } = payload;
    console.log(actionName, item);
    if (actionName === "ADD_ITEM") {
      const response = yield call(createCategory, payload);
      if (response) {
        notification.success({
          message: MESSAGE_DEPARTMENT_DESCRIPTION.ADD_SUCCESS,
        });
      }
    } else if (actionName === "UPDATE_ITEM") {
      const response = yield call(updateCategory, payload);
      if (response) {
        notification.success({
          message: MESSAGE_DEPARTMENT_DESCRIPTION.UPDATE_SUCCESS,
        });
      }
    } else if (actionName === "DELETE_ITEM") {
      const response = yield call(deleteCategory, payload);
      if (response) {
        notification.success({
          message: MESSAGE_DEPARTMENT_DESCRIPTION.DELETE_SUCCESS,
        });
      }
    }
    yield put(categorySlice.actions.getCategories());
  } catch (error) {
    notification.error({ message: MESSAGE_DESCRIPTION.PROCESSING_ERROR });
    yield put(categorySlice.actions.processingCategoriesError());
  }
}
export default function* saga() {
  yield all([
    yield takeEvery(categorySlice.actions.getCategories().type, _getCategories),
    yield takeEvery(
      categorySlice.actions.processingCategory().type,
      _processingCategory
    ),
  ]);
}
