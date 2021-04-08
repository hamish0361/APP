import axiosClient from '../axiosClient';

const inContainerPickerApi = {
    fetchInContainerPicker: params => {
        const url = '/api/in-container-pickers';
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    create: data => {
        const url = `/api/in-container-pickers`;
        return axiosClient.post(
            url,
            {},
            {
                params: {
                    ...data,
                    quantity: data.quantity || 1
                },
                baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
            }
        );
    },
    update: (id, data) => {
        const url = `/api/in-container-pickers/${id}`;
        return axiosClient.put(url, {}, {
            params: {
                ...data
            },
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    delete: pickerId => {
        const url = `/api/in-container-pickers/${pickerId}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    }
};

export default inContainerPickerApi;
