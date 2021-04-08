import axiosClient from '../axiosClient';

const placeOfDeliveryApi = {
    fetchPlaceOfDeliveries: (params) => {
        const url = '/api/place-of-deliveries';
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    fetchPlaceOfDelivery: (id, params) => {
        const url = `/api/place-of-deliveries/${id}`;
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    create: (data) => {
        const url = `/api/place-of-deliveries`;
        return axiosClient.post(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    update: (id, data) => {
        const url = `/api/place-of-deliveries/${id}`;
        return axiosClient.put(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    delete: (id) => {
        const url = `/api/place-of-deliveries/${id}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    }
};

export default placeOfDeliveryApi;
