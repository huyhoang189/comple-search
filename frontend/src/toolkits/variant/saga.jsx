import { call, put, all, takeEvery, take, select } from "redux-saga/effects";
import variantSlice from "./slice";
import {
  getVariants,
  creatVariants,
  updateVariants,
  deleteVariants,
} from "../../services/variant.service";
import {
  MESSAGE_DEPARTMENT_DESCRIPTION,
  MESSAGE_DESCRIPTION,
} from "../../commons/constant";
import { notification } from "antd";
function* _getVariants({ payload }) {
  try {
    const response = yield call(getVariants, payload);
    // console.log(response);
    if (response.metadata.data.length >= 0) {
      // const list = response.list;
      // console.log(response);
      yield put(
        variantSlice.actions.getVariantsSuccess(response.metadata.data)
      );
    }
  } catch (error) {
    notification.error({ message: MESSAGE_DEPARTMENT_DESCRIPTION.GET_ERROR });
    yield put(variantSlice.actions.getVariantsError());
  }
}

function* _processingVariant({ payload }) {
  try {
    let { actionName, item } = payload;
    console.log(actionName, item);
    if (actionName === "ADD_ITEM") {
      const response = yield call(creatVariants, payload);
      if (response) {
        notification.success({
          message: MESSAGE_DEPARTMENT_DESCRIPTION.ADD_SUCCESS,
        });
      }
    } else if (actionName === "UPDATE_ITEM") {
      const response = yield call(updateVariants, payload);
      if (response) {
        notification.success({
          message: MESSAGE_DEPARTMENT_DESCRIPTION.UPDATE_SUCCESS,
        });
      }
    } else if (actionName === "DELETE_ITEM") {
      const response = yield call(deleteVariants, payload);
      if (response) {
        notification.success({
          message: MESSAGE_DEPARTMENT_DESCRIPTION.DELETE_SUCCESS,
        });
      }
    }
    yield put(variantSlice.actions.getVariants());
  } catch (error) {
    notification.error({ message: MESSAGE_DESCRIPTION.PROCESSING_ERROR });
    yield put(variantSlice.actions.processingVariantError());
  }
}
export default function* saga() {
  yield all([
    yield takeEvery(variantSlice.actions.getVariants().type, _getVariants),
    yield takeEvery(
      variantSlice.actions.processingVariant().type,
      _processingVariant
    ),
  ]);
}
