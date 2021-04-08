import React, { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { boxOwnerAction } from 'app/modules/Warehouse/warehouse-redux/boxOwnerSlice';
import _ from 'lodash';

import { Form, useFormikContext } from 'formik';
import FormStatus from '../FormStatus';
import ListBox from '../FormAddLadingBill/ListBox';
import SelectCustomerForm from 'app/components/Select/SelectCustomer/SelectCustomerForm';

const FormContent = props => {

    const { values, setFieldValue } = useFormikContext();
    const { data: boxes, pagination, loading } = useSelector(state => state.warehouse.boxOwner.list);
    const ladingBillDetail = useSelector(state => state.warehouse.ladingBill.detail.data);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(boxOwnerAction.resetParams());
        }
    }, []); // eslint-disable-line

    const handleSelectBox = useCallback((boxList) => {
        setFieldValue('boxes', boxList);
    }, []); // eslint-disable-line

    const handlePageListBoxChange = (page) => {
        dispatch(boxOwnerAction.changePagination({ page }))
    }

    const getBoxes = useMemo(() => {
        if (!boxes?.length) return [];

        return boxes.filter(b => {
            return _.findIndex(ladingBillDetail.owning_boxes, ['id', b.id]) === -1;
        });
    }, [boxes, ladingBillDetail]);

    return (
        <Form className="form form-label-right form-add-box-lading-bill">
            <SelectCustomerForm
                name="customer_id"
                isDisabled
            />

            <div className="row position-relative">
                <ListBox customer_id={values.customer_id} loading={loading} boxes={getBoxes} onChange={handleSelectBox} pagination={pagination} onChangePage={handlePageListBoxChange} />
            </div>

            <FormStatus />
        </Form>
    );
};

FormContent.propTypes = {

};

export default FormContent;