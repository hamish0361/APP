import CustomDialogConfirm from 'app/components/CustomDialogConfirm';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteUser } from '../../../auth-service-redux/userSlice';
import { dialog } from 'app/components/DialogNotify';

DialogDelete.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    id: PropTypes.string
};

function DialogDelete({ id = '', show = false, onHide = null }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isActionLoading } = useSelector(state => state.authService.user);

    const handleDelete = async () => {
        dispatch(deleteUser(id)).then(function (res) {
            if (res.type.includes('fulfilled')) {
                dialog.success('Delete user success');
            } else {
                dialog.error(res.payload || 'Delete user failed');
            }
            history.push('/auth-service/users');
        });
    };

    return (
        <CustomDialogConfirm
            title="User Delete"
            content="User is deleting..."
            show={show}
            onHide={onHide}
            onDelete={handleDelete}
            isLoading={isActionLoading}
        />
    );
}

export default DialogDelete;
