import axiosClient from '../axiosClient';

const boxItemApi = {
    fetchBoxItems: (params) => {
        const url = '/api/box-items';
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    fetchBoxItem: (boxItemId) => {
        const url = `/api/box-items/${boxItemId}`;
        return axiosClient.get(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    create: (data) => {
        const url = `/api/box-items`;
        return axiosClient.post(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    update: (boxItemId, data) => {
        const url = `/api/box-items/${boxItemId}`;
        return axiosClient.put(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    delete: (boxItemId) => {
        const url = `/api/box-items/${boxItemId}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    }
};

export default boxItemApi;
