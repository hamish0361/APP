import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { settingsAction } from 'app/modules/Warehouse/warehouse-redux/settingSlice';
import _ from 'lodash';
import { printerSocketConfig } from 'config/printerSocket';

import { dialog } from 'app/components/DialogNotify';

import './index.scss';
import useTrans from 'helper/useTrans';

const PrinterSettings = props => {

    const [ipServer, setIPServer] = useState();
    const [loading, setLoading] = useState(false);
    const defaultIPServer = useSelector(
        state => state.warehouse.settings.printer.socketServer
    );

    const dispatch = useDispatch();
    const [trans] = useTrans();

    useEffect(() => {
        setIPServer(defaultIPServer);
    }, []); // eslint-disable-line

    useEffect(() => {
        if (ipServer && ipServer !== defaultIPServer) dispatchValueToRedux(ipServer);
    }, [ipServer, defaultIPServer]); // eslint-disable-line

    const handleChangeInput = (e) => {
        setIPServer(e.target.value);
    }

    const handleTryToConnect = () => {
        setLoading(true);

        const websocket = new WebSocket(ipServer + '?encoding=text', printerSocketConfig);

        websocket.onopen = function (evt) {
            setLoading(false);
            dialog.success(trans("printer.connect_success"));
            websocket.close();
        };

        websocket.onerror = function (evt) {
            setLoading(false);
            dialog.error(trans("printer.connect_failure_x_ip", { ip: ipServer }));
            websocket.close();
        };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const dispatchValueToRedux = useCallback(_.debounce(v => {
        dispatch(settingsAction.changePrinterSocketServer(v));
    }, 700), []); // eslint-disable-line

    return (
        <div className="row printer-settings mt-5">
            <div className="col-lg-4 custom-label">{trans("warehouse.settings.default_ip_server")}:</div>
            <div className="col-lg-6 d-flex">
                <input
                    value={ipServer || ''}
                    onChange={handleChangeInput}
                    className="form-control"
                />

                <button className="btn btn-primary ml-3" onClick={handleTryToConnect} disabled={loading}>{trans("printer.connect")}</button>
            </div>
        </div>
    );
};

PrinterSettings.propTypes = {

};

export default PrinterSettings;