import axiosClient from "apis/axiosClient";

const cartApi = {
  fetchCart: (params) => {
    const url = "/api/carts";
    return axiosClient.get(url, {
      params: params,
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },

  fetchCartById: (id, params) => {
    const url = `/api/carts/${id}`;
    return axiosClient.get(url, {
      params: params,
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },

  createCart: (params) => {
    const url = `/api/carts`;
    return axiosClient.post(url, null, {
      params: params,
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },

  updateCart: (id, params) => {
    const url = `/api/carts/${id}`;
    return axiosClient.put(url, null, {
      params: params,
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },

  deleteCart: (id) => {
    const url = `/api/carts/${id}`;
    return axiosClient.delete(url, {
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },
};

export default cartApi;
