import axiosClient from '../axiosClient';

const areaApi = {
    fetchAreas: (params) => {
        const url = '/api/areas';
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    fetchArea: (areaId, params) => {
        const url = `/api/areas/${areaId}`;
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    create: (data) => {
        const url = `/api/areas`;
        return axiosClient.post(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    update: (areaId, data) => {
        const url = `/api/areas/${areaId}`;
        return axiosClient.put(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    delete: (areaId) => {
        const url = `/api/areas/${areaId}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    }
};

export default areaApi;
