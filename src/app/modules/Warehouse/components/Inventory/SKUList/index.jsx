import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useFetchData from './useFetchData';
import useColumns from './useColumns';

import { Card, CardBody } from '_metronic/_partials/controls';
import CustomTable from 'app/components/CustomTable';

import './index.scss';

const SKUInventory = props => {

    const dataTable = useSelector(state => state.warehouse.box.list.data);
    const pagination = useSelector(state => state.warehouse.box.list.pagination);

    const { f5Data } = useFetchData();
    const columns = useColumns();

    useEffect(() => {
        f5Data();
    }, []); // eslint-disable-line

    return (
        <Card className="sku-inventory-list">
            <CardBody>
                <CustomTable
                    columns={columns}
                    rows={dataTable}
                    page={pagination.page}
                    lastpage={pagination.lastPage}
                    rowKey={'id'}
                    noSTT
                    isAction={false}
                />
            </CardBody>
        </Card>
    );
};

SKUInventory.propTypes = {

};

export default SKUInventory;