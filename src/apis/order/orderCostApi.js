import axiosClient from 'apis/axiosClient';

const orderCostApi = {
    fetchOrderCost: params => {
        const url = '/api/orders/costs';
        return axiosClient.get(url, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    fetchOrderCostById: (id, params) => {
        const url = `/api/orders/costs/${id}`;
        return axiosClient.get(url, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    updateOrderCost: (id, body) => {
        const url = `/api/orders/costs/${id}`;
        return axiosClient.put(url, body, {
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    }
};

export default orderCostApi;
