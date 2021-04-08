import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import Loading from 'app/components/Loading';
import { dialog } from 'app/components/DialogNotify';
import { fecthProductId } from 'app/modules/Product/product-redux/productSlice';
import { deletePackage } from 'app/modules/Product/product-redux/packageSlice';
import { injectIntl } from 'react-intl';

DialogDeletePackage.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    id: PropTypes.string
};

function DialogDeletePackage({ id = '', show = false, onHide = null, intl }) {
    const dispatch = useDispatch();
    // const history = useHistory();
    const packages = useSelector(state => state.product.package);
    const { isActionLoading } = packages;
    const bodyFetchById = {
        id: id,
        params: {
            with: 'origin;suppliers;unit;tax;package'
        }
    };

    const handleDelete = () => {
        dispatch(deletePackage(id)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DETAIL.DELETE_PACKAGE.DIALOG_SUCCESS'
                    })}`
                );
                dispatch(fecthProductId(bodyFetchById));
                onHide();
            } else {
                dialog.error(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DETAIL.DELETE_PACKAGE.DIALOG_ERROR'
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
                        id: 'PRODUCT.DELETE_PACKAGE.TITLE'
                    })}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>
                    {' '}
                    {intl.formatMessage({
                        id: 'PRODUCT.DELETE_PACKAGE.BODY'
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

export default injectIntl(connect(null, null)(DialogDeletePackage));
