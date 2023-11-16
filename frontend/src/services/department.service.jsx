import createAPIServices from "./commonService/baseApiServices";

const api = createAPIServices();

export const getDepartments = (payload) => {
  return api.makeRequest({
    url: `/departments?page=1&limit=1000&keyword=${payload?.keyword || ""}`,
    method: "GET",
  });
};

export const getDepartmentRaw = (payload) => {
  return api.makeRequest({
    url: `/departments/getAllRaw`,
    method: "GET",
  });
};

export const creatDepartments = (payload) => {
  return api.makeRequest({
    url: `/departments`,
    method: "POST",
    data: payload.item,
  });
};

export const updateDepartments = (payload) => {
  return api.makeRequest({
    url: `/departments/${payload.item._id}`,
    method: "PUT",
    data: payload.item,
  });
};
export const deleteDepartments = (payload) => {
  return api.makeRequest({
    url: `/departments/${payload.item._id}`,
    method: "DELETE",
  });
};
