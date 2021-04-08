import axiosClient from 'apis/axiosClient';

const taxApi = {
    // api show
    fetchTax: params => {
        const url = '/api/taxes';
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_PRODUCT
        });
    },

    /**
     * create tax
     * @param {id, name } params
     */
    createTax: params => {
        const url = 'api/taxes';
        return axiosClient.post(url, null, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_PRODUCT
        });
    },

    /**
     * api index
     * @param {id} params
     */
    fetchTaxById: id => {
        const url = `api/taxes/${id}`;
        return axiosClient.get(url, {
            baseURL: process.env.REACT_APP_API_URL_PRODUCT
        });
    },

    /**
     * update tax
     * @param {name, id} params
     */
    updateTax: (id, params) => {
        const url = `api/taxes/${id}`;
        return axiosClient.put(url, null, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_PRODUCT
        });
    },

    //api delete Tax
    deleteTax: id => {
        const url = `api/taxes/${id}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_PRODUCT
        });
    }
};

export default taxApi;
