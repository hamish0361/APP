import axiosClient from 'apis/axiosClient';

const userCurrencyApi = {
    fetchAll: params => {
        const url = '/api/accounts';
        return axiosClient.get(url, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_ACCOUNTING
        });
    }
};

export default userCurrencyApi;
