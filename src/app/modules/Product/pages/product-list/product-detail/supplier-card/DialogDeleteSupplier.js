import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    fecthProductId,
    deleteSupplierProduct
} from 'app/modules/Product/product-redux/productSlice';
import Loading from 'app/components/Loading';
import { dialog } from 'app/components/DialogNotify';
import { injectIntl } from 'react-intl';

DialogDeleteSupplier.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    id: PropTypes.string
};

function DialogDeleteSupplier({
    id = '',
    idSupplier = '',
    show = false,
    onHide = null,
    intl
}) {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product.list);
    const { isActionLoading } = product;

    const bodyFetchById = {
        id: id,
        params: {
            with: 'origin;suppliers;unit;tax;package'
        }
    };

    const handleDelete = () => {
        const items = ['suppliers', +idSupplier];
        const body = {
            id: id,
            params: {
                action: 'detach',
                params: JSON.stringify(items)
            }
        };
        dispatch(deleteSupplierProduct(body)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DETAIL.DELETE.DIALOG_SUCCESS'
                    })}`
                );
                dispatch(fecthProductId(bodyFetchById));
                onHide();
            } else {
                dialog.error(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DETAIL.DELETE.DIALOG_ERROR'
                    })}`
                );
            }
        });
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            {/*begin::Loading*/}
            {isActionLoading && <Loading />}
            {/*end::Loading*/}
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    {intl.formatMessage({
                        id: 'PRODUCT.DELETE_SUPPLIER.TITLE'
                    })}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>
                    {' '}
                    {intl.formatMessage({
                        id: 'PRODUCT.DELETE_SUPPLIER.BODY'
                    })}
                </span>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <button
                        type="button"
                        onClick={onHide}
                        className="btn btn-light btn-elevate"
                    >
                        {intl.formatMessage({
                            id: 'GLOBAL.BUTTON.CANCEL'
                        })}
                    </button>
                    <> </>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="btn btn-primary btn-elevate"
                    >
                        {intl.formatMessage({
                            id: 'GLOBAL.BUTTON.SAVE'
                        })}
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default injectIntl(connect(null, null)(DialogDeleteSupplier));
