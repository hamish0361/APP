import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useFetchData from './useFetchData';

import { Card, CardBody } from '_metronic/_partials/controls';
import CustomTable from 'app/components/CustomTable';
import useColumns from './useColumns';

const ProductInventory = props => {

    const dataTable = useSelector(state => state.product.list.productList);
    const pagination = useSelector(state => state.product.list.pagination);
    const { f5Data } = useFetchData();
    const columns = useColumns();

    useEffect(() => {
        f5Data();
    }, []); // eslint-disable-line

    return (
        <Card className="product-inventory">
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

ProductInventory.propTypes = {

};

export default ProductInventory;