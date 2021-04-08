import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import Loading from './Loading';

CustomDialogConfirm.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    onDelete: PropTypes.func,
    title: PropTypes.string,
    content: PropTypes.string,
    isLoading: PropTypes.bool
};

function CustomDialogConfirm({
    show = false,
    onHide = null,
    onDelete = null,
    title = 'Confirm Delete',
    content = 'Are you sure?',
    isLoading = false
}) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            {/*begin::Loading*/}
            {isLoading && <Loading />}
            {/*end::Loading*/}
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>{content}</span>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <button
                        type="button"
                        onClick={onHide}
                        className="btn btn-light btn-elevate"
                    >
                        <FormattedMessage id="GLOBAL.BUTTON.CANCEL" />
                    </button>
                    <> </>
                    <button
                        type="button"
                        onClick={onDelete}
                        className="btn btn-primary btn-elevate"
                    >
                        <FormattedMessage id="GLOBAL.BUTTON.DELETE" />
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default CustomDialogConfirm;
