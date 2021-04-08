import axios from 'axios';
import queryString from 'query-string';
import { getStorage, removeStorage } from '_metronic/_helpers';
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL_AUTH,
    headers: {
        'content-type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(
    async config => {
        const token = getStorage('token');

        if (token) {
            const langObj = JSON.parse(localStorage.getItem('i18nConfig'));
            const lang = langObj ? langObj.selectedLang : 'vi';

            config.headers = {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Accept-Language': lang
            };
        }

        return config;
    },
    error => {
        Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    response => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    error => {
        // Handle errors
        const status = error?.status || error?.response?.status;
        if (status === 401) {
            removeStorage('token');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
