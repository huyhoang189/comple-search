import createAPIServices from "./commonService/baseApiServices";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequest({
    url: `/fmcs?page=${payload?.page || 1}&limit=${payload?.limit || 10}`,
    method: "GET",
  });
};

export const create = (payload) => {
  return api.makeRequest({
    url: `/fmcs`,
    method: "POST",
    data: payload.item,
  });
};

export const update = (payload) => {
  return api.makeRequest({
    url: `/fmcs/${payload.item._id}`,
    method: "PUT",
    data: payload.item,
  });
};
export const deleteItem = (payload) => {
  return api.makeRequest({
    url: `/fmcs/${payload.item._id}`,
    method: "DELETE",
  });
};
