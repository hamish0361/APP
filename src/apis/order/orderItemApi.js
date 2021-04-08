import axiosClient from 'apis/axiosClient';

const orderItemApi = {
    fetchOrderItem: params => {
        const url = '/api/orders/items';
        return axiosClient.get(url, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    fetchOrderItemById: (id, params) => {
        const url = `/api/orders/items/${id}`;
        return axiosClient.get(url, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    createOrderItem: params => {
        const url = `/api/orders/items`;
        return axiosClient.post(url, null, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    update: (id, body) => {
        const url = `/api/orders/items/${id}`;
        return axiosClient.put(url, body, {
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    deleteOrderItem: id => {
        const url = `/api/orders/items/${id}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    }
};

export default orderItemApi;
