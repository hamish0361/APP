import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import warehouseApi from 'apis/warehouse';
import handleApiError from 'helper/handleApiError';
import _ from 'lodash';
import { fetchInvoice } from 'app/modules/Warehouse/warehouse-redux/invoiceSlice';

import { Card, CardBody, CardHeader, CardHeaderToolbar } from '_metronic/_partials/controls';
import Loading from 'app/components/Loading';
import GrBtnEdit from 'app/modules/Warehouse/components/GrBtnEdit';
import FormEditInvoiceCost from 'app/modules/Warehouse/components/Form/FormEditInvoiceCost';
import useTrans from 'helper/useTrans';
import NeedPermission from 'app/components/NeedPermission';

const InvoiceCostInfo = props => {
    const [isEdit, setIsEdit] = useState(false);
    const invoiceDetail = useSelector(
        state => state.warehouse.invoice.detail.data
    );
    const loading = useSelector(
        state => state.warehouse.invoice.detail.loading
    );
    const formRef = useRef();
    const dispatch = useDispatch();
    const [trans] = useTrans();

    const handleSaveUpdate = (values, form) => {
        warehouseApi.invoice
            .update(invoiceDetail.id, _.pick(values, ['shipping_cost', 'shipping_cost_per_unit']))
            .then(response => {
                setIsEdit(false);

                dispatch(fetchInvoice({ id: response.id }));
            })
            .catch(err => {
                handleApiError(err, form);
            });
    };

    return (
        <Card className="invoice-info">
            <CardHeader title={trans("common.cost")}>
                <NeedPermission need="containers.update">
                    <CardHeaderToolbar>
                        <GrBtnEdit
                            isEdit={isEdit}
                            onEdit={() => setIsEdit(true)}
                            onSubmit={() => formRef.current.handleSubmit()}
                            onCancel={() => {
                                formRef.current.resetForm();
                                setIsEdit(false);
                            }}
                        />
                    </CardHeaderToolbar>
                </NeedPermission>
            </CardHeader>
            <CardBody>
                {loading && <Loading local />}
                <FormEditInvoiceCost
                    isEdit={isEdit}
                    initialValues={invoiceDetail}
                    onSubmit={handleSaveUpdate}
                    ref={formRef}
                />
            </CardBody>
        </Card>
    );
};

InvoiceCostInfo.propTypes = {

};

export default InvoiceCostInfo;