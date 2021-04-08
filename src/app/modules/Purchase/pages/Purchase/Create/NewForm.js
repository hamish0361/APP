import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Prompt } from 'react-router-dom';
import Select from 'react-select';
import { Card, CardBody } from '_metronic/_partials/controls';
import ReactDatePicker from 'react-datepicker';
import { useForm, Controller } from 'react-hook-form';
import './index.scss';
import moment from 'moment';
import NumberFormat from 'react-number-format';

NewForm.propTypes = {
    suppliers: PropTypes.array,
    isSuccessNew: PropTypes.bool.isRequired,

    onSearchSupplier: PropTypes.func,
    onSubmitPurchaseOrder: PropTypes.func
};

function NewForm({
    suppliers,
    onSearchSupplier,
    onSubmitPurchaseOrder,
    btnRef,
    isSuccessNew,
    intl
}) {
    const [supplierSelected, setSupplierSelected] = useState(null);
    const { handleSubmit, control } = useForm({});

    // supplier
    const supplierRef = useRef(null);
    const handleSearchSupplier = value => {
        if (supplierRef.current) {
            clearTimeout(supplierRef.current);
        }
        supplierRef.current = setTimeout(() => {
            if (value.length > 0) {
                if (onSearchSupplier) onSearchSupplier(value);
            }
        }, 500);
    };

    const handleSelectSupplier = supplierSelected => {
        setSupplierSelected(supplierSelected);
    };
    const converDate = date => {
        return moment(date).format('yyyy-MM-DD');
    };

    const onSubmit = data => {
        const params = {
            supplier_id: supplierSelected?.value,
            additional_cost: data.additional_cost,
            payment_due_date: data.payment_due_date
                ? converDate(data.payment_due_date)
                : null,
            expected_delivery: data.expected_delivery
                ? converDate(data.expected_delivery)
                : null
        };
        onSubmitPurchaseOrder(params);
    };

    // options
    const supplierOptions = suppliers.map(supplier => {
        return {
            value: supplier.id,
            label: supplier.name,
            email: supplier.email,
            address: supplier.address,
            note: supplier.note
        };
    });

    const formIsHalfFilledOut = isSuccessNew ? false : !!supplierSelected;

    return (
        <>
            <div className="row">
                {/* begin buyer */}
                <div className="col-xl-6 mb-8">
                    <Card className="h-100">
                        <CardBody>
                            <div className="form-group row  align-items-center mt-3">
                                <div className="col-6">
                                    <h4 className=" text-dark font-weight-bold mb-2">
                                        <FormattedMessage id="TRACKING.COST" />
                                    </h4>
                                </div>
                            </div>
                            <Divider className="mb-9" />
                            {/* begin input */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group row">
                                    <div className="col-4">
                                        <label>
                                            <FormattedMessage id="ORDER.ADDITIONAL_COST" />
                                        </label>
                                    </div>
                                    <div className="col-8">
                                        <Controller
                                            name="additional_cost"
                                            control={control}
                                            as={
                                                <NumberFormat
                                                    className="form-control"
                                                    thousandSeparator={true}
                                                    value={0}
                                                />
                                            }
                                            defaultValue="0"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-4">
                                        <label>
                                            <FormattedMessage id="PURCHASE.DIVISION.ITEM.PAYMENT_DATE" />
                                        </label>
                                    </div>
                                    <div className="col-8">
                                        <Controller
                                            name="payment_due_date"
                                            control={control}
                                            render={({ onChange, value }) => (
                                                <ReactDatePicker
                                                    className="react-datepicker-wrapper form-control"
                                                    selected={value}
                                                    onChange={onChange}
                                                    placeholderText={intl.formatMessage(
                                                        {
                                                            id:
                                                                'GLOBAL.SEARCH.PLACEHOLER_SELECT_DATE'
                                                        }
                                                    )}
                                                    dateFormat="yyyy-MM-dd"
                                                />
                                            )}
                                            defaultValue=""
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-4">
                                        <label>
                                            <FormattedMessage id="PURCHASE.DIVISION.ITEM.EXPECTED_DATE" />
                                        </label>
                                    </div>
                                    <div className="col-8">
                                        <Controller
                                            name="expected_delivery"
                                            control={control}
                                            render={({ onChange, value }) => (
                                                <ReactDatePicker
                                                    className="react-datepicker-wrapper form-control"
                                                    selected={value}
                                                    onChange={onChange}
                                                    placeholderText={intl.formatMessage(
                                                        {
                                                            id:
                                                                'GLOBAL.SEARCH.PLACEHOLER_SELECT_DATE'
                                                        }
                                                    )}
                                                    dateFormat="yyyy-MM-dd"
                                                />
                                            )}
                                            defaultValue=""
                                        />
                                    </div>
                                </div>
                            </form>

                            {/* end input */}
                        </CardBody>
                    </Card>
                </div>
                {/* end buyer */}
                {/* begin supplier */}
                <div className="col-xl-6 mb-8">
                    <Card className="h-100">
                        <CardBody>
                            <div className="form-group row  align-items-center">
                                <div className="col-5">
                                    <h4 className=" text-dark font-weight-bold mb-2">
                                        <FormattedMessage id="ORDER.SUPPLIER" />
                                    </h4>
                                </div>
                                <div className="col-7">
                                    <Select
                                        options={supplierOptions}
                                        onInputChange={handleSearchSupplier}
                                        onChange={handleSelectSupplier}
                                        placeholder={intl.formatMessage({
                                            id: 'GLOBAL.SEARCH.PLACEHOLER_INPUT'
                                        })}
                                    />
                                </div>
                            </div>
                            <Divider className="mb-9" />
                            <div className="form-group row">
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="ORDER.NAME" />
                                    </label>
                                </div>
                                <div className="col-9">
                                    <div className="form-control bg-light">
                                        {supplierSelected?.label}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="ORDER.ADDRESS" />
                                    </label>
                                </div>
                                <div className="col-9">
                                    <div className="form-control bg-light">
                                        {supplierSelected?.address}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="AUTH.INPUT.EMAIL" />
                                    </label>
                                </div>
                                <div className="col-9">
                                    <div className="form-control bg-light">
                                        {supplierSelected?.email}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="ORDER.NOTE" />
                                    </label>
                                </div>
                                <div className="col-9">
                                    <div className="form-control bg-light">
                                        {supplierSelected?.note}
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                {/* end supplier */}
                <button
                    className="d-none"
                    onClick={handleSubmit(onSubmit)}
                    ref={btnRef}
                />
            </div>
            <Prompt
                when={formIsHalfFilledOut}
                message={intl.formatMessage({
                    id: 'GLOBAL.MESSAGE.FILLED_OUT'
                })}
            />
        </>
    );
}

export default NewForm;
