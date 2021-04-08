import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { boxOwnerAction } from 'app/modules/Warehouse/warehouse-redux/boxOwnerSlice';

import { Form, useFormikContext } from 'formik';
import FormStatus from '../FormStatus';
import ListBox from './ListBox';
import SelectCustomer from 'app/components/Select/SelectCustomer/SelectCustomerForm';

const FormContent = props => {

    const { values, setFieldValue } = useFormikContext();
    const { data: boxes, pagination, loading } = useSelector(state => state.warehouse.boxOwner.list);
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

    return (
        <Form className="form form-label-right form-add-lading-bill">
            <div className="row">
                <div className="col-lg-6">
                    <SelectCustomer
                        name="customer_id"
                    />
                </div>
            </div>

            <div className="row position-relative">
                <ListBox
                    customer_id={values.customer_id}
                    loading={loading}
                    boxes={boxes}
                    onChange={handleSelectBox}
                    pagination={pagination}
                    onChangePage={handlePageListBoxChange}
                />
            </div>

            <FormStatus />
        </Form>
    );
};

FormContent.propTypes = {

};

export default FormContent;