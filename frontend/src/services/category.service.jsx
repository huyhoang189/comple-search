import createAPIServices from "./commonService/baseApiServices";

const api = createAPIServices();

export const getCategories = (payload) => {
  return api.makeRequest({
    url: `/categories`,
    method: "GET",
  });
};

export const createCategory = (payload) => {
  return api.makeRequest({
    url: `/categories`,
    method: "POST",
    data: payload.item,
  });
};

export const updateCategory = (payload) => {
  return api.makeRequest({
    url: `/categories/${payload.item._id}`,
    method: "PUT",
    data: payload.item,
  });
};
export const deleteCategory = (payload) => {
  return api.makeRequest({
    url: `/categories/${payload.item._id}`,
    method: "DELETE",
  });
};
