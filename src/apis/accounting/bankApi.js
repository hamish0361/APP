import axiosClient from 'apis/axiosClient';

const bankApi = {
    fetchAll: params => {
        const url = '/api/banks';
        return axiosClient.get(url, {
            params: params,
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

export default bankApi;
