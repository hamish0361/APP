import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';

import { fetchInvoices } from 'app/modules/Warehouse/warehouse-redux/invoiceSlice';

import Layout from 'app/modules/Warehouse/components/Layout';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '_metronic/_partials/controls';
import TableInvoiceList from 'app/modules/Warehouse/components/Table/TableInvoiceList';
import CreateInvoice from './CreateInvoice';
import Loading from 'app/components/Loading';
import InvoiceFilter from 'app/modules/Warehouse/components/Filter/InvoiceFilter';
import useTrans from 'helper/useTrans';

import './index.scss';
import NeedPermission from 'app/components/NeedPermission';

const InvoiceList = props => {

    const { pagination, loading } = useSelector(state => state.warehouse.invoice.list);
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const history = useHistory();
    const filterRef = useRef();
    const [trans] = useTrans();

    useEffect(() => {
        f5Data();
    }, [pagination.page]); // eslint-disable-line

    const f5Data = (params) => {
        dispatch(fetchInvoices({ page: pagination.page, with: 'shipmentMethod;fromArea;toArea', ...params }));
    }

    const handleCreateInvoiceSuccess = (res) => {
        f5Data();
        filterRef.current && filterRef.current.reset();
        history.push(`/warehouse/container/detail/${res.id}`);
    }

    const handleSearchSubmit = search => {
        f5Data(search);
    };

    return (
        <>
            <NeedPermission need="containers.create">
                <Route path={`${match.path}/create-invoice`}>
                    {({ match }) => (
                        <CreateInvoice
                            show={match !== null}
                            onSuccess={handleCreateInvoiceSuccess}
                        />
                    )}
                </Route>
            </NeedPermission>

            <Layout title={trans("warehouse.invoice.title")}>
                <Card className="position-relative invoice-list-card">
                    <CardHeader title={trans("warehouse.invoice.list.title")}>
                        <NeedPermission need="containers.create">
                            <CardHeaderToolbar>
                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        history.push(`${match.url}/create-invoice`)
                                    }
                                >
                                    {trans("warehouse.invoice.create.title")}
                                </button>
                            </CardHeaderToolbar>
                        </NeedPermission>
                    </CardHeader>
                    <CardBody>
                        {loading && <Loading local />}
                        <NeedPermission need="containers.index">
                            <InvoiceFilter ref={filterRef} onSearch={handleSearchSubmit} />
                            <TableInvoiceList onRefresh={f5Data} />
                        </NeedPermission>
                    </CardBody>
                </Card>
            </Layout>
        </>
    );
};

InvoiceList.propTypes = {

};

export default InvoiceList;