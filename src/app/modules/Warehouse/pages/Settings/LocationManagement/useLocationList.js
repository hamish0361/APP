
import warehouseApi from 'apis/warehouse';
import { dialog } from 'app/components/DialogNotify';
import useTrans from 'helper/useTrans';
import { useEffect, useState } from 'react';
import _ from 'lodash';

export default function useLocationList(areaId, shelveId) {

    const [loading, setLoading] = useState(false);
    const [dataTable, setDataTable] = useState([]);
    const [trans] = useTrans();

    useEffect(() => {
        if (areaId) getLocationsByAreaId();
    }, [areaId]); // eslint-disable-line

    useEffect(() => {
        if (shelveId) getLocationsByShelveId();
    }, [shelveId]); // eslint-disable-line

    const getLocationsByAreaId = () => {
        setLoading(true);
        setDataTable([]);
        warehouseApi.area.fetchArea(areaId, { with: 'shelves.locations.pallets' })
            .then((res) => {
                if (res?.shelves?.length) {
                    let locations = res.shelves.reduce((prevV, curV) => {

                        const locations = curV.locations.map(l => ({...l, shelve: _.omit(curV, ['locations'])}))

                        return [...prevV, ...locations];
                    }, []);

                    setDataTable(locations);
                }
            })
            .catch((err) => {
                console.error(err);

                dialog.error(trans("warehouse.location.get.failure"));
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const getLocationsByShelveId = () => {
        setLoading(true);
        setDataTable([]);
        warehouseApi.shelve.fetchShelve(shelveId, { with: 'locations.pallets' })
            .then((res) => {
                if (res?.locations?.length) {
                    const locations = res.locations.map(l => ({...l, shelve: _.omit(res, ['locations'])}))

                    setDataTable(locations);
                }
            })
            .catch((err) => {
                console.error(err);

                dialog.error(trans("warehouse.location.get.failure"));
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return { dataTable, loading, f5Data: getLocationsByAreaId };
}