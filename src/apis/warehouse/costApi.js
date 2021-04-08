import axiosClient from '../axiosClient';

const costApi = {
    fetchCosts: (params) => {
        const url = '/api/box-costs';
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    fetchCost: (costId) => {
        const url = `/api/box-costs/${costId}`;
        return axiosClient.get(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    create: (data) => {
        const url = `/api/box-costs`;
        return axiosClient.post(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    update: (costId, data) => {
        const url = `/api/box-costs/${costId}`;
        return axiosClient.put(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    delete: (costId) => {
        const url = `/api/box-costs/${costId}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    }
};

export default costApi;
