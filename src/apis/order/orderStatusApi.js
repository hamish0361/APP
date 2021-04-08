import axiosClient from 'apis/axiosClient';

const orderStatusApi = {
  fetchOrderStatus: params => {
    const url = '/api/orders/statuses';
    return axiosClient.get(url, {
      params: params,
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },

  createOrderStatus: params => {
    const url = `/api/orders/statuses`;
    return axiosClient.post(url, null, {
      params: params,
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },

  updateOrderStatus: (type, params) => {
    const url = `/api/orders/statuses/${type}`;
    return axiosClient.put(url, null, {
      params: params,
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },

  deleteOrderStatus: id => {
    const url = `/api/orders/statuses/${id}`;
    return axiosClient.delete(url, {
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },
};

export default orderStatusApi;
