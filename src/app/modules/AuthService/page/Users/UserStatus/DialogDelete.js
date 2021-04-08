import CustomDialogConfirm from 'app/components/CustomDialogConfirm';
import { dialog } from 'app/components/DialogNotify';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteUserStatus } from '../../../auth-service-redux/userSlice';
function DialogDelete({ id = '', show = false, onHide = null }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = () => {
        dispatch(deleteUserStatus(id)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success('Xoá trạngt thái thành công');
            } else {
                dialog.error('Xoá trạngt thái thất bại');
            }
            history.push('/auth-service/users#tab_status');
        });
    };

    return (
        <CustomDialogConfirm
            title="User Status Delete"
            content="User Status is deleting..."
            show={show}
            onHide={onHide}
            onDelete={handleDelete}
        />
    );
}

export default DialogDelete;

DialogDelete.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    id: PropTypes.string
};
