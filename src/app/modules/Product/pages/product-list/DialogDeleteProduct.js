import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, deleteProduct } from '../../product-redux/productSlice';
import Loading from 'app/components/Loading';
import { dialog } from 'app/components/DialogNotify';

DialogDeleteProduct.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    id: PropTypes.string
};

function DialogDeleteProduct({ id = '', show = false, onHide = null, intl }) {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.list);
    const { isActionLoading } = products;
    const bodyFetch = {
        with: 'origin;suppliers;unit;tax;package',
        page: 1,
        search: '',
        orderBy: 'updated_at',
        sortedBy: 'desc'
    };

    const handleDelete = () => {
        dispatch(deleteProduct(id)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DELETE.DIALOG_SUCCESS'
                    })}`
                );
                dispatch(fetchProduct(bodyFetch));
            } else {
                dialog.error(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DELETE.DIALOG_ERROR'
                    })}`
                );
            }
            onHide();
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
                        id: 'PRODUCT.DELETE.TITLE'
                    })}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>
                    {intl.formatMessage({
                        id: 'PRODUCT.DELETE.BODY'
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

export default DialogDeleteProduct;
