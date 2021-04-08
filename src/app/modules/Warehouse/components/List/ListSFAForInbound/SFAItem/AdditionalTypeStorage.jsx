import React from 'react';
import PropTypes from 'prop-types';

import { toAbsoluteUrl } from '_metronic/_helpers';

import SVG from 'react-inlinesvg';

const AdditionalTypeStorage = ({ sfa }) => {

    return (
        <div className="sfa-list-box">
            {!!sfa?.boxes?.length && sfa.boxes.map((box) => (
                <div className="sfa-box-item" key={`box-${box.id}`}>
                    <div className="sfa-box-item--id">{box.id}</div>
                    {!!box.quantity_available_in_pallet ? (
                        <div className="sfa-box-item--duplicate">{box.quantity_available_in_pallet}</div>
                    ) : (
                        <span className="svg-icon svg-icon-success">
                            <SVG
                                src={toAbsoluteUrl(
                                    '/media/svg/icons/Navigation/Double-check.svg'
                                )}
                            ></SVG>
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};

AdditionalTypeStorage.propTypes = {
    sfa: PropTypes.any
};

export default AdditionalTypeStorage;