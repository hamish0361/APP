import axiosClient from 'apis/axiosClient';

const productApi = {
    // api show
    fetchProduct: params => {
        const url = '/api/products';
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_PRODUCT
        });
    },

    /**
     * api index
     * @param {id} params
     */

    fetchProductById: body => {
        const url = `/api/products/${body.id}`;
        return axiosClient.get(url, {
            params: body.params,
            baseURL: process.env.REACT_APP_API_URL_PRODUCT
        });
    },
    // fetchProductById: id => {
    //     const url = `/api/products/${id}?with=suppliers`;
    //     return axiosClient.get(url, {
    //         params: "",
    //         baseURL: process.env.REACT_APP_API_URL_PRODUCT,
    //     });
    // },

    /**
     *
     * @param {id} params ?with=suppliers
     */
    fetchProductWithSupplier: id => {
        const url = `/api/products/${id}?with=suppliers`;
        return axiosClient.get(url, {
            baseURL: process.env.REACT_APP_API_URL_PRODUCT
        });
    },

    /**
     *
     * @param {name, price, origin_id, unit_id, id, ingredients} params
     * create with file image
     */
    createProductImageFile: (params, data) => {
        const url = '/api/products';
        return axiosClient.post(url, data, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_PRODUCT,
            headers: {
                'Contain-Type ': 'multipart/form-data'
            }
        });
    },

    /**
     *
     * @param {name, price, origin_id, unit_id, id, ingredients} params
     * create with image url
     */
    createProduct: params => {
        const url = '/api/products';
        return axiosClient.post(url, null, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_PRODUCT
        });
    },

    /**
     * update product
     * @param {name, price, origin_id, unit_id, id, ingredients} params
     */
    updateProduct: (id, params) => {
        const url = `/api/products/${id}`;
        return axiosClient.put(url, null, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_PRODUCT
        });
    },

    /**
     * delete product
     * @param { id} params
     */
    deleteProduct: id => {
        const url = `/api/products/${id}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_PRODUCT
        });
    },
    /**
     * delete supplier from product
     * 'products/' + id + "?" + `params=["suppliers",${object}]&action=detach`
     */
    deleteSupplierProduct: (id, params) => {
        const url = `/api/products/${id}`;
        return axiosClient.put(url, null, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_PRODUCT
        });
    },

    /**
     * add new supplier for product
     * 'products/' + id + "?" + `action=attach&params=["suppliers",${object}]`
     */

    updateSupplierProduct: (id, params) => {
        const url = `/api/products/${id}`;
        return axiosClient.put(url, null, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_PRODUCT
        });
    },

    /**
     * update price of supplier from product
     * @params {idProduct, idSupplier, price}
     * 'products/' + idProduct + `?params=["suppliers", ${id},{"price":${price }}]&action=updatePivot`
     * 'products/' + idProduct + `?params=["suppliers", ${id},{"price":${price }}]&action=updatePivot`
     */
    updatePriceSupplier: params => {
        const url = `/api/products/${params.idProduct}?params=["suppliers", ${params.id},{"price":${params.price}}]&action=updatePivot `;
        return axiosClient.put(url, null, {
            baseURL: process.env.REACT_APP_API_URL_PRODUCT
        });
    },

    /**
     * upload image product
     * @params {idProduct, formData}
     */

    uploadImageProduct: (idProduct, data) => {
        const url = `/api/products/${idProduct}`;
        return axiosClient.post(url, data, {
            params: { _method: 'PUT' },
            baseURL: process.env.REACT_APP_API_URL_PRODUCT,
            headers: {
                'Contain-Type ': 'multipart/form-data'
            }
        });
    },

    /**
     * }/api/boxes?search=order_id:null
     */
    fetchIventory: params => {
        const url = `/api/boxes`;
        return axiosClient.get(url, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    }
};

export default productApi;
