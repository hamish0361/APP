import axiosClient from 'apis/axiosClient';

const orderTypeApi = {
  fetchOrderType: params => {
    const url = '/api/orders/types';
    return axiosClient.get(url, {
      params: params,
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },

  createOrderType: params => {
    const url = `/api/orders/types`;
    return axiosClient.post(url, null, {
      params: params,
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },

  updateOrderType: (type, params) => {
    const url = `/api/orders/types/${type}`;
    return axiosClient.put(url, null, {
      params: params,
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },

  deleteOrderType: id => {
    const url = `/api/orders/types/${id}`;
    return axiosClient.delete(url, {
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },
};

export default orderTypeApi;
