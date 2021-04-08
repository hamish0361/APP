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
} from '_metronic/_partials/controls';
import FormEditLadingBillCost from 'app/modules/Warehouse/components/Form/FormEditLadingBill/FormEditLadingBillCost';

import Loading from 'app/components/Loading';
import convertObjectDateToString from 'helper/convertObjectDateToString';
import useTrans from 'helper/useTrans';

const LadingBillCostInfo = props => {
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

                dispatch(fetchLadingBill({ id: response.id }));
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
        <Card>
            <CardHeader title={trans("warehouse.lading_bill.cost")}>
            </CardHeader>
            <CardBody className="position-relative">
                {loading && <Loading />}
                <FormEditLadingBillCost
                    isEdit={isEdit}
                    initialValues={getInitialValue}
                    onSubmit={handleSaveUpdate}
                    ref={formRef}
                />
            </CardBody>
        </Card>
    );
};

LadingBillCostInfo.propTypes = {};

export default LadingBillCostInfo;
