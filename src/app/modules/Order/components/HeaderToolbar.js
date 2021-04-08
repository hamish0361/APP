import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

HeaderToolbar.propTypes = {
    onEdit: PropTypes.func,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    isEdit: PropTypes.bool
};

function HeaderToolbar({ isEdit = true, onEdit, onSave, onCancel }) {
    return (
        <>
            {isEdit ? (
                <Button
                    style={{ width: '100px' }}
                    type="button"
                    className="btn btn-primary"
                    onClick={onEdit}
                >
                    Edit
                </Button>
            ) : (
                <>
                    <Button
                        style={{ width: '100px' }}
                        type="button"
                        className="btn btn-light"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{ width: '100px' }}
                        type="button"
                        className="btn btn-primary ml-2"
                        onClick={onSave}
                    >
                        Save
                    </Button>
                </>
            )}
        </>
    );
}

export default HeaderToolbar;
