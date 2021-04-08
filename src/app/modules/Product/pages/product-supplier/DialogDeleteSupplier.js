import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteSupplier,
    fetchSupplier
} from '../../product-redux/supplierSlice';
import Loading from 'app/components/Loading';
import { dialog } from 'app/components/DialogNotify';

DialogDeleteSupplier.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    id: PropTypes.string
};

function DialogDeleteSupplier({ id = '', show = false, onHide = null, intl }) {
    const dispatch = useDispatch();
    const suppliers = useSelector(state => state.product.supplier);
    const { isActionLoading } = suppliers;

    const handleDelete = () => {
        dispatch(deleteSupplier(id)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DELETE.SUPPLIER.SUCCESS'
                    })}`
                );
                dispatch(fetchSupplier());
                onHide();
            } else {
                dialog.error(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DELETE.SUPPLIER.FAIL'
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
                        id: 'PRODUCT.DELETE.SUPPLIER.TITLE'
                    })}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>
                    {' '}
                    {intl.formatMessage({
                        id: 'PRODUCT.DELETE.SUPPLIER.BODY'
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
                            id: 'GLOBAL.BUTTON.DELETE'
                        })}
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default DialogDeleteSupplier;
