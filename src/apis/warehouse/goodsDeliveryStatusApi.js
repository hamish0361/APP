import axiosClient from '../axiosClient';

const goodsDeliveryStatusApi = {
    fetchGoodsDeliveryStatuses: (params) => {
        const url = '/api/goods-delivery-statuses';
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    fetchGoodsDeliveryStatus: (id, params) => {
        const url = `/api/goods-delivery-statuses/${id}`;
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    create: (data) => {
        const url = `/api/goods-delivery-statuses`;
        return axiosClient.post(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    update: (id, data) => {
        const url = `/api/goods-delivery-statuses/${id}`;
        return axiosClient.put(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    delete: (id) => {
        const url = `/api/goods-delivery-statuses/${id}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    }
};

export default goodsDeliveryStatusApi;
