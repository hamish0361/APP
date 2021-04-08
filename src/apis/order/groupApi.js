import axiosClient from 'apis/axiosClient';

const groupApi = {
  fetchGroup: params => {
    const url = '/api/groups';
    return axiosClient.get(url, {
      params: params,
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },

  createGroup: params => {
    const url = `/api/groups`;
    return axiosClient.post(url, null, {
      params: params,
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },

  updateGroup: (id, params) => {
    const url = `/api/groups/${id}`;
    return axiosClient.put(url, null, {
      params: params,
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },

  deleteGroup: id => {
    const url = `/api/groups/${id}`;
    return axiosClient.delete(url, {
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },

  // group roles
  fetchGroupRole: params => {
    const url = '/api/groups/roles';
    return axiosClient.get(url, {
      params: params,
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },

  deleteGroupRole: id => {
    const url = `/api/groups/roles/${id}`;
    return axiosClient.delete(url, {
      baseURL: process.env.REACT_APP_API_URL_ORDER,
    });
  },
};

export default groupApi;
