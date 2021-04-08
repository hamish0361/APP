import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTax, deleteTax } from '../../product-redux/taxSlice';
import Loading from 'app/components/Loading';
import { dialog } from 'app/components/DialogNotify';

DialogDeleteOrigin.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    id: PropTypes.string
};

function DialogDeleteOrigin({ id = '', show = false, onHide = null, intl }) {
    const dispatch = useDispatch();
    const taxs = useSelector(state => state.product.tax);
    const { isActionLoading } = taxs;

    const handleDelete = () => {
        dispatch(deleteTax(id)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DELETE.TAX.SUCCESS'
                    })}`
                );
                dispatch(fetchTax());
                onHide();
            } else {
                dialog.error(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DELETE.TAX.FAIL'
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
            {isActionLoading && <Loading />}
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    {intl.formatMessage({
                        id: 'PRODUCT.DELETE.TAX.TITLE'
                    })}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>
                    {intl.formatMessage({
                        id: 'PRODUCT.DELETE.TAX.BODY'
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

export default DialogDeleteOrigin;
