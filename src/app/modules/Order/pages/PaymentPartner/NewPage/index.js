import TopHeader from 'app/modules/Order/components/TopHeader';
import React, { useRef, useState } from 'react';
import { fetchUsers } from 'app/modules/AuthService/auth-service-redux/userSlice';
import { fetchShipmentInfo } from 'app/modules/Order/order-redux/shipmentInfoSlice';
import { Button } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Card, Divider } from '@material-ui/core';
import { CardBody } from '_metronic/_partials/controls';
import { createOrderPayment } from '../../../order-redux/orderSlice';
import './styles.scss';
import { dialog } from 'app/components/DialogNotify';
import Select from 'react-select';

function PaymentPartnerNewPage({ intl }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { shipmentList, customerList } = useSelector(
        ({ order, authService }) => ({
            shipmentList: order.shipmentInfo.shipmentInfoList,
            customerList: authService.user.userList
        }),
        shallowEqual
    );
    const [fileOrder, setFileOrder] = useState(null);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop: files => setFileOrder(files)
    });

    const files = acceptedFiles.map(file => (
        <h4 key={file.path} style={{ marginLeft: '1rem' }}>
            {file.path}
        </h4>
    ));
    const [values, setValues] = useState({
        typeSearchCustomer: 'email',
        shipmentInfoSelected: null,
        customerSelected: null
    });
    const [selectCustomer, setSelectCustomer] = useState('');

    const handleSubmit = () => {
        if (fileOrder != null) {
            const formData = new FormData();
            formData.set('file', fileOrder[0], fileOrder[0]?.name);
            let body = {
                params: {
                    type: 'payment',
                    shipment_infor_id:
                        values.shipmentInfoSelected?.value ||
                        shipmentInforOptions[0]?.value,
                    customer_id: selectCustomer?.value
                },
                data: formData
            };
            dispatch(createOrderPayment(body)).then(res => {
                if (res.type.includes('fulfilled')) {
                    dialog.success(
                        intl.formatMessage({
                            id: 'ORDER.CREATE.PAYMENT.SUCCESS'
                        })
                    );
                    history.push(
                        `/ban-hang/don-thanh-toan-ho/${res.payload.id}/chi-tiet`
                    );
                } else {
                    dialog.error(
                        intl.formatMessage({ id: 'ORDER.CREATE.PAYMENT.FAIL' })
                    );
                }
            });
        } else {
            dialog.warning('Please input file');
        }
    };

    // customer

    const customerRef = useRef(null);

    const handleSearchCustomer = value => {
        const params = {
            search: value,
            searchFields: 'email:like'
        };
        if (customerRef.current) {
            clearTimeout(customerRef.current);
        }
        customerRef.current = setTimeout(() => {
            if (value?.length > 0) dispatch(fetchUsers(params));
        }, 500);
    };
    // customer
    const customerOptions = customerList?.map(item => {
        return {
            value: item.id,
            label: item.email
        };
    });

    const handleSelectShipmentInfo = shipmentInfoSelected => {
        setValues({
            ...values,
            shipmentInfoSelected
        });
    };
    const [check, setCheck] = useState(true);

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

    const handleSelectCustomer = customerSelected => {
        setSelectCustomer(customerSelected);
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

    return (
        <>
            <TopHeader
                title={intl.formatMessage({ id: 'ORDER.PAYMENT.NEW.TITLE' })}
            >
                <Button
                    type="button"
                    onClick={() => history.goBack()}
                    className="btn btn-light"
                >
                    <i className="fa fa-arrow-left"></i>
                    <FormattedMessage id="GLOBAL.BUTTON.BACK" />
                </Button>
                {`  `}
                <Button
                    style={{ width: '100px' }}
                    type="submit"
                    className="btn btn-primary ml-2"
                    onClick={handleSubmit}
                >
                    <FormattedMessage id="GLOBAL.BUTTON.CREATE_ORDER" />
                </Button>
            </TopHeader>
            <div className="form-group row px-8">
                <div className="col-xl-6">
                    <Card className="h-100">
                        <CardBody>
                            <div className="form-group row  align-items-center">
                                <div className="col-md-6">
                                    <h4 className=" text-dark font-weight-bold mb-2">
                                        <FormattedMessage id="ORDER.PAYMENT.FILE.INFO" />
                                    </h4>
                                </div>
                                <div className="col-md-6"></div>
                            </div>
                            <Divider className="mb-9" />
                            <div className="rsg--preview-60">
                                <section className="container">
                                    <div
                                        {...getRootProps({
                                            className: 'dropzone'
                                        })}
                                    >
                                        <input {...getInputProps()} />
                                        {fileOrder === null ? (
                                            <div>
                                                <div className="img-drop-zone-loca">
                                                    <img
                                                        className="img-drop-zone"
                                                        src="https://img.icons8.com/dusk/64/000000/add-file--v1.png"
                                                        alt="Tomoni Solution"
                                                    />
                                                </div>
                                                <p>
                                                    {intl.formatMessage({
                                                        id:
                                                            'ORDER.PAYMENT.DROP_FILE'
                                                    })}
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="img-drop-zone-loca">
                                                    <img
                                                        className="img-drop-zone"
                                                        src="https://img.icons8.com/dusk/64/000000/check-file.png"
                                                        alt="Tomoni Solution"
                                                    />
                                                </div>

                                                <p>
                                                    {intl.formatMessage({
                                                        id:
                                                            'ORDER.PAYMENT.UPDATE.FILE.SUCCESS'
                                                    })}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <aside>
                                        <div className="row">
                                            <h4>Files: </h4> {files}
                                        </div>
                                    </aside>
                                </section>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-xl-6">
                    <Card className="h-100">
                        <CardBody>
                            <div className="form-group row  align-items-center">
                                <div className="col-md-6">
                                    <h4 className=" text-dark font-weight-bold mb-2">
                                        <FormattedMessage id="ORDER.CUSTOMER_INFO" />
                                    </h4>
                                </div>
                                <div className="col-md-6">
                                    <Select
                                        placeholder={intl.formatMessage({
                                            id: 'GLOBAL.SEARCH.PLACEHOLER_INPUT'
                                        })}
                                        options={customerOptions}
                                        onInputChange={handleSearchCustomer}
                                        onChange={handleSelectCustomer}
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
                                        placeholder={intl.formatMessage({
                                            id: 'GLOBAL.PLACEHOLER.SELECT'
                                        })}
                                        value={values.shipmentInfoSelected}
                                        options={shipmentInforOptions}
                                        onChange={handleSelectShipmentInfo}
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
                                        {values.shipmentInfoSelected?.label ||
                                            ''}
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
                                        {values.shipmentInfoSelected?.address ||
                                            ''}
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
                                        {values.shipmentInfoSelected?.tel || ''}
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default injectIntl(connect(null, null)(PaymentPartnerNewPage));
