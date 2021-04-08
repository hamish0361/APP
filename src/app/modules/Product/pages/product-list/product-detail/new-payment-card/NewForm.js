import { Divider } from '@material-ui/core';
import { dialog } from 'app/components/DialogNotify';
import InputField from 'app/modules/Order/components/InputField';
import { fetchShipmentInfo } from 'app/modules/Order/order-redux/shipmentInfoSlice';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import * as Yup from 'yup';
import { Card, CardBody } from '_metronic/_partials/controls';
import './styles.scss';

NewForm.propTypes = {
    productDetail: PropTypes.object,
    onSearchCustomer: PropTypes.func,
    onSearchSupplier: PropTypes.func,
    onSubmitNew: PropTypes.func
};

function NewForm({
    productDetail = {},
    onSearchCustomer = null,
    onSearchSupplier = null,
    onSubmitNew = null,
    btnRef,
    intl
}) {
    const validSchema = Yup.object().shape({
        quantity: Yup.number().required(
            intl.formatMessage({
                id: 'ORDER.CREATE.WHOLESALE.QUANTITY_REQUIRED'
            })
        )
    });

    const boxOptions = [
        {
            value: '1',
            label: intl.formatMessage({
                id: 'TRACKING.PIECE'
            })
        },
        {
            value: '0',
            label: intl.formatMessage({
                id: 'TRACKING.BOX'
            })
        }
    ];
    const dispatch = useDispatch();
    const { shipmentList } = useSelector(
        ({ order }) => ({
            shipmentList: order.shipmentInfo.shipmentInfoList
        }),
        shallowEqual
    );

    const { taxList } = useSelector(
        ({ product }) => ({
            taxList: product.tax.taxList
        }),
        shallowEqual
    );

    const { customerList } = useSelector(
        ({ authService }) => ({
            customerList: authService.user.userList
        }),
        shallowEqual
    );

    const { shipmentMethodList } = useSelector(
        ({ warehouse }) => ({
            shipmentMethodList: warehouse.shipmentMethod.list.data
        }),
        shallowEqual
    );

    const { supplierList } = useSelector(
        ({ product }) => ({
            supplierList: product.supplier.supplierList
        }),
        shallowEqual
    );

    const [values, setValues] = useState({
        typeSearchProduct: 'name',
        productSelected: null,
        box: null,
        tax: null,
        typeSearchCustomer: 'email',
        methodSelected: null,
        shipmentInfoSelected: null,
        supplierSelected: null,
        isShowCustomer: false
    });

    const taxOptions = taxList.map(item => {
        return {
            value: item.id,
            label: item.name
        };
    });

    const handleSelectBox = boxSelected => {
        setValues({
            ...values,
            box: boxSelected.value
        });
    };

    const handleSelectTax = taxSelected => {
        setValues({
            ...values,
            tax: taxSelected.value
        });
    };

    // customer
    const customerOptions = customerList?.map(item => {
        return {
            value: item.id,
            label: item.email
        };
    });

    const methodOptions = shipmentMethodList.map(item => {
        return {
            value: item.id,
            label: item.name
        };
    });

    const customerRef = useRef(null);
    const handleSearchCustomer = value => {
        if (customerRef.current) {
            clearTimeout(customerRef.current);
        }
        customerRef.current = setTimeout(() => {
            setValues({
                ...values,
                isShowCustomer: true
            });
            const params = {
                value,
                type: values.typeSearchCustomer
            };
            if (value.length > 0) {
                if (onSearchCustomer) onSearchCustomer(params);
            }
        }, 500);
    };

    const handleSelectCustomer = customer => {
        const params = {
            value: `user_id:${customer.value}`,
            type: 'user_id'
        };
        dispatch(fetchShipmentInfo(params)).then(res => {
            if (res.type.includes('fulfilled')) {
                const list = res.payload.data;
                if (res.payload.data.length > 0) {
                    const option = {
                        value: list[0]?.id,
                        label: list[0]?.consignee,
                        address: list[0]?.address,
                        tel: list[0]?.tel
                    };
                    setValues({
                        ...values,
                        shipmentInfoSelected: option
                    });
                }
                dialog.success(`Có ${list.length} thông tin khách hàng`);
            } else {
                dialog.success(`Không Có thông tin khách hàng`);
            }
        });
    };

    const handleSelectMethod = method => {
        setValues({
            ...values,
            methodSelected: method.value
        });
    };

    // shipment
    const shipmentInforOptions = shipmentList.map(item => {
        return {
            value: item.id,
            label: item.consignee,
            address: item.address,
            tel: item.tel
        };
    });
    const handleSelectShipmentInfo = shipmentInfoSelected => {
        setValues({
            ...values,
            shipmentInfoSelected
        });
    };

    //supplier
    const supplierOptions = supplierList.map(item => {
        return {
            value: item.id,
            label: item.name,
            email: item.email,
            address: item.address,
            note: item.note
        };
    });
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
        setValues({
            ...values,
            supplierSelected
        });
    };

    const handleSubmit = formValue => {
        const params = {
            quantity: formValue.quantity,
            noteProduct: formValue.noteProduct,
            noteOrder: formValue.noteOrder,
            property: formValue.property,
            box: values.box?.value || boxOptions[0].value,
            shipmentMethodId:
                values.methodSelected?.value || methodOptions[0].value,
            shipmentInfoId:
                values.shipmentInfoSelected?.value ||
                shipmentInforOptions[0]?.value,
            productId: productDetail?.id || '',
            price: productDetail?.price || '',
            supplierId:
                values.supplierSelected?.value || supplierOptions[0]?.value
        };
        if (onSubmitNew) onSubmitNew(params);
    };

    const initValues = {
        property: '',
        quantity: '',
        noteProduct: '',
        noteOrder: ''
    };

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initValues}
                innerRef={btnRef}
                onSubmit={handleSubmit}
                validationSchema={validSchema}
            >
                {() => (
                    <Form>
                        <div className="form-group row ">
                            <div className="col-md-6">
                                <Card className="card-stretch">
                                    <CardBody>
                                        <div className="form-group row align-items-center align-items-center">
                                            <div className="col-md-12">
                                                <h4 className=" text-dark font-weight-bold mb-2">
                                                    <FormattedMessage id="ORDER.PRODUCT_INFO" />
                                                </h4>
                                            </div>
                                        </div>
                                        <Divider className="mb-9" />
                                        <div className="form-group row align-items-center align-items-center">
                                            <div className="col-md-3">
                                                <label>
                                                    {' '}
                                                    <FormattedMessage id="ORDER.CODE" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-control bg-light">
                                                    {productDetail?.id}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <div className="col-md-3">
                                                <label>
                                                    {' '}
                                                    <FormattedMessage id="ORDER.NAME" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-control bg-light product-detail-name">
                                                    {productDetail?.name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <div className="col-md-3">
                                                <label>
                                                    {' '}
                                                    <FormattedMessage id="ORDER.PRICE" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-control bg-light">
                                                    {productDetail?.price}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <div className="col-md-3">
                                                <label>
                                                    {' '}
                                                    <FormattedMessage id="ORDER.QUANTITY" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <FastField
                                                    type="number"
                                                    min="1"
                                                    name="quantity"
                                                    component={InputField}
                                                    placeholder={intl.formatMessage(
                                                        {
                                                            id:
                                                                'GLOBAL.PLACEHOLER.INPUT'
                                                        }
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <div className="col-md-3">
                                                <label>
                                                    <FormattedMessage id="ORDER.FORMALITY" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <Select
                                                    defaultValue={boxOptions[0]}
                                                    options={boxOptions}
                                                    onChange={handleSelectBox}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <div className="col-md-3">
                                                <label>
                                                    {' '}
                                                    <FormattedMessage id="ORDER.PROPERTIES" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <FastField
                                                    name="property"
                                                    component={InputField}
                                                    placeholder={intl.formatMessage(
                                                        {
                                                            id:
                                                                'GLOBAL.PLACEHOLER.INPUT'
                                                        }
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <div className="col-md-3">
                                                <label>
                                                    <FormattedMessage id="ORDER.TAX_PERCENT" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <Select
                                                    placeholder={intl.formatMessage(
                                                        {
                                                            id:
                                                                'GLOBAL.PLACEHOLER.SELECT'
                                                        }
                                                    )}
                                                    defaultValue={taxOptions[0]}
                                                    options={taxOptions}
                                                    onChange={handleSelectTax}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <div className="col-md-3">
                                                <label>
                                                    {' '}
                                                    <FormattedMessage id="ORDER.NOTE_PRODUCT" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <FastField
                                                    name="noteProduct"
                                                    component={InputField}
                                                    placeholder={intl.formatMessage(
                                                        {
                                                            id:
                                                                'GLOBAL.PLACEHOLER.INPUT'
                                                        }
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <Divider className="mb-9" />
                                        <div className="form-group row align-items-center">
                                            <div className="col-md-3">
                                                <label>
                                                    <FormattedMessage id="ORDER.SHIPMENT_METHOD" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <Select
                                                    placeholder={intl.formatMessage(
                                                        {
                                                            id:
                                                                'GLOBAL.PLACEHOLER.SELECT'
                                                        }
                                                    )}
                                                    defaultValue={
                                                        methodOptions[0]
                                                    }
                                                    options={methodOptions}
                                                    onChange={
                                                        handleSelectMethod
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <div className="col-md-3">
                                                <label>
                                                    {' '}
                                                    <FormattedMessage id="ORDER.NOTE_ORDER" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <FastField
                                                    name="noteOrder"
                                                    component={InputField}
                                                    placeholder={intl.formatMessage(
                                                        {
                                                            id:
                                                                'GLOBAL.PLACEHOLER.INPUT'
                                                        }
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>

                            <div className="col-md-6">
                                <Card>
                                    <CardBody>
                                        <div className="form-group row  align-items-center">
                                            <div className="col-md-5">
                                                <h4 className=" text-dark font-weight-bold mb-2">
                                                    <FormattedMessage id="ORDER.CUSTOMER_INFO" />
                                                </h4>
                                            </div>
                                            <div className="col-md-7">
                                                <Select
                                                    placeholder={intl.formatMessage(
                                                        {
                                                            id:
                                                                'GLOBAL.SEARCH.PLACEHOLER_INPUT'
                                                        }
                                                    )}
                                                    options={customerOptions}
                                                    onInputChange={
                                                        handleSearchCustomer
                                                    }
                                                    onChange={
                                                        handleSelectCustomer
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <Divider className="mb-9" />
                                        <div className="form-group row  align-items-center">
                                            <div className="col-md-5">
                                                <h4 className=" text-dark font-weight-bold mb-2">
                                                    <FormattedMessage id="ORDER.CONSIGNEE_INFO" />
                                                </h4>
                                            </div>
                                            <div className="col-md-7">
                                                <Select
                                                    placeholder={intl.formatMessage(
                                                        {
                                                            id:
                                                                'GLOBAL.PLACEHOLER.SELECT'
                                                        }
                                                    )}
                                                    value={
                                                        values.shipmentInfoSelected
                                                    }
                                                    options={
                                                        shipmentInforOptions
                                                    }
                                                    onChange={
                                                        handleSelectShipmentInfo
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <Divider className="mb-9" />
                                        <div className="form-group row">
                                            <div className="col-md-3">
                                                <label>
                                                    {' '}
                                                    <FormattedMessage id="ORDER.CONSIGNEE" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-control bg-light">
                                                    {values.shipmentInfoSelected
                                                        ?.label ||
                                                        shipmentInforOptions[0]
                                                            ?.label}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-md-3">
                                                <label>
                                                    <FormattedMessage id="ORDER.ADDRESS" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-control bg-light">
                                                    {values.shipmentInfoSelected
                                                        ?.address ||
                                                        shipmentInforOptions[0]
                                                            ?.address}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-md-3">
                                                <label>
                                                    {' '}
                                                    <FormattedMessage id="ORDER.TEL" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-control bg-light">
                                                    {values.shipmentInfoSelected
                                                        ?.tel ||
                                                        shipmentInforOptions[0]
                                                            ?.tel}
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <div className="form-group row  align-items-center">
                                            <div className="col-md-5">
                                                <h4 className=" text-dark font-weight-bold mb-2">
                                                    <FormattedMessage id="ORDER.SUPPLIER" />
                                                </h4>
                                            </div>
                                            <div className="col-md-7">
                                                <Select
                                                    placeholder={intl.formatMessage(
                                                        {
                                                            id:
                                                                'GLOBAL.SEARCH.PLACEHOLER_INPUT'
                                                        }
                                                    )}
                                                    defaultValue={
                                                        supplierOptions[0]
                                                    }
                                                    options={supplierOptions}
                                                    onInputChange={
                                                        handleSearchSupplier
                                                    }
                                                    onChange={
                                                        handleSelectSupplier
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <Divider className="mb-9" />
                                        <div className="form-group row">
                                            <div className="col-md-3">
                                                <label>
                                                    <FormattedMessage id="ORDER.NAME" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-control bg-light">
                                                    {
                                                        values.supplierSelected
                                                            ?.label
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-md-3">
                                                <label>
                                                    <FormattedMessage id="ORDER.ADDRESS" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-control bg-light">
                                                    {
                                                        values.supplierSelected
                                                            ?.address
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-md-3">
                                                <label>
                                                    <FormattedMessage id="AUTH.INPUT.EMAIL" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-control bg-light">
                                                    {
                                                        values.supplierSelected
                                                            ?.email
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-md-3">
                                                <label>
                                                    {' '}
                                                    <FormattedMessage id="ORDER.NOTE" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-control bg-light">
                                                    {
                                                        values.supplierSelected
                                                            ?.note
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default injectIntl(connect(null, null)(NewForm));
