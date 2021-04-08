import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useColumns from '../hooks/useColumns';
import { dashboardAction, fetchDashboardBoxes } from 'app/modules/Warehouse/warehouse-redux/dashboardSlice';

import { Card, CardBody } from '_metronic/_partials/controls';
import WaypointTable from 'app/components/WaypointTable';

import './index.scss';

const TableSKU = props => {

    const boxes = useSelector(state => state.warehouse.dashboard.boxes);
    const loading = useSelector(state => state.warehouse.dashboard.loading);
    const pagination = useSelector(state => state.warehouse.dashboard.pagination);
    const [columns] = useColumns();
    const dispatch = useDispatch();

    const handlePageChange = (page) => {
        dispatch(dashboardAction.changePage(page));
        dispatch(fetchDashboardBoxes());
    }

    return (
        <Card className="table-dashboard-sku-section position-relative">
            <CardBody>
                <WaypointTable
                    rows={boxes}
                    columns={columns}
                    rowKey="id"
                    page={pagination.page}
                    lastpage={pagination.lastPage}
                    onPageChange={handlePageChange}
                    loading={loading}
                    noSTT
                />
            </CardBody>
        </Card>
    );
};

TableSKU.propTypes = {

};

export default TableSKU;