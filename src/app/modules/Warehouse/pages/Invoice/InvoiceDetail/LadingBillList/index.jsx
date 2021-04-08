import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import { fetchInvoice } from 'app/modules/Warehouse/warehouse-redux/invoiceSlice';
import useTrans from 'helper/useTrans';

import { Card, CardHeader, CardBody, CardHeaderToolbar } from '_metronic/_partials/controls';
import Loading from 'app/components/Loading';
import TableLadingBill from './TableLadingBill';
import AddLadingBill from './AddLadingBill';
import NeedPermission from 'app/components/NeedPermission';

const LadingBillList = props => {

    const { loading } = useSelector(state => state.warehouse.invoice.detail);
    const dispatch = useDispatch();
    const params = useParams();
    const match = useRouteMatch();
    const history = useHistory();
    const [trans] = useTrans();

    const f5Data = () => {
        if (params?.id) dispatch(fetchInvoice({ id: params?.id }));
    }

    const openModalAddLadingBill = () => {
        history.push(`${match.url}/add-lading-bill`)
    }

    return (
        <>
            <NeedPermission need={['containers.update', 'lading-bills.update']} permissionJoin="and">
                <Route path={`${match.path}/add-lading-bill`}>
                    {({ match }) => (
                        <AddLadingBill
                            show={match !== null}
                            onSuccess={f5Data}
                        />
                    )}
                </Route>
            </NeedPermission>

            <Card className="lading-bill-list">
                <CardHeader title={trans("warehouse.lading_bill.title")}>
                    <NeedPermission need={['containers.update', 'lading-bills.update']} permissionJoin="and">
                        <CardHeaderToolbar>
                            <button className="btn btn-primary" onClick={openModalAddLadingBill}>
                                {trans("warehouse.lading_bill.create.title")}
                            </button>
                        </CardHeaderToolbar>
                    </NeedPermission>
                </CardHeader>
                <CardBody>
                    {loading && <Loading local />}
                    <TableLadingBill onRefresh={f5Data} />
                </CardBody>
            </Card>
        </>
    );
};

LadingBillList.propTypes = {

};

export default LadingBillList;