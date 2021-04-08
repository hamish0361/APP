import { Divider } from '@material-ui/core';
import { dialog } from 'app/components/DialogNotify';
import InputField from 'app/modules/Order/components/InputField';
import { fetchShipmentInfo } from 'app/modules/Order/order-redux/shipmentInfoSlice';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Prompt } from 'react-router-dom';
import Select from 'react-select';
import * as Yup from 'yup';
import { Card, CardBody } from '_metronic/_partials/controls';
import './styles.scss';

NewForm.propTypes = {
    onSearchProduct: PropTypes.func,
    onSearchCustomer: PropTypes.func,
    onSubmitNew: PropTypes.func,
    onSelectProduct: PropTypes.func,

    isSuccessNew: PropTypes.bool.isRequired
};

function NewForm({
    onSearchProduct = null,
    onSearchCustomer = null,
    onSubmitNew = null,
    btnRef,
    onSelectProduct,
    isSuccessNew,
    intl
}) {
    const dispatch = useDispatch();
    const {
        shipmentList,
        taxList,
        productList,
        customerList,
        shipmentMethodList
    } = useSelector(
        ({ order, home, product, authService }) => ({
            shipmentList: order.shipmentInfo.shipmentInfoList,
            taxList: home.home.taxList,
            productList: product.list.productList,
            customerList: authService.user.userList,
            shipmentMethodList: home.home.shipmentMethodList
        }),
        shallowEqual
    );

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

    const [values, setValues] = useState({
        typeSearchProduct: 'name',
        productSelected: null,
        box: null,
        tax: null,
        typeSearchCustomer: 'email',
        methodSelected: null,
        shipmentInfoSelected: null
    });
    const [customerSelected, setCustomerSelected] = useState(null);
    const [check, setCheck] = useState(true);
    // product
    const optionsProduct = productList.map(item => {
        return {
            value: item.id,
            label: item.name,
            price: item.price
        };
    });

    const taxOptions = taxList.map(item => {
        return {
            value: item.id,
            label: item.name,
            percent: item.percent
        };
    });

    const productRef = useRef(null);
    const handleSearchProduct = value => {
        if (productRef.current) {
            clearTimeout(productRef.current);
        }
        productRef.current = setTimeout(() => {
            const params = {
                value,
                type: values.typeSearchProduct
            };
            if (value.length > 0 && onSearchProduct) onSearchProduct(params);
        }, 500);
    };

    const handleSelectProduct = productSelected => {
        setValues({
            ...values,
            productSelected
        });
        onSelectProduct();
    };

    const handleSelectBox = boxSelected => {
        setValues({
            ...values,
            box: boxSelected.value
        });
    };

    const handleSelectTax = taxSelected => {
        setValues({
            ...values,
            tax: taxSelected
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

    const handleSelectCustomer = customer => {
        setCustomerSelected(customer);
        const params = {
            search: `user_id:${customer.value}`
        };
        dispatch(fetchShipmentInfo(params)).then(res => {
            if (res.type.includes('fulfilled')) {
                const list = res.payload?.data;
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
                } else {
                    setValues({
                        ...values,
                        shipmentInfoSelected: null
                    });
                }
                dialog.success(
                    `${list.length} ${intl.formatMessage({
                        id: 'ORDER.CONSIGNEE_INFO'
                    })}`
                );
            } else {
                dialog.success(
                    intl.formatMessage({ id: 'ORDER.CONSIGNEE_INFO_NO_DATA' })
                );
            }
            setCheck(false);
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
        const tax = values.tax?.percent || taxOptions[0].percent;
        const params = {
            productId: values.productSelected?.value || '',
            price: values.productSelected?.price || '',
            shipmentInfoId:
                values.shipmentInfoSelected?.value ||
                shipmentInforOptions[0]?.value,
            box: values.box?.value || boxOptions[0].value,
            shipmentMethodId: values.methodSelected || methodOptions[0]?.value,
            tax,
            quantity: formValue.quantity,
            noteOrder: formValue.noteOrder,
            noteProduct: formValue.noteProduct,
            property: formValue.property,
            customer_id: customerSelected?.value
        };
        if (onSubmitNew) onSubmitNew(params);
    };

    const initValues = {
        property: '',
        quantity: 1,
        noteProduct: '',
        noteOrder: ''
    };

    const formIsHalfFilledOut = isSuccessNew
        ? false
        : !!values.productSelected || !!customerSelected;

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
                            <div className="col-xl-6 mb-8">
                                <Card className="h-100">
                                    <CardBody>
                                        <div className="form-group row align-items-center">
                                            <div className="col-md-6">
                                                <h4 className=" text-dark font-weight-bold mb-2">
                                                    <FormattedMessage id="ORDER.PRODUCT_INFO" />
                                                </h4>
                                            </div>
                                            <div className="col-md-6">
                                                <Select
                                                    placeholder={intl.formatMessage(
                                                        {
                                                            id:
                                                                'GLOBAL.SEARCH.PLACEHOLER_INPUT'
                                                        }
                                                    )}
                                                    options={optionsProduct}
                                                    onInputChange={
                                                        handleSearchProduct
                                                    }
                                                    onChange={
                                                        handleSelectProduct
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <Divider className="mb-9" />
                                        <div className="form-group row">
                                            <div className="col-md-3">
                                                <label>
                                                    <FormattedMessage id="ORDER.CODE" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-control bg-light">
                                                    {
                                                        values.productSelected
                                                            ?.value
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-md-3">
                                                <label>
                                                    <FormattedMessage id="ORDER.NAME" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-control bg-light product-detail-name">
                                                    {
                                                        values.productSelected
                                                            ?.label
                                                    }
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
                                                    {
                                                        values.productSelected
                                                            ?.price
                                                    }
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
                                            <div className="col-md-6">
                                                <label>
                                                    <FormattedMessage id="ORDER.SHIPMENT_METHOD" />
                                                </label>
                                            </div>
                                            <div className="col-md-6">
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
                            <div className="col-xl-6">
                                <Card>
                                    <CardBody>
                                        <div className="form-group row  align-items-center">
                                            <div className="col-md-6">
                                                <h4 className=" text-dark font-weight-bold mb-2">
                                                    <FormattedMessage id="ORDER.CUSTOMER_INFO" />
                                                </h4>
                                            </div>
                                            <div className="col-md-6">
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
                                            <div className="col-md-6">
                                                <h4 className=" text-dark font-weight-bold mb-2">
                                                    <FormattedMessage id="ORDER.CONSIGNEE_INFO" />
                                                </h4>
                                            </div>
                                            <div className="col-md-6">
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
                                                    isDisabled={check}
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
                                                        ?.label || ''}
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
                                                        ?.address || ''}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-md-3">
                                                <label>
                                                    <FormattedMessage id="ORDER.TEL" />
                                                </label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-control bg-light">
                                                    {values.shipmentInfoSelected
                                                        ?.tel || ''}
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
