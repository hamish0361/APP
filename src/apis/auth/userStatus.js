import axiosClient from "apis/axiosClient";

const userStatusApi = {
  fetchUserStatus: () => {
    const url = `/api/user-statuses`;
    return axiosClient.get(url, {
      baseURL: process.env.REACT_APP_API_URL_AUTH,
    });
  },
  fetchUserStatusById: (id) => {
    const url = `/api/user-statuses/${id}`;
    return axiosClient.get(url, {
      baseURL: process.env.REACT_APP_API_URL_AUTH,
    });
  },
  createUserStatus: (params) => {
    const url = `/api/user-statuses`;
    return axiosClient.post(url, {
      baseURL: process.env.REACT_APP_API_URL_AUTH,
      ...params
    });
  },
  deleteUserStatus: (id) => {
    const url = `/api/user-statuses/${id}`;
    return axiosClient.delete(url, {
      baseURL: process.env.REACT_APP_API_URL_AUTH
    });
  },
  updateUserStatus: (id, name) => {
    const url = `/api/user-statuses/${id}`;
    return axiosClient.put(url, {
      baseURL: process.env.REACT_APP_API_URL_AUTH,
      name
    });
  }
};

export default userStatusApi;
