import axiosClient from '../axiosClient';

const boxItemApi = {
    fetchBoxOwners: (params) => {
        const url = '/api/owning-boxes';
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    fetchBoxOwner: (boxOwnerId) => {
        const url = `/api/owning-boxes/${boxOwnerId}`;
        return axiosClient.get(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    create: (data) => {
        const url = `/api/owning-boxes`;
        return axiosClient.post(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    update: (boxOwnerId, data) => {
        const url = `/api/owning-boxes/${boxOwnerId}`;
        return axiosClient.put(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    delete: (boxOwnerId) => {
        const url = `/api/owning-boxes/${boxOwnerId}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    }
};

export default boxItemApi;
