import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUnit, deleteUnit } from '../../product-redux/unitSlice';
import Loading from 'app/components/Loading';
import { dialog } from 'app/components/DialogNotify';

DialogDeleteUnit.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    id: PropTypes.string
};

function DialogDeleteUnit({ id = '', show = false, onHide = null, intl }) {
    const dispatch = useDispatch();
    const units = useSelector(state => state.product.unit);
    const { isActionLoading } = units;

    const handleDelete = () => {
        dispatch(deleteUnit(id)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DELETE.UNIT.SUCCESS'
                    })}`
                );
                dispatch(fetchUnit());
                onHide();
            } else {
                dialog.error(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DELETE.UNIT.FAIL'
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
                        id: 'PRODUCT.DELETE.UNIT.TITLE'
                    })}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>
                    {' '}
                    {intl.formatMessage({
                        id: 'PRODUCT.DELETE.UNIT.BODY'
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

export default DialogDeleteUnit;
