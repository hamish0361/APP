import CustomDialogConfirm from 'app/components/CustomDialogConfirm';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteTracking, fetchTracking } from '../../redux/trackingSlice';
import { dialog } from 'app/components/DialogNotify';

DialogDelete.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    id: PropTypes.string
};

function DialogDelete({ id = '', show = false, onHide = null, intl }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const tracking = useSelector(state => state.purchase.tracking);
    const { isActionLoading } = tracking;

    const handleDelete = () => {
        dispatch(deleteTracking(id)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    intl.formatMessage({ id: 'TRACKING.DELETE.SUCCESS' })
                );
                dispatch(fetchTracking());
            } else {
                dialog.error(
                    intl.formatMessage({ id: 'TRACKING.DELETE.FAIL' })
                );
            }
            history.push('/mua-hang/tracking');
        });
    };

    return (
        <CustomDialogConfirm
            title={intl.formatMessage({ id: 'TRACKING.DELETE.TITLE' })}
            content={intl.formatMessage({ id: 'TRACKING.DELETE.CONFIRM' })}
            show={show}
            onHide={onHide}
            onDelete={handleDelete}
            isLoading={isActionLoading}
        />
    );
}

export default DialogDelete;
