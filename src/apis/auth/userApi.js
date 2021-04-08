import axiosClient from 'apis/axiosClient';

const userApi = {
    fetchUsers: params => {
        const url = `/api/users`;
        return axiosClient.get(url, {
            baseURL: process.env.REACT_APP_API_URL_AUTH,
            params: {
                with: 'status;role;role.permissions;directPermissions',
                ...params
            }
        });
    },
    fetchUserById: (id, params) => {
        const url = `/api/users/${id}`;
        return axiosClient.get(url, {
            baseURL: process.env.REACT_APP_API_URL_AUTH,
            params
        });
    },
    deleteUser: id => {
        const url = `/api/users/${id}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_AUTH
        });
    },
    updateUser: (id, params) => {
        const url = `/api/users/${id}`;
        return axiosClient.put(url, null, {
            params
        });
    }
};

export default userApi;
