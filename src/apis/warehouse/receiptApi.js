import axiosClient from '../axiosClient';

const receiptApi = {
    fetchReceipts: (params) => {
        const url = '/api/receipts';
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    fetchReceipt: (receiptId, params) => {
        const url = `/api/receipts/${receiptId}`;
        return axiosClient.get(url, { params, baseURL: process.env.REACT_APP_API_URL_WAREHOUSE });
    },
    create: (sfa_id, data) => {
        const url = `/api/receipts`;
        return axiosClient.post(url, data, {
            params: { sfa_id },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    updateAttachment: (receiptId, data) => {
        const url = `/api/receipts/${receiptId}`;
        return axiosClient.post(url, data, {
            params: {
                _method: 'PUT'
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete: (receiptId) => {
        const url = `/api/receipts/${receiptId}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    
};

export default receiptApi;
