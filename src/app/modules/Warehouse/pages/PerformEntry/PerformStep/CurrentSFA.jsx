import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import clsx from 'clsx';
import useTrans from 'helper/useTrans';
import { toAbsoluteUrl } from '_metronic/_helpers';

import SVG from 'react-inlinesvg';
import EditSFA from './EditSFA';
import DropdownButton from 'app/components/DropdownButton';
import EditReceipt from './EditReceipt';
import ShowTrackingBarcode from './ShowTrackingBarcode';

import './CurrentSFA.scss';
import NeedPermission from 'app/components/NeedPermission';

const CurrentSFA = props => {

    const [showExtraPanel, setShowExtraPanel] = useState(false);
    const [extraPanelContent, setExtraPanelContent] = useState();
    const { data: sfa } = useSelector(state => state.warehouse.sfa.detail);
    const params = useParams();
    const [trans] = useTrans();

    const toggleFormEdit = () => {
        setExtraPanelContent('form-edit');

        if (showExtraPanel) {
            if (extraPanelContent === 'form-edit') setShowExtraPanel(false);
        } else {
            setShowExtraPanel(true);
        }
    }

    const toggleReceiptEdit = () => {
        setExtraPanelContent('receipt');

        if (showExtraPanel) {
            if (extraPanelContent === 'receipt') setShowExtraPanel(false);
        } else {
            setShowExtraPanel(true);
        }
    }

    const toggleTrackingBarcode = () => {
        setExtraPanelContent('tracking-barcode');

        if (showExtraPanel) {
            if (extraPanelContent === 'tracking-barcode') setShowExtraPanel(false);
        } else {
            setShowExtraPanel(true);
        }
    }

    if (!params?.sfa_id) return <></>;

    return (
        <div className="current-sfa-container">
            <div className="d-flex align-items-center">
                <div className="current-sfa position-relative">
                    <div className="current-sfa-id">{sfa?.id ? `${trans("warehouse.sfa.title")}: ${sfa?.id}` : ''}</div>
                    <div className="current-sfa-tracking">{sfa?.tracking ? `${trans("warehouse.tracking.title")}: ${sfa?.tracking}` : ''}</div>
                    <div className="current-sfa-quantity">{sfa?.quantity ? `${trans("common.quantity")}: ${sfa?.quantity}` : ''}</div>
                    <div className="current-sfa-created-at">{sfa?.created_at ? `${trans("common.created_at")}: ${sfa?.created_at}` : ''}</div>
                </div>

                <div className="action-edit-sfa">
                    <DropdownButton title={(
                        <SVG
                            src={toAbsoluteUrl(
                                '/media/svg/icons/Text/Menu.svg'
                            )}
                        ></SVG>
                    )} className="svg-icon svg-icon-primary svg-icon-2x text-primary">

                        <DropdownButton.Item onClick={toggleTrackingBarcode}>
                            <div className="d-flex align-items-center">
                                <span className="svg-icon svg-icon-primary mr-3">
                                    <SVG
                                        src={toAbsoluteUrl(
                                            '/media/svg/icons/Shopping/Barcode.svg'
                                        )}
                                    ></SVG>
                                </span>

                                <span>{trans("warehouse.tracking.id")}</span>
                            </div>
                        </DropdownButton.Item>

                        {!!sfa && (
                            <>
                                <NeedPermission need={"sfas.update"}>
                                    <DropdownButton.Item onClick={toggleFormEdit}>
                                        <div className="d-flex align-items-center">
                                            <span className="svg-icon svg-icon-primary mr-3">
                                                <SVG
                                                    src={toAbsoluteUrl(
                                                        '/media/svg/icons/Design/Edit.svg'
                                                    )}
                                                ></SVG>
                                            </span>

                                            <span>{trans("warehouse.sfa.edit_info")}</span>
                                        </div>
                                    </DropdownButton.Item>
                                </NeedPermission>

                                <NeedPermission need={['receipts.create', 'receipts.update', 'receipts.delete', 'receipt.index']}>
                                    <DropdownButton.Item onClick={toggleReceiptEdit}>
                                        <div className="d-flex align-items-center">
                                            <span className="svg-icon svg-icon-primary mr-3">
                                                <SVG
                                                    src={toAbsoluteUrl(
                                                        '/media/svg/icons/Files/Uploaded-file.svg'
                                                    )}
                                                ></SVG>
                                            </span>

                                            <span>{trans("warehouse.receipt.save")}</span>
                                        </div>
                                    </DropdownButton.Item>
                                </NeedPermission>
                            </>
                        )}
                    </DropdownButton>
                </div>
            </div>

            <div className={clsx("form-edit-sfa-section", showExtraPanel ? 'show' : 'hide')}>
                <div className="form-edit-sfa-wrapper">
                    {extraPanelContent === 'form-edit' && (<EditSFA closeSection={toggleFormEdit} />)}
                    {extraPanelContent === 'receipt' && (<EditReceipt closeSection={toggleReceiptEdit} />)}
                    {extraPanelContent === 'tracking-barcode' && (<ShowTrackingBarcode closeSection={toggleTrackingBarcode} />)}
                </div>
            </div>
        </div>
    );
};

CurrentSFA.propTypes = {

};

export default CurrentSFA;