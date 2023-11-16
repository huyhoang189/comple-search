import { notification } from "antd";
import axios from "axios";

const jwtInterceoptor = axios.create({
  baseURL: import.meta.env.VITE_BASE_BE_URL,
  //timeout: 30000,
});

jwtInterceoptor.interceptors.request.use((config) => {
  // //console.log(process.env)
  // let tokensData = localStorage.getItem("tokens");
  // config.headers.Authorization = `Bearer ${tokensData}`;
  return config;
});

jwtInterceoptor.interceptors.response.use(
  (response) => {
    // //console.log(response);
    return response;
  },
  async (error) => {
    // console.log(error);
    // if (error.response.status === 401) {
    //   notification.warning({
    //     message: "Cảnh báo",
    //     description: "Tài khoản đã hết hạn. Hãy đăng nhập lại",
    //     duration: 3000,
    //   });
    //   setTimeout(function () {
    //     //your code to be executed after 1 second
    //     clearToken();
    //     window.location.href = "./login";
    //   }, 1000);
    //   return;
    // } else {
    //   return Promise.reject(error);
    // }
  }
);

const _makeRequest = (createRequest) => async (args) => {
  const _headers = args.headers ? args.headers : {};
  const body = args.body ? args.body : {};
  const defaultHeaders = {};
  args = {
    ...args,
    headers: {
      ...defaultHeaders,
      ..._headers,
      "Access-Control-Allow-Origin": "*",
    },
    body,
  };
  try {
    const { data } = await createRequest(args);
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default (options = {}) => {
  // if (options.BaseURL) BaseURL = options.BaseURL;

  // const instance = Axios.create({
  //   baseURL: BaseURL,
  //   //timeout: 30000,
  // });

  return {
    makeRequest: _makeRequest(jwtInterceoptor),
  };
};
