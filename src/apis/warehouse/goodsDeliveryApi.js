import axiosClient from '../axiosClient';

const goodsDeliveryApi = {
    fetchGoodsDeliveries: (params) => {
        const url = '/api/goods-deliveries';
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    fetchGoodsDelivery: (id, params) => {
        const url = `/api/goods-deliveries/${id}`;
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    create: (data) => {
        const url = `/api/goods-deliveries`;
        return axiosClient.post(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    update: (id, data) => {
        const url = `/api/goods-deliveries/${id}`;
        return axiosClient.put(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    delete: (id) => {
        const url = `/api/goods-deliveries/${id}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    }
};

export default goodsDeliveryApi;
