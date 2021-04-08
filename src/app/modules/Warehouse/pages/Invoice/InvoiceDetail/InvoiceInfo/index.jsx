import React, { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import warehouseApi from 'apis/warehouse';
import handleApiError from 'helper/handleApiError';
import moment from 'moment';
import convertObjectDateToString from 'helper/convertObjectDateToString';
import _ from 'lodash';

import { Card, CardBody, CardHeader, CardHeaderToolbar } from '_metronic/_partials/controls';
import Loading from 'app/components/Loading';
import GrBtnEdit from 'app/modules/Warehouse/components/GrBtnEdit';
import { fetchInvoice } from 'app/modules/Warehouse/warehouse-redux/invoiceSlice';
import FormAddInvoice from 'app/modules/Warehouse/components/Form/FormAddInvoice';
import useTrans from 'helper/useTrans';
import NeedPermission from 'app/components/NeedPermission';

const InvoiceInfo = props => {
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
            .update(invoiceDetail.id, convertObjectDateToString(values))
            .then(response => {
                setIsEdit(false);

                dispatch(fetchInvoice({ id: response.id }));
            })
            .catch(err => {
                handleApiError(err, form);
            });
    };

    const getInitialValue = useMemo(() => {

        if (!invoiceDetail) return {};

        const result = {};
        Object.entries(_.omit(invoiceDetail, ['created_at', 'updated_at'])).forEach(([key, value]) => {
            let tempV = value;
            if (typeof value === 'string' && moment(value, 'DD-MM-YYYY').isValid()) tempV = moment(value, 'DD-MM-YYYY');

            result[key] = tempV;
        });

        return result;
    }, [invoiceDetail]);

    return (
        <Card className="invoice-info">
            <CardHeader title={trans("warehouse.invoice.info")}>
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
                <FormAddInvoice
                    isEdit={isEdit}
                    isShowCutOff
                    ref={formRef}
                    initialValues={getInitialValue}
                    onSubmit={handleSaveUpdate}
                />
            </CardBody>
        </Card>
    );
};

InvoiceInfo.propTypes = {

};

export default InvoiceInfo;