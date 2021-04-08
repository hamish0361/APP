import React from 'react';
import PropTypes from 'prop-types';
import useTrans from 'helper/useTrans';

GrBtnEdit.propTypes = {
    isEdit: PropTypes.bool,
    onSubmit: PropTypes.func,
    onEdit: PropTypes.func,
    onCancel: PropTypes.func
};

function GrBtnEdit({ isEdit, onSubmit, onEdit, onCancel }) {

    const [trans] = useTrans();

    return (
        <div>
            {isEdit ? (
                <>
                    <button
                        className="btn btn-secondary"
                        onClick={onCancel}
                    >
                        {trans("common.cancel")}
                    </button>

                    <button className="btn btn-primary ml-3" onClick={onSubmit}>
                        {trans("common.save")}
                    </button>
                </>
            ) : (
                <button className="btn btn-primary" onClick={onEdit}>
                    {trans("common.edit")}
                </button>
            )}
        </div>
    );
}

export default GrBtnEdit;
