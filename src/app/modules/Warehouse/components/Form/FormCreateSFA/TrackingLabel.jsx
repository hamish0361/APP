import React from 'react';

import { toAbsoluteUrl } from '_metronic/_helpers';
import trackingApi from 'apis/order/trackingApi';

import SVG from 'react-inlinesvg';
import { Button } from 'react-bootstrap';
import Popover from '@material-ui/core/Popover';
import { dialog } from 'app/components/DialogNotify';
import { useFormikContext } from 'formik';
import { startPrinter } from 'app/components/PrinterModal';
import { printerTemplate } from 'helper/printerTemplateData';
import useTrans from 'helper/useTrans';

const TrackingLabel = props => {

    const { setFieldValue, values } = useFormikContext();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [trans] = useTrans();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCreateTracking = () => {
        trackingApi.createTracking()
            .then((response) => {
                dialog.success(trans("warehouse.tracking.create.success"));
                setFieldValue('tracking', response.id);

                startPrinter(printerTemplate.tracking({ id: response.id, sfaQuantity: values.quantity }));

                setAnchorEl(null);
            })
            .catch(() => {
                dialog.error(trans("warehouse.tracking.create.failure"));
            })
    }


    return (
        <div className="tracking-label">
           {trans("ORDER.CODE_TRACKING")}

            <Button variant="link" onClick={handleClick} className="p-0">
                <SVG
                    src={toAbsoluteUrl(
                        '/media/svg/icons/Code/Info-circle.svg'
                    )}
                ></SVG>
            </Button>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <div className="p-3">
                    {trans("warehouse.tracking.no_code")} <Button variant="link" onClick={handleCreateTracking}>{trans("warehouse.tracking.create.title")}</Button>
                </div>
            </Popover>
        </div>
    );
};

TrackingLabel.propTypes = {

};

export default TrackingLabel;