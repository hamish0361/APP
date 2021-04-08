import axiosClient from '../axiosClient';

const shipmentMethodApi = {
    fetchShipmentMethods: (params) => {
        const url = '/api/shipment-methods';
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    fetchShipmentMethod: (shipmentMethodId, params) => {
        const url = `/api/shipment-methods/${shipmentMethodId}`;
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },

    create: (data) => {
        const url = `/api/shipment-methods`;
        return axiosClient.post(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    update: (shipmentMethodId, data) => {
        const url = `/api/shipment-methods/${shipmentMethodId}`;
        return axiosClient.put(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    delete: (shipmentMethodId) => {
        const url = `/api/shipment-methods/${shipmentMethodId}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    }
};

export default shipmentMethodApi;
