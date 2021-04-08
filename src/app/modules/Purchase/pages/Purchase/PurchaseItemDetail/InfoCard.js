import { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';
import { updatePurchaseItem } from 'app/modules/Purchase/redux/purchaseItemSlice';
import { createTracking } from 'app/modules/Purchase/redux/trackingSlice';
import formatNumber from 'helper/formatNumber';
import usePrevious from 'helper/usePrevious';
import { checkNumber } from 'helper/utils';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { Button } from 'reactstrap';
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';

InfoCard.propTypes = {
    purchase: PropTypes.object,
    onUpdate: PropTypes.func
};

function InfoCard({ purchase = {}, intl, onUpdate }) {
    const dispatch = useDispatch();
    const [code, setCode] = useState('');
    const [values, setValues] = useState({
        price: 0,
        quantity: 0,
        note: ''
    });
    const [taxOption, setTaxOption] = useState(null);
    const { taxList } = useSelector(
        ({ home }) => ({ taxList: home.home.taxList }),
        shallowEqual
    );
    const [tracking, setTracking] = useState(null);
    const [trackingLoading, setTrackingLoading] = useState(false);
    const prePrice = usePrevious(purchase?.price || 0);
    const preQuantity = usePrevious(purchase?.quantity || 0);
    const preNote = usePrevious(purchase?.note || '');
    const preTax = usePrevious(purchase?.tax_percent || 0);

    const handleCodeChange = e => {
        if (!checkNumber(e.target.value)) return;

        setCode(e.target.value);
    };

    const handleInputChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleTrackingChange = () => {
        if (tracking?.id) {
            handleRemoveTracking();
        } else {
            handleNewTracking();
        }
    };

    const handleRemoveTracking = () => {
        setTrackingLoading(true);
        const params = {
            id: purchase.id,
            body: {
                tracking_id: null
            }
        };
        dispatch(updatePurchaseItem(params)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    intl.formatMessage({
                        id: 'PURCHASE.REMOVE.TRACKING.SUCCESS'
                    })
                );
                setCode('');
                setTracking(null);
            } else {
                dialog.error(
                    intl.formatMessage({ id: 'PURCHASE.REMOVE.TRACKING.FAIL' })
                );
            }
            setTrackingLoading(false);
        });
    };

    const handleNewTracking = () => {
        setTrackingLoading(true);
        const params = {
            id: code
        };
        dispatch(createTracking(params)).then(res => {
            if (res.type.includes('fulfilled')) {
                const params = {
                    id: purchase?.id,
                    body: {
                        tracking_id: res.payload?.id
                    }
                };
                dispatch(updatePurchaseItem(params)).then(res => {
                    if (res.type.includes('fulfilled')) {
                        dialog.success(
                            intl.formatMessage({
                                id: 'PURCHASE.CREATE.TRACKING.SUCCESS'
                            })
                        );
                        setTracking({
                            ...tracking,
                            id: code
                        });
                    } else {
                        dialog.error(
                            intl.formatMessage({
                                id: 'PURCHASE.CREATE.TRACKING.FAIL'
                            })
                        );
                    }
                });
            } else {
                dialog.error(
                    intl.formatMessage({ id: 'PURCHASE.CREATE.TRACKING.FAIL' })
                );
            }
            setTrackingLoading(false);
        });
    };

    const handleUpdate = () => {
        const body = {
            price: values.price,
            quantity: values.quantity,
            note: values.note,
            tax_percent: taxOption?.percent
        };
        onUpdate(body);
    };

    const handleTaxSelect = tax => {
        setTaxOption(tax);
    };

    useEffect(() => {
        setCode(purchase?.tracking?.id || '');
        setTracking(purchase?.tracking);
        setValues({
            price: purchase?.price || 0,
            quantity: purchase?.quantity || 0,
            note: purchase?.note || ''
        });
        const taxIndex = taxOptions.findIndex(
            x => x.percent === purchase?.tax_percent
        );
        setTaxOption(taxOptions[taxIndex]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [purchase?.id]);

    const taxOptions = taxList?.map(item => {
        return {
            value: item.id,
            label: item.name,
            percent: item.percent
        };
    });

    const disabled =
        prePrice === +values.price &&
        preQuantity === +values.quantity &&
        preNote === values.note &&
        preTax === taxOption?.percent;

    return (
        <>
            {trackingLoading && <Loading />}
            <Card className="h-100">
                <CardHeader
                    title={intl.formatMessage({ id: 'PURCHASE.ITEM.INFO' })}
                >
                    <CardHeaderToolbar>
                        <Button
                            color="primary"
                            onClick={handleUpdate}
                            disabled={disabled || +values.quantity <= 0}
                        >
                            <FormattedMessage id="GLOBAL.BUTTON.UPDATE" />
                        </Button>
                    </CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                    <div className="form-group row align-items-center">
                        <div className="col-md-6 row">
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="PURCHASE.TITLE" />
                                </label>
                            </div>
                            <div className="col-9">
                                <div className="form-control bg-light">
                                    {purchase?.purchase_id}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 row">
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="TRACKING.PRODUCT" />
                                </label>
                            </div>
                            <div className="col-9">
                                <div className="form-control bg-light">
                                    {purchase?.product_id}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row align-items-center">
                        <div className="col-md-6 row">
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="ORDER.AMOUNT" />
                                </label>
                            </div>
                            <div className="col-9">
                                <div className="form-control bg-light">
                                    {formatNumber(purchase?.amount)}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 row">
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="ORDER.BALANCE" />
                                </label>
                            </div>
                            <div className="col-9">
                                <div className="form-control bg-light">
                                    {formatNumber(purchase?.balance)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row align-items-center">
                        <div className="col-md-6 row">
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="ORDER.PRICE" />
                                </label>
                            </div>
                            <div className="col-9">
                                <input
                                    name="price"
                                    type="number"
                                    className="form-control"
                                    value={values.price}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 row">
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="ORDER.TAX" />
                                </label>
                            </div>
                            <div className="col-9">
                                <div className="form-control bg-light">
                                    {formatNumber(purchase?.tax)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row align-items-center">
                        <div className="col-md-6 row">
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="ORDER.QUANTITY" />
                                </label>
                            </div>
                            <div className="col-9">
                                <input
                                    name="quantity"
                                    type="number"
                                    className="form-control"
                                    value={values.quantity}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 row">
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="ORDER.TAX_PERCENT" />
                                </label>
                            </div>
                            <div className="col-9">
                                <Select
                                    options={taxOptions}
                                    value={taxOption}
                                    onChange={handleTaxSelect}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row align-items-center">
                        <div className="col-md-6 row">
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="ORDER.NOTE" />
                                </label>
                            </div>
                            <div className="col-9">
                                <input
                                    name="note"
                                    className="form-control"
                                    value={values.note}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 row">
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="ORDER.TRACKING" />
                                </label>
                            </div>
                            <div className="col-9">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="code"
                                        className="form-control"
                                        value={code}
                                        onChange={handleCodeChange}
                                        disabled={tracking?.id}
                                        placeholder={intl.formatMessage({
                                            id:
                                                'GLOBAL.TRACKING.PLACEHOLER.INPUT'
                                        })}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            type="button"
                                            className="input-group-text"
                                            style={{
                                                backgroundColor: '#3699FF',
                                                color: '#ffffff'
                                            }}
                                            onClick={handleTrackingChange}
                                            disabled={!code}
                                        >
                                            {tracking?.id
                                                ? intl.formatMessage({
                                                      id: 'GLOBAL.BUTTON.DELETE'
                                                  })
                                                : intl.formatMessage({
                                                      id: 'GLOBAL.BUTTON.SAVE'
                                                  })}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default InfoCard;
