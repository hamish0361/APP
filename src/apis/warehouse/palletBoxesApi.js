import axiosClient from '../axiosClient';

const palletBoxesApi = {
    fetchListPalletBoxes: params => {
        const url = '/api/pallet-boxes';
        return axiosClient.get(url, {
            params,
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    fetchPalletBoxes: (id, params) => {
        const url = `/api/pallet-boxes/${id}`;
        return axiosClient.get(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE,
            params
        });
    },
    create: data => {
        const url = `/api/pallet-boxes`;
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
    update: (id, body) => {
        const url = `/api/pallet-boxes/${id}`;
        return axiosClient.put(url, body, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    },
    delete: id => {
        const url = `/api/pallet-boxes/${id}`;
        return axiosClient.delete(url, {
            baseURL: process.env.REACT_APP_API_URL_WAREHOUSE
        });
    }
};

export default palletBoxesApi;
