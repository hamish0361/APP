import React, { useCallback, useEffect, useState } from 'react';

import useTrans from 'helper/useTrans';
import _ from 'lodash';
import trackingApi from 'apis/order/trackingApi';
import { withStyles } from '@material-ui/core/styles';

import { BarcodeInput } from '_metronic/_partials/controls';
import Tooltip from '@material-ui/core/Tooltip';
import getShipmentMethodFromTrackingInfo from 'helper/getShipmentMethodFromTrackingInfo';

const trackingCodeFormatter = (v) => {
    return v.replace(/^A/, '').replace(/A$/, '');
}

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        background: 'rgba(83, 196, 26, .9)',
        color: '#fff',
        fontSize: 14,
        borderRadius: 0
    },
}))(Tooltip);

const TrackingInput = props => {

    const [sugestionShipment, setSuggestionShipment] = useState();
    const { field } = props;
    const [isScanTracking, setIsScanTracking] = useState(false); // eslint-disable-line
    const [trans] = useTrans();
    const open = Boolean(sugestionShipment);

    useEffect(() => {
        callApiCheckTracking(field.value);
    }, [field.value]); // eslint-disable-line

    // eslint-disable-next-line
    const callApiCheckTracking = useCallback(_.debounce((v) => {

        if (!v?.length) return;

        trackingApi.fetchTrackingById(v, { with: 'orders' })
            .then((trackingObj) => {
                const shipmentMethodId = getShipmentMethodFromTrackingInfo(trackingObj);
                
                if (shipmentMethodId) {
                    setSuggestionShipment(shipmentMethodId);
                }
            })
            .catch((err) => {
                console.error(err);
                setSuggestionShipment(undefined);
            })
    }, 700), []);

    const handleGetDataFromScan = () => {
        setIsScanTracking(true);
    }

    const handleKeypressInput = () => {
        setIsScanTracking(false);
    }

    return (
        <div className="tracking-input normal-input">

            <HtmlTooltip
                open={open}
                title={trans("warehouse.shipment_method.suggest", { shipment_method_name: sugestionShipment })}
                placement="top"
            >
                <div></div>
            </HtmlTooltip>

            <BarcodeInput
                {...props}
                formatter={trackingCodeFormatter}
                onScan={handleGetDataFromScan}
                onKeyPress={handleKeypressInput}
            />
        </div>
    );
};

TrackingInput.propTypes = {

};

export default TrackingInput;