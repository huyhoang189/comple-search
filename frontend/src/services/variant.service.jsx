import createAPIServices from "./commonService/baseApiServices";

const api = createAPIServices();

export const getVariants = (payload) => {
  return api.makeRequest({
    url: `/variants/getByVariantId?id=${payload.id}`,
    method: "GET",
  });
};

export const creatVariants = (payload) => {
  return api.makeRequest({
    url: `/variants`,
    method: "POST",
    data: payload.item,
  });
};

export const updateVariants = (payload) => {
  return api.makeRequest({
    url: `/variants/${payload.item._id}`,
    method: "PUT",
    data: payload.item,
  });
};
export const deleteVariants = (payload) => {
  return api.makeRequest({
    url: `/variants/${payload.item._id}`,
    method: "DELETE",
  });
};
