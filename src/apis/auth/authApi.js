import axiosClient from '../axiosClient';

const authApi = {
    fetchToken: body => {
        const url = '/oauth/token';
        return axiosClient.post(url, body);
    },
    fetchMe: params => {
        const url = 'api/me';
        return axiosClient.get(url, {
            params: params
        });
    },
    fetchUser: params => {
        const url = 'api/users';
        return axiosClient.get(url, {
            params: params
        });
    },
    manageUsers: () => {
        const url = '/api/me/users';
        return axiosClient.get(url, {
            baseURL: process.env.REACT_APP_API_URL_AUTH
        });
    },
    /**
   * METHOD: POST
   * @param {
    *   email,
    *   id,
    *   password,
    *   password_confirmation,
    *   callback_domain,
    * }
    */
    register: params => {
        const url = '/api/register';
        return axiosClient.post(url, {
            baseURL: process.env.REACT_APP_API_URL_AUTH,
            ...params
        });
    },
    /**
   * METHOD: POST
   * @param {
    *   email
    * }
    */
    resendVerify: params => {
        const url = '/api/email/resend';
        return axiosClient.post(url, {
            baseURL: process.env.REACT_APP_API_URL_AUTH,
            ...params
        });
    },
    /**
   * METHOD: GET
   * @param {
    * expires
    * signature
    * }
    */
    verifyEmail: body => {
        const url = `/api/email/verify/${body.id}`;
        return axiosClient.get(url, {
            baseURL: process.env.REACT_APP_API_URL_AUTH,
            params: body.params
        });
    },

    // API PASSWORD
    /**
   * METHOD: POST
   * @param {
    *   email
    * }
    */
    sendLinkResetPassword: params => {
        const url = `/api/password/email`;
        return axiosClient.post(url, {
            baseURL: process.env.REACT_APP_API_URL_AUTH,
            ...params
        });
    },
    /**
   * METHOD: POST
   * @param {
    * email
    * password
    * password_confirmation
    * token
    * }
    */
    resetPassword: params => {
        const url = '/api/password/email';
        return axiosClient.post(url, {
            baseURL: process.env.REACT_APP_API_URL_AUTH,
            ...params
        });
    },
    changePassword: params => {
        const url = `/api/me/password`;
        return axiosClient.put(url, {
            baseURL: process.env.REACT_APP_API_URL_AUTH,
            ...params
        });
    }
};

export default authApi;
