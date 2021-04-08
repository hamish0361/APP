import axiosClient from 'apis/axiosClient';

const trackingApi = {
    fetchTracking: params => {
        const url = '/api/trackings';
        return axiosClient.get(url, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    fetchTrackingById: (id, params) => {
        const url = `/api/trackings/${id}`;
        return axiosClient.get(url, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    createTracking: body => {
        const url = `/api/trackings`;
        return axiosClient.post(url, body, {
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    createTrackingForOrder: (id, body) => {
        const url = `/api/trackings/${id}`;
        return axiosClient.put(url, body, {
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    updateTracking: (id, params) => {
        const url = `/api/trackings/${id}`;
        return axiosClient.put(url, null, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    deleteTracking: id => {
        const url = `/api/trackings/${id}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    }
};

export default trackingApi;
