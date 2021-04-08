import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import CustomModal from 'app/components/CustomModal';
import { Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { dialog } from 'app/components/DialogNotify';

DialogAddItem.propTypes = {
    onHide: PropTypes.func,
    show: PropTypes.bool,
    productList: PropTypes.array,
    onSearchProduct: PropTypes.func,
    taxList: PropTypes.array,
    onAddItem: PropTypes.func,
    idOrder: PropTypes.string
};

function DialogAddItem({
    show = false,
    onHide = null,
    intl,
    productList = [],
    onSearchProduct = null,
    taxList = [],
    onAddItem,
    idOrder
}) {
    const { register, handleSubmit } = useForm();

    // product
    const optionsProduct = productList.map(item => {
        return {
            value: item.id,
            label: item.name,
            price: item.price
        };
    });

    const [values, setValues] = useState({
        typeSearchProduct: 'name',
        productSelected: null,
        box: null,
        tax: null
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
    };

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

    const handleSelectBox = boxSelected => {
        setValues({
            ...values,
            box: boxSelected.value
        });
    };

    const taxOptions = taxList.map(item => {
        return {
            value: item.id,
            label: item.name
        };
    });

    const handleSelectTax = taxSelected => {
        setValues({
            ...values,
            tax: taxSelected
        });
    };

    const onSubmit = data => {
        const taxStr = values.tax?.label || taxOptions[0].label;
        const tax = taxStr.slice(0, -1);
        const params = {
            product_id: values.productSelected?.value || '',
            price: values.productSelected?.price || '',
            is_box: values.box?.value || boxOptions[0].value,
            tax: tax,
            quantity: data.quantity,
            noteProduct: data.noteProduct,
            property: data.property,
            order_id: idOrder
        };
        if (data.quantity < 1) {
            dialog.warning(
                intl.formatMessage({ id: 'PURCHASE.CREATE.ITEM.WARNING2' })
            );
        } else if (onAddItem) {
            onAddItem(params);
        }
    };

    useEffect(() => {
        if (!show) {
            setValues({
                ...values,
                productSelected: null
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CustomModal
                    show={show}
                    title={intl.formatMessage({
                        id: 'ADD.ITEM.TITLE'
                    })}
                    onHide={onHide}
                >
                    <Modal.Body className="overlay overlay-block cursor-default">
                        <div className="form-group row align-items-center">
                            <div className="col-md-4">
                                <h4 className=" ">
                                    <FormattedMessage id="ORDER.PRODUCT_INFO" />
                                </h4>
                            </div>
                            <div className="col-md-8">
                                <Select
                                    placeholder={intl.formatMessage({
                                        id: 'GLOBAL.SEARCH.PLACEHOLER_INPUT'
                                    })}
                                    options={optionsProduct}
                                    onInputChange={handleSearchProduct}
                                    onChange={handleSelectProduct}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-3">
                                <label>
                                    <FormattedMessage id="ORDER.CODE" />
                                </label>
                            </div>
                            <div className="col-md-9">
                                <div className="form-control bg-light">
                                    {values.productSelected?.value}
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
                                    {values.productSelected?.label}
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
                                    {values.productSelected?.price}
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
                                <input
                                    type="number"
                                    className="form-control"
                                    name="quantity"
                                    ref={register}
                                    max="100"
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
                                <input
                                    className="form-control"
                                    name="property"
                                    ref={register}
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
                                    placeholder={intl.formatMessage({
                                        id: 'GLOBAL.PLACEHOLER.SELECT'
                                    })}
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
                                <input
                                    className="form-control"
                                    name="noteProduct"
                                    ref={register}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            type="button"
                            className="btn btn-light btn-elevate modal-title font-size-h6 mt-5 text-dark"
                            onClick={onHide}
                        >
                            {intl.formatMessage({
                                id: 'GLOBAL.BUTTON.CANCEL'
                            })}
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary btn-elevate modal-title font-size-h6 mt-5 "
                            onClick={handleSubmit(onSubmit)}
                        >
                            {intl.formatMessage({
                                id: 'GLOBAL.BUTTON.ADD'
                            })}
                        </button>
                    </Modal.Footer>
                </CustomModal>
            </form>
        </div>
    );
}

export default DialogAddItem;
