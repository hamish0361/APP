import axiosClient from "apis/axiosClient";

const roleApi = {
  /**
   * api role
   */
  fetchRoles: (params) => {
    const url = `/api/roles`;
    return axiosClient.get(url, {
      baseURL: process.env.REACT_APP_API_URL_AUTH,
      params
    });
  },

  fetchRolesById: (role, params) => {
    const url = `/api/roles/${role}`;
    return axiosClient.get(url, {
      baseURL: process.env.REACT_APP_API_URL_AUTH,
      params
    });
  },

  attachRoles: (body) => {
    const url = `/api/roles/${body.id}`;
    return axiosClient.put(url, {
      baseURL: process.env.REACT_APP_API_URL_AUTH,
      action: 'attach',
      params: JSON.stringify(body.params)
    });
  },

  createRoles: (params) => {
    const url = `/api/roles`;
    return axiosClient.post(url, {
      baseURL: process.env.REACT_APP_API_URL_AUTH,
      ...params
    });
  },
  /**
   * api update role
   */
  updateRoles: (role, params) => {
    const url = `/api/roles/${role}`;
    return axiosClient.put(url, {
      ...params,
      baseURL: process.env.REACT_APP_API_URL_AUTH,
    });
  },
  /**
   * api role by
   * params : with
   * action: childs;permissions;users
   */
  fetchDataByRole: (role, params) => {
    const url = `/api/roles/${role}`;
    return axiosClient.get(url, {
      baseURL: process.env.REACT_APP_API_URL_AUTH,
      params: params
    });
  },
  fetchPermissions: () => {
    const url = `/api/permissions?with=fullChilds`;
    return axiosClient.get(url, {
      baseURL: process.env.REACT_APP_API_URL_AUTH
    });
  },

  /**
   * api role
   * params : action, params
   * action: attach || detach
   */
  giveOrRevokePermission: (params, role) => {
    const url = `/api/roles/${role}`;
    return axiosClient.put(url, {
      ...params,
      baseURL: process.env.REACT_APP_API_URL_AUTH,
    });
  }
};

export default roleApi;
