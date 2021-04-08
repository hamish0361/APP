import { dialog } from 'app/components/DialogNotify';
import formatNumber from 'helper/formatNumber';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { shallowEqual, useSelector } from 'react-redux';
import Select from 'react-select';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

DialogDivision.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    onDivision: PropTypes.func,
    itemDetail: PropTypes.object,
    onSearchOrderProduct: PropTypes.func,
    itemId: PropTypes.string
};

function DialogDivision({
    show,
    onHide,
    onDivision,
    onSearchOrderProduct,
    intl,
    itemId = ''
}) {
    const { itemList } = useSelector(
        ({ order }) => ({
            itemList: order.item.itemList
        }),
        shallowEqual
    );
    const { register, handleSubmit } = useForm({});
    const [values, setValues] = useState({
        id_order: '',
        quantity: 0,
        order_product_id: ''
    });

    useEffect(() => {
        if (show) {
            setValues({
                id_order: '',
                order_product_id: '',
                quantity: 0
            });
        }
    }, [show]);

    const onSubmit = data => {
        const params = {
            purchase_product_id: itemId,
            order_product_id: values.order_product_id,
            quantity: data.quantity,
            price: data.price
        };

        if (data.quantity <= 0 || data.price <= 0) {
            dialog.warning(
                intl.formatMessage({
                    id: 'PURCHASE.ITEM.DIVISION_GOODS.WARNING'
                })
            );
        } else if (data.quantity > values.quantity) {
            dialog.warning(
                intl.formatMessage({
                    id: 'PURCHASE.ITEM.DIVISION_GOODS.QUANTITY.WARNING'
                })
            );
        } else {
            onDivision(params);
        }
    };

    const orderOptions = itemList?.map(item => {
        return {
            value: item.id,
            label: item.order_id,
            quantity: item.quantity
        };
    });

    //select customer and check duplicate division of good(item)
    const handleSelectCustomer = customerSelected => {
        setValues({
            ...values,
            id_order: customerSelected.label,
            quantity: customerSelected.quantity,
            order_product_id: customerSelected.value
        });
    };

    //select customer handle search and câl api
    const customerRef = useRef(null);
    const handleSearchCustomer = value => {
        if (customerRef.current) {
            clearTimeout(customerRef.current);
        }
        //SET TIMEOUT AND SET TYPE WHEN SEARCH
        customerRef.current = setTimeout(() => {
            const params = {
                value,
                type: 'order_id'
            };
            if (value.length > 0 && onSearchOrderProduct)
                onSearchOrderProduct(params);
        }, 500);
    };

    return (
        <Modal
            isOpen={show}
            style={{ maxWidth: '850px' }}
            title={intl.formatMessage({ id: 'PURCHASE.DIVISION.ITEM.TITLE' })}
        >
            <ModalHeader>
                <FormattedMessage id="PURCHASE.DIVISION.ITEM.TITLE" />
            </ModalHeader>
            <ModalBody>
                <div className="align-item-center">
                    <div className="d-fex justify-content-between align-items-center">
                        <span className="order-title">
                            {intl.formatMessage({
                                id: 'PURCHASE.DIVISION.ITEM.ORDER.TITLE'
                            })}
                        </span>
                    </div>

                    <Select
                        placeholder={intl.formatMessage({
                            id: 'GLOBAL.SEARCH.PLACEHOLER_INPUT'
                        })}
                        options={orderOptions}
                        onInputChange={handleSearchCustomer}
                        onChange={handleSelectCustomer}
                    />
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group align-items-center mt-4">
                                <div>
                                    <span className="order-title">
                                        {intl.formatMessage({
                                            id: 'TRACKING.ORDER_ID'
                                        })}
                                    </span>
                                </div>
                                <div>
                                    <span className="form-control bg-light ">
                                        {values.id_order}
                                    </span>
                                </div>
                            </div>
                            <div className="form-group align-items-center mt-4">
                                <div>
                                    <span className="order-title">
                                        {intl.formatMessage({
                                            id:
                                                'PURCHASE.DIVISION.ITEM.QUANTITY_ORDER'
                                        })}
                                    </span>
                                </div>
                                <div>
                                    <span className="form-control bg-light ">
                                        {formatNumber(values.quantity)}
                                    </span>
                                </div>
                            </div>
                            <div className="form-group align-items-center">
                                <>
                                    <div>
                                        <span className="order-title">
                                            {intl.formatMessage({
                                                id:
                                                    'PURCHASE.DIVISION.ITEM.QUANTITY_DIVISION'
                                            })}
                                        </span>
                                    </div>
                                    <div>
                                        <input
                                            className="form-control"
                                            name="quantity"
                                            type="number"
                                            ref={register}
                                            placeholder={intl.formatMessage({
                                                id:
                                                    'PURCHASE.DIVISION.ITEM.QUANTITY.PLACEHOLDER'
                                            })}
                                        />
                                    </div>
                                </>
                            </div>
                            <div className="form-group align-items-center">
                                <>
                                    <div>
                                        <span className="order-title">
                                            {intl.formatMessage({
                                                id:
                                                    'PURCHASE.DIVISIOM.ITEM.PRICE'
                                            })}
                                        </span>
                                    </div>
                                    <div>
                                        <input
                                            className="form-control"
                                            name="price"
                                            type="number"
                                            ref={register}
                                            placeholder={intl.formatMessage({
                                                id:
                                                    'PURCHASE.DIVISIOM.ITEM.PRICE.PLACEHOLDER'
                                            })}
                                        />
                                    </div>
                                </>
                            </div>
                        </form>
                    </div>
                    {/* end form */}
                </div>
            </ModalBody>
            <ModalFooter>
                <button
                    style={{ minWidth: '100px' }}
                    type="button"
                    onClick={onHide}
                    className="btn btn-light btn-elevate"
                >
                    <FormattedMessage id="GLOBAL.BUTTON.CANCEL" />
                </button>
                <button
                    type="submit"
                    form="form-update"
                    className="btn btn-primary btn-elevate"
                    onClick={handleSubmit(onSubmit)}
                    disabled={!values.id_order}
                >
                    <FormattedMessage id="GLOBAL.DIVISION.OF.GOOD" />
                </button>
            </ModalFooter>
        </Modal>
    );
}

export default DialogDivision;
