import axiosClient from 'apis/axiosClient';

const packageApi = {

  // api show
  fetchPackage: (params) => {
    const url = '/api/packages';
    return axiosClient.get(url, {
      params,
      baseURL: process.env.REACT_APP_API_URL_PRODUCT,
    });
  },

  /**
  * api index
  * @param {id} params
  */
  fetchPackageById: body => {
    const url = `api/packages/${body.id}`;
    return axiosClient.get(url, {
      params: body.params,
      baseURL: process.env.REACT_APP_API_URL_PRODUCT,
    });
  },

  /**
  *create package
  * @param {name, price, origin_id, unit_id, id, ingredients} params
  */
  createPackage: params => {
    const url = 'api/packages';
    return axiosClient.post(url, null, {
      params: params,
      baseURL: process.env.REACT_APP_API_URL_PRODUCT,
    });
  },

  /**
  * update package
  * @param {name, price, origin_id, unit_id, id, ingredients} params
  */
  updatePackage: (id, params) => {
    const url = `api/packages/${id}`;
    return axiosClient.put(url, null, {
      params: params,
      baseURL: process.env.REACT_APP_API_URL_PRODUCT,
    });
  },

  /**
  * delete package
  * @param { id} params
  */
  deletePackage: id => {
    const url = `api/packages/${id}`;
    return axiosClient.delete(url, {
      baseURL: process.env.REACT_APP_API_URL_PRODUCT,
    });
  },
};

export default packageApi;