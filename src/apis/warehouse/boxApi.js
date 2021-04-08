import axiosClient from '../axiosClient';

const boxApi = {
    fetchBoxs: params => {
        const url = '/api/boxes';
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    fetchBox: (boxId, params) => {
        const url = `/api/boxes/${boxId}`;
        return axiosClient.get(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE,
            params
        });
    },
    create: data => {
        const url = `/api/boxes`;
        return axiosClient.post(
            url,
            {},
            {
                params: {
                    ...data
                },
                baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
            }
        );
    },
    update: (boxId, body) => {
        const url = `/api/boxes/${boxId}`;
        return axiosClient.put(url, body, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    delete: boxId => {
        const url = `/api/boxes/${boxId}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    decouple: (boxId, quantity) => {
        const url = `/api/boxes/${boxId}`;
        return axiosClient.put(url, { action: 'decouple', params: `[${quantity}]` }, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
};

export default boxApi;
