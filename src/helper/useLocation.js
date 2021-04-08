import warehouseApi from 'apis/warehouse';
import { useEffect, useState } from 'react';

export function useProvince() {
    const [loading, setLoading] = useState(false);
    const [province, setProvince] = useState([]);

    useEffect(() => {
        setLoading(true);

        warehouseApi.province.fetchProvince()
            .then((res) => {
                setProvince(res.results);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []); // eslint-disable-line

    return [province, loading];
}

export function useDistrict(province_id) {
    const [loading, setLoading] = useState(false);
    const [district, setDistrict] = useState([]);

    useEffect(() => {
        if (province_id) {
            setLoading(true);

            warehouseApi.province.fecthDistrict(province_id)
                .then((res) => {
                    setDistrict(res.results);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [province_id]); // eslint-disable-line

    return [district, loading];
}

export function useWard(district_id) {
    const [loading, setLoading] = useState(false);
    const [ward, setWard] = useState([]);

    useEffect(() => {
        if (district_id) {
            setLoading(true);

            warehouseApi.province.fetchWard(district_id)
                .then((res) => {
                    setWard(res.results);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [district_id]); // eslint-disable-line

    return [ward, loading];
}