import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { shallowEqual, useSelector } from 'react-redux';
import Select from 'react-select';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import Switch from '@material-ui/core/Switch';
import './index.scss';

DialogNewItem.propTypes = {
    show: PropTypes.bool,
    trackings: PropTypes.array,
    orderItems: PropTypes.array,
    onSearchProductAll: PropTypes.func,
    onHide: PropTypes.func,
    onSearchProduct: PropTypes.func,
    onSearchTracking: PropTypes.func,
    onSubmitNew: PropTypes.func
};
function DialogNewItem({
    show,
    trackings,
    orderItems,
    onHide,
    onSearchProductAll,
    onSearchProduct,
    onSearchTracking,
    onSubmitNew,
    intl
}) {
    const { taxList } = useSelector(
        ({ home }) => ({ taxList: home.home.taxList }),
        shallowEqual
    );

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedTracking, setSelectedTracking] = useState(null);
    const [tax, setTax] = useState(null);
    const [values, setValues] = useState({
        price: 0,
        quantity: 1
    });
    const [checkSearch, setCheckSearch] = useState(false);
    const productRef = useRef(null);
    const handleSearchItem = value => {
        if (productRef.current) {
            clearTimeout(productRef.current);
        }
        productRef.current = setTimeout(() => {
            if (value.length > 0) {
                if (onSearchProduct) onSearchProduct(value);
            }
        }, 500);
    };
    const { productList } = useSelector(
        ({ product }) => ({
            productList: product.list.productList
        }),
        shallowEqual
    );
    const trackingRef = useRef(null);
    const handleSearchTracking = value => {
        if (trackingRef.current) {
            clearTimeout(trackingRef.current);
        }
        trackingRef.current = setTimeout(() => {
            if (value.length > 0) {
                if (onSearchTracking) onSearchTracking(value);
            }
        }, 500);
    };

    useEffect(() => {
        if (show) {
            setValues({
                price: 0,
                quantity: 1
            });
            setSelectedProduct(null);
            setSelectedTracking(null);
            setTax(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    const handleSubmitNew = () => {
        const params = {
            productId: selectedProduct?.value,
            trackingId: selectedTracking?.value || '',
            price: values.price,
            quantity: values.quantity,
            order_product_id: selectedProduct?.orderId,
            tax: tax || taxOptions[0]?.percent
        };
        onSubmitNew(params);
    };

    const handleSelectItem = selectedProduct => {
        setSelectedProduct(selectedProduct);
    };

    const handleSelectTracking = selectedTracking => {
        setSelectedTracking(selectedTracking);
    };

    const handleInputChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const orderItemOptions = orderItems.map(item => {
        return {
            value: item.product_id,
            label: `${item.product_id} - Mã đơn: ${item.id}`,
            orderId: item.id
        };
    });
    const trackingOptions = trackings.map(tracking => {
        return {
            value: tracking.id,
            label: tracking.id
        };
    });

    const handleSearchProduct = value => {
        if (productRef.current) {
            clearTimeout(productRef.current);
        }
        productRef.current = setTimeout(() => {
            const params = {
                value,
                type: 'id'
            };
            if (value.length > 0 && onSearchProductAll)
                onSearchProductAll(params);
        }, 500);
    };

    const handleTaxSelect = tax => {
        setTax(tax.percent);
    };

    const productOption = productList.map(item => {
        return {
            value: item.id,
            label: `${intl.formatMessage({
                id: 'PRODUCT.TOPFILTER.JANCODE'
            })} ${item.id} - ${intl.formatMessage({
                id: 'PRODUCT.TOPFILTER.NAME'
            })}: ${item.name}`,
            orderId: ''
        };
    });

    const taxOptions = taxList?.map(item => {
        return {
            value: item.id,
            label: item.name,
            percent: item.percent
        };
    });

    return (
        <Modal isOpen={show} style={{ minWidth: '850px' }}>
            <div className="header-modal">
                <h5>
                    <FormattedMessage id="PURCHASE.CREATE.ITEM.TITLE" />
                </h5>
                <div>
                    <Switch
                        checked={checkSearch}
                        onChange={() => setCheckSearch(!checkSearch)}
                        color="primary"
                    />
                    <label className="width-label">
                        {checkSearch
                            ? `${intl.formatMessage({
                                  id:
                                      'PURCHASE.UPDATE.ITEM.SEARCH.PRODUCT_ORDER'
                              })}`
                            : `${intl.formatMessage({
                                  id: 'PURCHASE.UPDATE.ITEM.SEARCH.PRODUCT_ALL'
                              })}`}
                    </label>
                </div>
            </div>

            <ModalBody>
                <div className="form-group">
                    <label>
                        <FormattedMessage id="ORDER.PRODUCT" />
                        {checkSearch
                            ? ` (${intl.formatMessage({
                                  id:
                                      'PURCHASE.UPDATE.ITEM.SEARCH.PRODUCT_ORDER'
                              })})`
                            : ` (${intl.formatMessage({
                                  id: 'PURCHASE.UPDATE.ITEM.SEARCH.PRODUCT_ALL'
                              })})`}
                    </label>
                    {checkSearch ? (
                        <Select
                            options={orderItemOptions}
                            onInputChange={handleSearchItem}
                            onChange={handleSelectItem}
                            placeholder={intl.formatMessage({
                                id: 'GLOBAL.SEARCH.PLACEHOLER_INPUT'
                            })}
                        />
                    ) : (
                        <Select
                            options={productOption}
                            onInputChange={handleSearchProduct}
                            onChange={handleSelectItem}
                            placeholder={intl.formatMessage({
                                id: 'GLOBAL.SEARCH.PLACEHOLER_INPUT'
                            })}
                        />
                    )}
                </div>

                <div className="form-group">
                    <label>
                        <FormattedMessage id="ORDER.TRACKING" />
                    </label>
                    <Select
                        options={trackingOptions}
                        onInputChange={handleSearchTracking}
                        onChange={handleSelectTracking}
                        placeholder={intl.formatMessage({
                            id: 'GLOBAL.SEARCH.PLACEHOLER_INPUT'
                        })}
                    />
                </div>
                <div className="form-group">
                    <label>
                        <FormattedMessage id="ORDER.PRICE" />
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={values.price}
                        name="price"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>
                        <FormattedMessage id="ORDER.QUANTITY" />
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={values.quantity}
                        name="quantity"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>
                        <FormattedMessage id="ORDER.TAX_PERCENT" />
                    </label>
                    <Select
                        options={taxOptions}
                        defaultValue={taxOptions[0]}
                        placeholder={intl.formatMessage({
                            id: 'GLOBAL.SEARCH.PLACEHOLER_SELECT'
                        })}
                        onChange={handleTaxSelect}
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <button
                    type="button"
                    onClick={onHide}
                    className="btn btn-light btn-elevate"
                >
                    <FormattedMessage id="GLOBAL.BUTTON.CANCEL" />
                </button>
                <button
                    type="submit"
                    className="btn btn-primary btn-elevate"
                    onClick={handleSubmitNew}
                    disabled={!selectedProduct}
                >
                    <FormattedMessage id="GLOBAL.BUTTON.ADD" />
                </button>
            </ModalFooter>
        </Modal>
    );
}

export default DialogNewItem;
