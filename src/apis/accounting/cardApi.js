import axiosClient from 'apis/axiosClient';

const cardApi = {
    fetchAll: params => {
        const url = '/api/cards';
        return axiosClient.get(url, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_ACCOUNTING
        });
    },

    fetchById: (id, params) => {
        const url = `/api/cards/${id}`;
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_ACCOUNTING
        });
    },

    create: body => {
        const url = '/api/cards';
        return axiosClient.post(url, body, {
            baseURL: process.env.REACT_APP_API_URL_ACCOUNTING
        });
    }
};

export default cardApi;
