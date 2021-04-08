import { Divider } from '@material-ui/core';
import { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';
import { IMAGES } from 'constant/Images';
import formatNumber from 'helper/formatNumber';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import NumberFormat from 'react-number-format';
import { connect, shallowEqual, useSelector } from 'react-redux';
import Select from 'react-select';
import {
    Form,
    FormGroup,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';

DialogUpdateItem.propTypes = {
    onHide: PropTypes.func,
    onUpdate: PropTypes.func,

    open: PropTypes.bool,
    item: PropTypes.object
};

const boxOptions = [
    { value: '1', label: 'Cái' },
    { value: '0', label: 'Thùng' }
];

function DialogUpdateItem({ onHide, onUpdate, open, item, intl }) {
    const { register, handleSubmit } = useForm();

    const [values, setValues] = useState({
        price: 0,
        quantity: 0,
        box: null,
        property: '',
        note: '',
        discount_tax_per_tax_percent: 0,
        expectedDate: new Date(),
        dueDate: new Date(),
        trackingList: [],
        code: '',
        itemDetail: null
    });

    const [taxPercent, setTaxPercent] = useState(null);

    // store
    const { taxList, isActionLoading } = useSelector(
        ({ home, purchase }) => ({
            taxList: home.home.taxList,
            isActionLoading: purchase.tracking.isActionLoading
        }),
        shallowEqual
    );

    useEffect(() => {
        if (open) {
            const taxIndex = taxOptions?.findIndex(
                x => x.percent === item.tax_percent
            );
            if (taxIndex !== -1) {
                setTaxPercent(taxOptions[taxIndex]);
            }
            setValues({
                ...values,
                price: item.price || 0,
                quantity: item.quantity || 0,
                box: {
                    value: item.is_box ? '1' : '0',
                    label: item.is_box ? 'Cái' : 'Thùng'
                },
                property: item.properties || '',
                note: item.note || '',
                trackingList: item?.trackings,
                discount_tax_per_tax_percent:
                    item.discount_tax_per_tax_percent || 0
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, item.price, item.id]);

    const handleInputChange = e => {
        const reg = /^[0-9]*$/;
        const check = reg.test(e.target.value);
        if (e.target.name === 'discount_tax_per_tax_percent' && !check) return;

        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleBoxChange = selectedBox => {
        setValues({
            ...values,
            box: selectedBox
        });
    };

    const handleTaxChange = selectedTax => {
        setTaxPercent(selectedTax);
    };

    // handle update
    const handleSubmitUpdate = data => {
        const { quantity, property, note, discount_tax_per_tax_percent } = data;
        const tax_percent = taxPercent?.percent || item.tax_percent;
        const priceNumber =
            typeof values.price === 'string' && values.price.includes(',')
                ? values.price.replace(',', '')
                : values.price;
        const params = {
            price: priceNumber,
            quantity,
            property,
            note,
            box: values.box.value,
            tax_percent,
            discount_tax_per_tax_percent: discount_tax_per_tax_percent || 0
        };
        if (!values.price) {
            dialog.warning(
                intl.formatMessage({ id: 'ORDER.UPDATE.ORDER.PRICE_REQUIRED' })
            );
        } else if (!quantity) {
            dialog.warning(
                intl.formatMessage({
                    id: 'ORDER.CREATE.WHOLESALE.QUANTITY_REQUIRED'
                })
            );
        } else if (values.discount_tax_per_tax_percent > 100) {
            dialog.warning(
                intl.formatMessage({
                    id: 'ORDER.ITEM.WARNING.LIMIT'
                })
            );
        } else {
            onUpdate(params);
        }
    };

    // options
    const taxOptions = taxList?.map(tax => {
        return {
            value: tax.id,
            label: tax.name,
            percent: tax.percent
        };
    });
    return (
        <Modal isOpen={open} style={{ minWidth: '850px' }}>
            {isActionLoading && <Loading local={true} />}
            <ModalHeader>
                <FormattedMessage id="PURCHASE.UPDATE.ITEM.TITLE" />
            </ModalHeader>
            <ModalBody>
                {/* begin product */}
                <FormGroup className="d-flex">
                    <div className="symbol symbol-100 mr-4">
                        <img
                            style={{ objectFit: 'cover' }}
                            src={item.product?.images?.url || IMAGES.NOT_FOUND}
                            alt="product"
                        />
                    </div>
                    <div>
                        <div>
                            <h6>{item.product?.name || ''}</h6>
                        </div>
                        <div>
                            <p>{item.product_id || ''}</p>
                        </div>
                    </div>
                </FormGroup>
                {/* end product */}
                <Form
                    onSubmit={handleSubmit(handleSubmitUpdate)}
                    id="form-items-update"
                >
                    {/* begin row */}
                    <FormGroup className="row">
                        <div className="col-6">
                            <Label>
                                <FormattedMessage id="ORDER.PRICE" />
                            </Label>
                            <NumberFormat
                                name="price"
                                min="1"
                                className="form-control"
                                displayType="input"
                                thousandSeparator
                                value={values.price}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-3">
                            <Label>
                                <FormattedMessage id="ORDER.QUANTITY" />
                            </Label>
                            <input
                                ref={register}
                                type="number"
                                min="1"
                                name="quantity"
                                value={values?.quantity}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Nhập số lượng"
                            />
                        </div>
                        <div className="col-3">
                            <Label>
                                <FormattedMessage id="ORDER.FORMALITY" />
                            </Label>
                            <Select
                                options={boxOptions}
                                value={values.box}
                                onChange={handleBoxChange}
                            />
                        </div>
                    </FormGroup>
                    {/* end row */}
                    {/* begin row */}
                    <FormGroup>
                        <Label>
                            <FormattedMessage id="ORDER.PROPERTIES" />
                        </Label>
                        <input
                            ref={register}
                            type="text"
                            name="property"
                            value={values.property}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Nhập Thuộc tính"
                        />
                    </FormGroup>
                    {/* end row */}
                    {/* begin row */}
                    <FormGroup>
                        <Label>
                            <FormattedMessage id="ORDER.NOTE" />
                        </Label>
                        <input
                            ref={register}
                            type="text"
                            name="note"
                            value={values.note}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Nhập ghi chú"
                        />
                    </FormGroup>
                    {/* end row */}
                </Form>

                <Divider className="mb-8" />
                {/* begin row */}
                <FormGroup className="row">
                    <div className="col-3">
                        <Label>
                            <FormattedMessage id="ORDER.MONEY_GOODS" />
                        </Label>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {formatNumber(item.amount)}
                        </div>
                    </div>
                </FormGroup>
                {/* end row */}
                {/* begin row */}
                <FormGroup className="row">
                    <div className="col-3">
                        <Label>
                            <FormattedMessage id="ORDER.TAX_DISCOUNTS" /> (%)
                        </Label>
                    </div>
                    <div className="col-9">
                        <input
                            ref={register}
                            name="discount_tax_per_tax_percent"
                            value={values.discount_tax_per_tax_percent}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder={intl.formatMessage({
                                id: 'GLOBAL.PLACEHOLER.INPUT'
                            })}
                        />
                    </div>
                </FormGroup>
                {/* end row */}
                {/* begin row */}
                <FormGroup className="row">
                    <div className="col-3">
                        <Label>
                            <FormattedMessage id="TRACKING.TAX_PERCENT" /> (%)
                        </Label>
                    </div>
                    <div className="col-9">
                        <Select
                            options={taxOptions}
                            value={taxPercent}
                            onChange={handleTaxChange}
                            placeholder={intl.formatMessage({
                                id: 'warehouse.jancode.tax.select_title'
                            })}
                        />
                    </div>
                </FormGroup>
                {/* end row */}
                {/* begin row */}
                <FormGroup className="row">
                    <div className="col-3">
                        <Label>
                            <FormattedMessage id="TRACKING.TAX" />
                        </Label>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {formatNumber(item.tax)}
                        </div>
                    </div>
                </FormGroup>
                {/* end row */}

                {/* begin row */}
                <FormGroup className="row">
                    <div className="col-3">
                        <Label>
                            <FormattedMessage id="TRACKING.BALANCE" />
                        </Label>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {formatNumber(item.balance)}
                        </div>
                    </div>
                </FormGroup>
                {/* end row */}
            </ModalBody>
            <ModalFooter>
                <button
                    style={{ width: '100px' }}
                    type="button"
                    onClick={onHide}
                    className="btn btn-light btn-elevate"
                >
                    <FormattedMessage id="GLOBAL.BUTTON.CANCEL" />
                </button>
                <> </>
                <button
                    type="submit"
                    className="btn btn-primary btn-elevate"
                    form="form-items-update"
                >
                    <FormattedMessage id="GLOBAL.BUTTON.UPDATE" />
                </button>
            </ModalFooter>
        </Modal>
    );
}

export default injectIntl(connect(null, null)(DialogUpdateItem));
