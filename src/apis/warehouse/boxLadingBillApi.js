import axiosClient from '../axiosClient';

const boxLadingBillApi = {
    fetchBoxLadingBills: (params) => {
        const url = '/api/box-lading-bills';
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    fetchBoxLadingBill: (boxLadingBillId, params) => {
        const url = `/api/box-lading-bills/${boxLadingBillId}`;
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    create: (data) => {
        const url = `/api/box-lading-bills`;
        return axiosClient.post(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    update: (boxLadingBillId, data) => {
        const url = `/api/box-lading-bills/${boxLadingBillId}`;
        return axiosClient.put(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    delete: (boxLadingBillId) => {
        const url = `/api/box-lading-bills/${boxLadingBillId}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    }
};

export default boxLadingBillApi;
