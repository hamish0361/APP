import axiosClient from '../axiosClient';

const ladingBillApi = {
    fetchLadingBills: (params) => {
        const url = '/api/lading-bills';
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    fetchLadingBill: (ladingBillId, params) => {
        const url = `/api/lading-bills/${ladingBillId}`;
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    create: (data) => {
        const url = `/api/lading-bills`;
        return axiosClient.post(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    update: (ladingBillId, data) => {
        const url = `/api/lading-bills/${ladingBillId}`;
        return axiosClient.put(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    delete: (ladingBillId) => {
        const url = `/api/lading-bills/${ladingBillId}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    }
};

export default ladingBillApi;
