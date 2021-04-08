import axiosClient from "apis/axiosClient";

const permissionApi = {
  fetchPermissions: (params) => {
    const url = `/api/permissions`;
    return axiosClient.get(url, {
      baseURL: process.env.REACT_APP_API_URL_AUTH,
      params
    });
  },

  fetchPermissionsById: (id) => {
    const url = `/api/permissions/${id}?with=parent`;
    return axiosClient.get(url, {
      baseURL: process.env.REACT_APP_API_URL_AUTH
    });
  },

  createPermissions: (params) => {
    const url = `/api/permissions`;
    return axiosClient.post(url, {
      baseURL: process.env.REACT_APP_API_URL_AUTH,
      ...params
    });
  },

  attachPermissions: (body) => {
    const url = `/api/permissions/${body.id}`;
    return axiosClient.put(url, {
      baseURL: process.env.REACT_APP_API_URL_AUTH,
      action: 'attach',
      params: JSON.stringify(body.params)
    });
  },

  updatePermissions: (params, id) => {
    const url = `/api/permissions/${id}`;
    return axiosClient.put(url, {
      baseURL: process.env.REACT_APP_API_URL_AUTH,
      ...params
    });
  },

  deletePermissions: (id) => {
    const url = `/api/permissions/${id}`;
    return axiosClient.delete(url, {
      baseURL: process.env.REACT_APP_API_URL_AUTH
    });
  },

  giveOrRevokePermission: (params, role) => {
    const url = `/api/roles/${role}`;
    return axiosClient.put(url, {
      ...params,
      baseURL: process.env.REACT_APP_API_URL_AUTH,
    });
  }
};

export default permissionApi;
