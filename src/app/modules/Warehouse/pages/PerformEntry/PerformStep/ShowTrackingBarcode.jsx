import React from 'react';
import { useSelector } from 'react-redux';
import useTrans from 'helper/useTrans';
import Barcode from 'react-barcode';

const ShowTrackingBarcode = ({ closeSection }) => {

    const sfa = useSelector(state => state.warehouse.sfa.detail.data);
    const [trans] = useTrans();

    return (
        <div className="show-tracking-barcode">
            <div className="m-5 d-flex align-items-center justify-content-center">
                <Barcode value={sfa?.tracking || "0"} textPosition="top" height={60} />
            </div>

            <div className="mt-5 text-right">
                <button className="btn btn-secondary" onClick={closeSection}>
                    {trans("common.cancel")}
                </button>
            </div>
        </div>
    );
};

ShowTrackingBarcode.propTypes = {

};

export default ShowTrackingBarcode;