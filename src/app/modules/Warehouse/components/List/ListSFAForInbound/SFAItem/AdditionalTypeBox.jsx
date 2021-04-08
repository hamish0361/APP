import React from 'react';
import PropTypes from 'prop-types';

const AdditionalTypeBox = ({ sfa }) => {

    return (
        <div className="sfa-list-box">
            {!!sfa?.boxes?.length && sfa.boxes.map((box) => (
                <div className="sfa-box-item" key={`box-${box.id}`}>
                    <div className="sfa-box-item--id">{box.id}</div>
                    <div className="sfa-box-item--duplicate success">{box.duplicate}</div>
                </div>
            ))}
        </div>
    );
};

AdditionalTypeBox.propTypes = {
    sfa: PropTypes.any
};

export default AdditionalTypeBox;