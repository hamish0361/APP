import axiosClient from 'apis/axiosClient';

const purchaseItemApi = {
    fetchPurchaseItem: params => {
        const url = '/api/purchases/items';
        return axiosClient.get(url, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    fetchPurchaseItemById: (id, params) => {
        const url = `/api/purchases/items/${id}`;
        return axiosClient.get(url, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    createPurchaseItem: body => {
        const url = `/api/purchases/items`;
        return axiosClient.post(url, body, {
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    updatePurchaseItem: (id, body) => {
        const url = `/api/purchases/items/${id}`;
        return axiosClient.put(url, body, {
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    deletePurchaseItem: id => {
        const url = `/api/purchases/items/${id}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    deletePurchaseDivisionItem: id => {
        const url = `/api/purchases/items-orders/${id}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    updatePurchaseDivisionItem: (id, body) => {
        const url = `/api/purchases/items-orders/${id}`;
        return axiosClient.put(url, body, {
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    createPurchaseItemOrder: body => {
        const url = `/api/purchases/items-orders`;
        return axiosClient.post(url, body, {
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    }
};

export default purchaseItemApi;
