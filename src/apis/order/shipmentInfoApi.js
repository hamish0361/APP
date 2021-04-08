import axiosClient from 'apis/axiosClient';

const shipmentInfoApi = {
  fetchShipmentInfo: params => {
    const url = '/api/shipment-infors';
    return axiosClient.get(url, {
      params: params,
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },

  fetchShipmentInfoById: (id, params) => {
    const url = `/api/shipment-infors/${id}`;
    return axiosClient.get(url, {
      params: params,
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },

  createShipmentInfo: params => {
    const url = `/api/shipment-infors`;
    return axiosClient.post(url, null, {
      params: params,
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },

  updateShipmentInfo: (id, params) => {
    const url = `/api/shipment-infors/${id}`;
    return axiosClient.put(url, null, {
      params: params,
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },

  deleteShipmentInfo: id => {
    const url = `/api/shipment-infors/${id}`;
    return axiosClient.delete(url, {
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },
};

export default shipmentInfoApi;
