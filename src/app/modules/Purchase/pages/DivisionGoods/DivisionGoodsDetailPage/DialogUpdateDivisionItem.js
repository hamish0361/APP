import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import {
    Form,
    FormGroup,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';

DialogUpdateDivisionItem.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    onUpdate: PropTypes.func,
    itemDetail: PropTypes.object,
    quantity: PropTypes.number
};

function DialogUpdateDivisionItem({
    show,
    onHide,
    onUpdate,
    itemDetail,
    intl,
    quantity
}) {
    const { register, handleSubmit } = useForm();

    const handleUpdateItem = data => {
        const params = {
            id: itemDetail.id,
            body: {
                price: data.price,
                quantity: data.quantity
            }
        };
        onUpdate(params);
    };

    return (
        <Modal isOpen={show} style={{ minWidth: '850px' }}>
            <ModalHeader>
                <FormattedMessage id="PURCHASE.UPDATE.ITEM.TITLE" />
            </ModalHeader>
            <ModalBody>
                <p className="font-size-h6 font-weight-bolder opacity-80">
                    <FormattedMessage id="ORDER.ID" />:{' '}
                    {itemDetail?.order_product_id || ''}
                </p>
                <p className="font-size-h6 font-weight-bolder opacity-80">
                    <FormattedMessage id="PURCHASE.DIVISION.ITEM.QUANTITY_ORDER" />
                    : {quantity}
                </p>
                {/* begin form */}
                <Form
                    onSubmit={handleSubmit(handleUpdateItem)}
                    id="form-update-item"
                >
                    <FormGroup className="row">
                        <div className="col-6">
                            <Label>
                                <FormattedMessage id="ORDER.PRICE" />
                            </Label>
                            <input
                                ref={register}
                                name="price"
                                type="number"
                                min="1"
                                className="form-control"
                                defaultValue={itemDetail?.price}
                                placeholder={intl.formatMessage({
                                    id: 'GLOBAL.PLACEHOLER.INPUT'
                                })}
                            />
                        </div>
                        <div className="col-6">
                            <Label>
                                <FormattedMessage id="ORDER.QUANTITY" />
                            </Label>
                            <input
                                ref={register}
                                name="quantity"
                                type="number"
                                min="1"
                                className="form-control"
                                defaultValue={itemDetail?.quantity}
                                placeholder={intl.formatMessage({
                                    id: 'GLOBAL.PLACEHOLER.INPUT'
                                })}
                            />
                        </div>
                    </FormGroup>
                </Form>
                {/* end form */}
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
                    form="form-update-item"
                    className="btn btn-primary btn-elevate"
                >
                    <FormattedMessage id="GLOBAL.BUTTON.UPDATE" />
                </button>
            </ModalFooter>
        </Modal>
    );
}

export default DialogUpdateDivisionItem;
