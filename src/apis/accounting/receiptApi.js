import axiosClient from 'apis/axiosClient';

const receiptApi = {
    fetchAll: params => {
        const url = '/api/receipts';
        return axiosClient.get(url, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_ACCOUNTING
        });
    }
};

export default receiptApi;
