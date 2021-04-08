import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import CustomDialogConfirm from 'app/components/CustomDialogConfirm';

const ModalConfirmDelete = ({ id, show, onConfirmed, title }) => {
    const history = useHistory();

    const onDelete = () => {
        onConfirmed && onConfirmed(id);
        history.goBack();
    };

    return (
        <CustomDialogConfirm
            show={show}
            onHide={() => history.goBack()}
            onDelete={onDelete}
            title={title}
        />
    );
};

ModalConfirmDelete.propTypes = {
    onConfirmed: PropTypes.func,
    show: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string
};

export default ModalConfirmDelete;
