import React, { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import warehouseApi from 'apis/warehouse';
import handleApiError from 'helper/handleApiError';
import { fetchLadingBill } from '../../../warehouse-redux/ladingBillSlice';
import moment from 'moment';

import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';
import FormEditLadingBill from '../../../components/Form/FormEditLadingBill';
import Loading from 'app/components/Loading';
import GrBtnEdit from 'app/modules/Warehouse/components/GrBtnEdit';
import convertObjectDateToString from 'helper/convertObjectDateToString';
import useTrans from 'helper/useTrans';
import NeedPermission from 'app/components/NeedPermission';

const LadingBillInfo = props => {
    const [isEdit, setIsEdit] = useState(false);
    const ladingBillDetail = useSelector(
        state => state.warehouse.ladingBill.detail.data
    );
    const loading = useSelector(
        state => state.warehouse.ladingBill.detail.loading
    );
    const formRef = useRef();
    const dispatch = useDispatch();
    const [trans] = useTrans();

    const handleSaveUpdate = (values, form) => {
        warehouseApi.ladingBill
            .update(ladingBillDetail.id, convertObjectDateToString(values))
            .then(response => {
                setIsEdit(false);

                dispatch(fetchLadingBill({ id: response.id, with: "boxLadingBills.owningBox.box" }));
            })
            .catch(err => {
                handleApiError(err, form);
            });
    };

    const getInitialValue = useMemo(() => {
        if (ladingBillDetail?.desired_date) return { ...ladingBillDetail, desired_date: moment(ladingBillDetail.desired_date, 'DD-MM-YYYY') };

        return ladingBillDetail;
    }, [ladingBillDetail]);

    return (
        <Card style={{ height: 'calc(100% - 25px)' }}>
            <CardHeader title={trans("warehouse.lading_bill.info")}>
                <NeedPermission need={'lading-bills.update'}>
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
            <CardBody className="position-relative">
                {loading && <Loading />}
                <FormEditLadingBill
                    isEdit={isEdit}
                    ref={formRef}
                    initialValues={getInitialValue}
                    onSubmit={handleSaveUpdate}
                />
            </CardBody>
        </Card>
    );
};

LadingBillInfo.propTypes = {};

export default LadingBillInfo;
