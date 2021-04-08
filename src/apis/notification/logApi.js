import axiosClient from 'apis/axiosClient';

const logApi = {
    fetchAll: params => {
        const url = '/api/logs';
        return axiosClient.get(url, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_NOTIFICATION
        });
    },
    create: body => {
        const url = '/api/logs';
        return axiosClient.post(url, body, {
            baseURL: process.env.REACT_APP_API_URL_NOTIFICATION
        });
    }
};

export default logApi;
