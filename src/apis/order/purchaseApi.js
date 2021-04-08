import axiosClient from 'apis/axiosClient';

const purchaseApi = {
    fetchPurchase: params => {
        const url = '/api/purchases';
        return axiosClient.get(url, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    fetchPurchaseById: (id, params) => {
        const url = `/api/purchases/${id}`;
        return axiosClient.get(url, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    createPurchase: body => {
        const url = `/api/purchases`;
        return axiosClient.post(url, body, {
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    updatePurchase: (id, params) => {
        const url = `/api/purchases/${id}`;
        return axiosClient.put(url, params, {
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },
    uploadPurchaseFile: (id, body) => {
        const url = `/api/purchases/${id}`;
        return axiosClient.put(url, body, {
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    deletePurchase: id => {
        const url = `/api/purchases/${id}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    }
};

export default purchaseApi;
