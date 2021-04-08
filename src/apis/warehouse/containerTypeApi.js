import axiosClient from '../axiosClient';

const containerTypeApi = {
    fetchContainerTypes: (params) => {
        const url = '/api/container-types';
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    create: (data) => {
        const url = `/api/container-types`;
        return axiosClient.post(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    update: (containerTypeId, data) => {
        const url = `/api/container-types/${containerTypeId}`;
        return axiosClient.put(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    delete: (containerTypeId) => {
        const url = `/api/container-types/${containerTypeId}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    }
};

export default containerTypeApi;
