import axiosClient from 'apis/axiosClient';

const orderApi = {
    /**
     * api order
     * @param {withCount, with, appends} params
     */
    fetchOrder: params => {
        const url = '/api/orders';
        return axiosClient.get(url, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    /**
     * api order by id
     * @param {id} params
     */
    fetchOrderById: (id, params) => {
        const url = `/api/orders/${id}`;
        return axiosClient.get(url, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    /**
     * METHOD: PUT
     * api update order
     * @param {
     *   shipment_method_id,
     *   shipment_infor_id,
     *   action,
     *   params,
     *   note,
     *   customer_id,
     *   key
     * } params
     */
    updateOrder: (id, body) => {
        const url = `/api/orders/${id}`;
        return axiosClient.put(url, body, {
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    /**
     * METHOD: PUT
     * api update order status
     * @param {
     *   status
     * } params
     */
    updateOrderStatus: (id, params) => {
        const url = `/api/orders/${id}`;
        return axiosClient.put(url, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    /**
     * METHOD: DEL
     * api delete order
     * @param {
     *   id
     * } params
     */
    deleteOrder: id => {
        const url = `/api/orders/${id}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },

    /**
     * METHOD: POST
     * api create order (auction, wholesale, paymeny partner, retail, purchase, payment)
     *
     * create order auction, wholesale, payment partner
     * @param {
     *   shipment_method_id,
     *   shipment_infor_id,
     *   type,
     *   item
     * } params
     *
     * create order retail
     * @param {
     *   shipment_method_id,
     *   shipment_infor_id,
     *   type,
     *   note
     * } params
     *
     * create order purchase
     * @param {
     *   type,
     *   supplier_id
     * } params
     *
     * create order payment
     * @param {
     *   shipment_method_id,
     *   shipment_infor_id,
     *   type,
     *   trackings,
     *   customer_id,
     *   note,
     *   key
     * } params
     */
    createOrder: params => {
        const url = `/api/orders`;
        return axiosClient.post(url, null, {
            params: params,
            baseURL: process.env.REACT_APP_API_URL_ORDER
        });
    },
    createOrderPayment: body => {
        const url = `/api/orders`;
        return axiosClient.post(url, body.data, {
            params: body.params,
            baseURL: process.env.REACT_APP_API_URL_ORDER,
            headers: {
                'Contain-Type ': 'multipart/form-data'
            }
        });
    }
};

export default orderApi;
