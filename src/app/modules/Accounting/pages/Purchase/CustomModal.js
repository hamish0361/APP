import React from 'react';
import PropTypes from 'prop-types';
import { ModalProgressBar } from '_metronic/_partials/controls';
import { Modal } from 'react-bootstrap';

CustomModal.propTypes = {
    children: PropTypes.node.isRequired,
    show: PropTypes.bool,
    actionsLoading: PropTypes.bool,
    title: PropTypes.string,
    onHide: PropTypes.func
};

function CustomModal({
    children,
    title = '',
    show = false,
    actionsLoading = false,
    onHide = null,
    ...props
}) {
    return (
        <Modal
            onHide={onHide}
            size="lg"
            show={show}
            aria-labelledby="example-modal-sizes-title-lg"
            {...props}
        >
            <div>
                {actionsLoading && <ModalProgressBar />}
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {title}
                    </Modal.Title>
                </Modal.Header>
                {children}
            </div>
        </Modal>
    );
}

export default CustomModal;
