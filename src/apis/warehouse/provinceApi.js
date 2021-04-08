var axios = require('axios');

const provinceApi = {
    fetchProvince: (params) => {
        var config = {
            method: 'get',
            url: 'https://vapi.vnappmob.com/api/province',
            headers: {}
        };

        return axios(config).then((res) => res.data);
    },
    fecthDistrict: (province_id, params) => {
        var config = {
            method: 'get',
            url: `https://vapi.vnappmob.com/api/province/district/${province_id}`,
            headers: {}
        };

        return axios(config).then((res) => res.data);
    },
    fetchWard: (district_id, params) => {
        var config = {
            method: 'get',
            url: `https://vapi.vnappmob.com/api/province/ward/${district_id}`,
            headers: {}
        };

        return axios(config).then((res) => res.data);
    }
};

export default provinceApi;
