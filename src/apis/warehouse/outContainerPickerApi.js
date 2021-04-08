import axiosClient from '../axiosClient';

const outContainerPickerApi = {
    fetchInContainerPicker: params => {
        const url = '/api/out-container-pickers';
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    create: data => {
        const url = `/api/out-container-pickers`;
        return axiosClient.post(
            url,
            {},
            {
                params: {
                    ...data
                },
                baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
            }
        );
    },
    update: (id, data) => {
        const url = `/api/out-container-pickers/${id}`;
        return axiosClient.put(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    delete: pickerId => {
        const url = `/api/out-container-pickers/${pickerId}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    }
};

export default outContainerPickerApi;
