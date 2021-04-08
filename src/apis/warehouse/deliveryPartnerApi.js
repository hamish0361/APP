import axiosClient from '../axiosClient';

const deliveryPartnerApi = {
    fetchDeliveryPartners: (params) => {
        const url = '/api/delivery-partners';
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    fetchDeliveryPartner: (id, params) => {
        const url = `/api/delivery-partners/${id}`;
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    create: (data) => {
        const url = `/api/delivery-partners`;
        return axiosClient.post(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    update: (id, data) => {
        const url = `/api/delivery-partners/${id}`;
        return axiosClient.put(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    delete: (id) => {
        const url = `/api/delivery-partners/${id}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    }
};

export default deliveryPartnerApi;
