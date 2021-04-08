import axiosClient from '../axiosClient';

const originApi = {
    // api show
    fetchOrigin: params => {
        const url = '/api/origins';
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_PRODUCT
        });
    },

    /**
     *
     * @param {id, name } params
     *   //create Origin
     */
    createOrigin: params => {
        const url = `api/origins`;
        return axiosClient.post(url, null, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_PRODUCT
        });
    },

    /**
     * api index
     * @param {id} params
     */
    fetchOriginById: id => {
        const url = `api/origins/${id}`;
        return axiosClient.get(url, {
            baseURL: process.env.REACT_APP_API_URL_PRODUCT
        });
    },

    deleteOrigin: id => {
        const url = `api/origins/${id}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_PRODUCT
        });
    },

    /**
     * update origin
     * @param {name, id} params
     */
    updateOrigin: body => {
        const url = `api/origins/${body.id}`;
        return axiosClient.put(url, null, {
            params: body.params,
            baseURL: process.env.REACT_APP_API_URL_PRODUCT
        });
    }
};

export default originApi;
