import React from 'react';
import PropTypes from 'prop-types';

import { toAbsoluteUrl } from '_metronic/_helpers';

import SVG from 'react-inlinesvg';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import useTrans from 'helper/useTrans';

const OrderList = ({ box }) => {
    const [trans] = useTrans();

    if (!box?.owners?.length) return <div className="sfa-box-item--id">{box.id}</div>;

    return (
        <OverlayTrigger
            key={'order'}
            placement={'top'}
            overlay={
                <Tooltip className="owner-tooltip">
                    <div className="owner-list">
                        {box.owners.map((owner, ownerIdx) => (
                            <div className="owner-item" key={`owner-${ownerIdx}`}>
                                <div className="owner-obj">
                                    {owner.objectable_type === 'order' && trans("ORDER.SHIPMENT.TABLE_ID")}
                                &nbsp;{owner.objectable_id}
                                </div>
                                <div className="owner-quantity">{owner.quantity}</div>
                            </div>
                        ))}
                    </div>
                </Tooltip>
            }
        >
            <div className="sfa-box-item--id cursor-pointer">{box.id}</div>
        </OverlayTrigger>
    )
}

const AdditionalTypeOrder = ({ sfa }) => {
    return (
        <div className="sfa-list-box">
            {!!sfa?.boxes?.length && sfa.boxes.map((box) => (
                <div className="sfa-box-item" key={`box-${box.id}`}>
                    <OrderList box={box} />
                    {!!(box.duplicate - Number(box.quantity_of_owners)) ? (
                        <div className="sfa-box-item--duplicate">{box.duplicate - box.quantity_of_owners}</div>
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

AdditionalTypeOrder.propTypes = {
    sfa: PropTypes.any
};

export default AdditionalTypeOrder;