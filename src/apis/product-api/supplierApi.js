import axiosClient from 'apis/axiosClient';

const supplierApi = {

    // api show
    fetchSupplier: (params) => {
        const url = '/api/suppliers';
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_PRODUCT,
        });
    },

    /**
     * api index
     * @param {id} params
     */
    fetchSupplierById: id => {
        const url = `api/suppliers/${id}`;
        return axiosClient.get(url, {
            baseURL: process.env.REACT_APP_API_URL_PRODUCT,
        });
    },

    /**
     * create supplier
     *  @param {name, link, email, address, id, note} params
     */
    createSupplier: params => {
        const url = 'api/suppliers';
        return axiosClient.post(url, null, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_PRODUCT,
        });
    },

    /**
     * update supplier
     *  @param {name, link, email, address, id, note} params
     */
    updateSupplier: (id, params) => {
        const url = `api/suppliers/${id}`;
        return axiosClient.put(url, null, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_PRODUCT,
        });
    },

    /**
    * delete supplier
    * @param { id} params
    */
    deleteSupplier: id => {
        const url = `api/suppliers/${id}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_PRODUCT,
        });
    },

};
export default supplierApi;
