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
    onSubmitNew: PropTypes.func,
    shipmentList: PropTypes.array,
    taxList: PropTypes.array
};

function NewForm({
    productDetail = {},
    onSearchCustomer = null,
    onSubmitNew = null,
    btnRef,
    intl
}) {
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
    const validSchema = Yup.object().shape({
        quantity: Yup.number().required(
            intl.formatMessage({
                id: 'ORDER.CREATE.WHOLESALE.QUANTITY_REQUIRED'
            })
        )
    });

    const dispatch = useDispatch();
    const { shipmentList } = useSelector(
        ({ order }) => ({
            shipmentList: order.shipmentInfo.shipmentInfoList
        }),
        shallowEqual
    );

    const { taxList } = useSelector(
        ({ home }) => ({
            taxList: home.home.taxList
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
        ({ home }) => ({
            shipmentMethodList: home.home.shipmentMethodList
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
        customerSelected: null
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
            const params = {
                value,
                type: values.typeSearchCustomer
            };
            if (value.length > 0 && onSearchCustomer) onSearchCustomer(params);
        }, 500);
    };

    const handleSelectCustomer = customerSelected => {
        setValues({
            ...values,
            customerSelected
        });
        const params = {
            search: `user_id:${customerSelected.value}`
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
                dialog.success(`Có ${list.length} thông tin nhận hàng`);
            } else {
                dialog.success(`Không Có thông tin nhận hàng`);
            }
        });
    };

    const handleSelectMethod = method => {
        setValues({
            ...values,
            methodSelected: method.value
        });
    };

    // shipment infor
    const shipmentInforOptions = values.shipmentInfoSelected
        ? shipmentList.map(item => {
              return {
                  value: item.id,
                  label: item.consignee,
                  address: item.address,
                  tel: item.tel
              };
          })
        : [];

    const handleSelectShipmentInfo = shipmentInfoSelected => {
        setValues({
            ...values,
            shipmentInfoSelected
        });
    };

    const handleSubmit = formValue => {
        const params = {
            productId: productDetail?.id || '',
            price: productDetail?.price || '',
            shipmentInfoId:
                values.shipmentInfoSelected?.value ||
                shipmentInforOptions[0]?.value,
            box: values.box?.value || boxOptions[0].value,
            shipmentMethodId: values.methodSelected || methodOptions[0]?.value,
            tax: values.tax || taxOptions[0]?.value,
            quantity: formValue.quantity,
            noteOrder: formValue.noteOrder,
            noteProduct: formValue.noteProduct,
            property: formValue.property
        };
        if (onSubmitNew) onSubmitNew(params);
    };

    const initValues = {
        property: '',
        quantity: 1,
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
                        <div className="form-group row">
                            <div className="col-md-6">
                                <Card>
                                    <CardBody>
                                        <div className="form-group row align-items-center">
                                            <div className="col-md-12">
                                                <h4 className=" text-dark font-weight-bold mb-2">
                                                    <FormattedMessage id="ORDER.PRODUCT_INFO" />
                                                </h4>
                                            </div>
                                        </div>
                                        <Divider className="mb-9" />
                                        <div className="form-group row">
                                            <div className="col-md-3">
                                                <label>
                                                    {' '}
                                                    <FormattedMessage id="ORDER.CODE" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-control bg-light">
                                                    {productDetail.id}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-md-3">
                                                <label>
                                                    {' '}
                                                    <FormattedMessage id="ORDER.NAME" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-control bg-light product-detail-name">
                                                    {productDetail.name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-md-3">
                                                <label>
                                                    <FormattedMessage id="ORDER.PRICE" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-control bg-light">
                                                    {productDetail.price}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-md-3">
                                                <label>
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
                                        <div className="form-group row">
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
                                        <div className="form-group row">
                                            <div className="col-md-3">
                                                <label>
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
                                        <div className="form-group row">
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
                                        <div className="form-group row">
                                            <div className="col-md-3">
                                                <label>
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
                                        <div className="form-group row">
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
                                        <div className="form-group row">
                                            <div className="col-md-3">
                                                <label>
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

                            {/* Thong tin nhan hang */}
                            <div className="col-md-6">
                                <Card>
                                    <CardBody>
                                        <div className="form-group row  align-items-center">
                                            <div className="col-md-3">
                                                <h4 className=" text-dark font-weight-bold mb-2">
                                                    <FormattedMessage id="ORDER.CUSTOMER_INFO" />
                                                </h4>
                                            </div>
                                            <div className="col-md-9">
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
                                            <div className="col-md-3">
                                                <h4 className=" text-dark font-weight-bold mb-2">
                                                    <FormattedMessage id="ORDER.CONSIGNEE_INFO" />
                                                </h4>
                                            </div>
                                            <div className="col-md-9">
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
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default injectIntl(connect(null, null)(NewForm));
