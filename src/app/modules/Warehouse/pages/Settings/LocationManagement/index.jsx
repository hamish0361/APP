import React, { useState } from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router';

import useTrans from 'helper/useTrans';
import useLocationList from './useLocationList';

import { Card, CardBody, CardHeader, CardHeaderToolbar } from '_metronic/_partials/controls';
import TableLocationList from 'app/modules/Warehouse/components/Table/TableLocationList';
import SelectArea from 'app/modules/Warehouse/components/SelectArea';
import Loading from 'app/components/Loading';
import ModalCreateLocation from './ModalCreateLocation';
import SelectShelve from 'app/components/Select/SelectShelve';

import './index.scss';
import NeedPermission from 'app/components/NeedPermission';

const LocationManagament = props => {

    const [selectedArea, setSelectedArea] = useState();
    const [selectedShelve, setSelectedShelve] = useState();
    const [trans] = useTrans();
    const match = useRouteMatch();
    const history = useHistory();

    const { dataTable, loading, f5Data } = useLocationList(selectedArea, selectedShelve);

    const handleChangeArea = (area_id) => {
        setSelectedArea(area_id);
    }

    const handleChangeShelve = (shelve_id) => {
        setSelectedShelve(shelve_id);
    }

    const openModalCreateLocation = () => {
        history.push(`${match.url}/create-location`);
    }

    return (
        <>
            <NeedPermission need={['locations.create']}>
                <Route path={`${match.path}/create-location`}>
                    {({ match }) => (
                        <ModalCreateLocation
                            show={match !== null}
                            onSuccess={f5Data}
                        />
                    )}
                </Route>
            </NeedPermission>

            <Card className="location-management">
                <CardHeader title={trans("warehouse.location.title")}>
                    <NeedPermission need={['locations.create']}>
                        <CardHeaderToolbar>
                            <button className="btn btn-primary" onClick={openModalCreateLocation}>{trans("warehouse.location.create.title")}</button>
                        </CardHeaderToolbar>
                    </NeedPermission>
                </CardHeader>
                <CardBody>
                    <div className="d-flex filter-section">
                        <SelectArea value={selectedArea} onChange={handleChangeArea} dispatchFirstOption />
                        <SelectShelve value={selectedShelve} onChange={handleChangeShelve} />
                    </div>

                    <div className="position-relative">
                        <TableLocationList dataTable={dataTable} onRefresh={f5Data} />
                        {loading && <Loading local />}
                    </div>
                </CardBody>
            </Card>
        </>
    );
};

export default LocationManagament;