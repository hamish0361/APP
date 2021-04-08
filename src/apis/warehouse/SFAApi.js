import axiosClient from '../axiosClient';

const sfaApi = {
    fetchSFAs: (params) => {
        const url = '/api/sfas';
        return axiosClient.get(url, { params, baseURL: process.env.REACT_APP_API_URL_WAREHOUSE });
    },
    fetchSFA: (SFAId, params) => {
        const url = `/api/sfas/${SFAId}`;
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    create: (data) => {
        const url = `/api/sfas`;
        return axiosClient.post(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    update: (SFAId, data) => {
        const url = `/api/sfas/${SFAId}`;
        return axiosClient.put(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    delete: (SFAId) => {
        const url = `/api/sfas/${SFAId}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    }
};

export default sfaApi;
