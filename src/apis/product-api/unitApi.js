import axiosClient from 'apis/axiosClient';

const unitApi = {

    // api show
    fetchUnit: (params) => {
        const url = '/api/units';
        return axiosClient.get(url, {
          params,
          baseURL: process.env.REACT_APP_API_URL_PRODUCT,
        });
    },

    /**
     * create unit
     * @param {id, name } params
     */
    createUnit: params => {
        const url = 'api/units';
        return axiosClient.post(url, null, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_PRODUCT,
        });
    },

    /**
     * api index
     * @param {id} params
     */
    fetchUnitById: id => {
        const url = `api/units/${id}`;
        return axiosClient.get(url, {
            baseURL: process.env.REACT_APP_API_URL_PRODUCT,
        });
    },

    /**
     * update unit
     * @param {name, id} params
     */
    updateUnit: (id, params) => {
        const url = `api/units/${id}`;
        return axiosClient.put(url, null, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_PRODUCT,
        });
    },

    //api delete Unit
    deleteUnit: id => {
        const url = `api/units/${id}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_PRODUCT,
        })
    }
};

export default unitApi;