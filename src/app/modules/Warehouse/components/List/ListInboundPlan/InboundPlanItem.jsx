import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { toAbsoluteUrl } from '_metronic/_helpers';
import clsx from 'clsx';
import useTrans from 'helper/useTrans';

import SVG from 'react-inlinesvg';
import { Card, CardBody } from '_metronic/_partials/controls';

import './InboundPlanItem.scss';

const InboundPlanItem = ({ data }) => {

    const [trans] = useTrans();

    const iconUrl = useMemo(() => {
        if (data.checked) return '/media/svg/icons/Shopping/delivery-truck-shipped.svg';

        return '/media/svg/icons/Shopping/delivery-truck.svg';
    }, [data.checked]);

    if (!data?.id) return <></>;

    return (
        <Card className="inbound-plan-item position-relative">
            <CardBody>
                <div className="info-section">
                    <div className="content-wrapper">
                        <div className={clsx(data?.checked ? 'received' : 'pending', 'is-checked custom-box status-box')}>
                            {data?.checked ?
                                trans("warehouse.inbound_plan.arive_status.arrived") :
                                trans("warehouse.inbound_plan.arive_status.not_yet")
                            }
                        </div>
                        <div className="code custom-box">
                            <div className="code-label">{trans("warehouse.tracking.id")}</div>
                            <div className="code-value">{data?.id}</div>
                        </div>
                    </div>

                    <div className="absolute-container">
                        <div className={clsx("icon-wrapper", !data?.checked && "not_yet")}>
                            <SVG src={toAbsoluteUrl(iconUrl)} />
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

InboundPlanItem.propTypes = {
    data: PropTypes.any
};

export default InboundPlanItem;