import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { toAbsoluteUrl } from '_metronic/_helpers';
import formatNumber from 'helper/formatNumber';
import useTrans from 'helper/useTrans';

import SVG from 'react-inlinesvg';
import Barcode from 'react-barcode';
import { Card, CardBody } from '_metronic/_partials/controls';
import { Button } from 'react-bootstrap';

import './index.scss';
import NeedPermission from 'app/components/NeedPermission';

const CurrentBox = props => {
    const currentBox = useSelector(state => state.warehouse.box.detail.data);
    const history = useHistory();
    const match = useRouteMatch();
    const [trans] = useTrans();

    const handleEditBox = () => {
        history.push(`${match.url}/edit-box`);
    }

    const handleCreateNewBox = () => {
        history.push(`${match.url}/create-box`);
    }

    const totalItems = useMemo(() => {
        if (!currentBox || !currentBox?.items?.length) return 0;

        return currentBox.items.reduce((prevV, curV) => {
            return prevV + curV.quantity;
        }, 0);
    }, [currentBox]);

    return (
        <Card className="current-box-section">
            <CardBody>
                <div className="current-box-section__content">
                    <div className="info-section">
                        <div className="icon-section">
                            <SVG
                                src={toAbsoluteUrl(
                                    '/media/svg/icons/Shopping/Box4.svg'
                                )}
                            ></SVG>
                            <div className="bar-code">
                                <Barcode value={currentBox?.id || "0"} textPosition="top" height={40} />
                            </div>
                        </div>

                        <div className="content-section">
                            <div className="box-info row">
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <span className="title">{trans("common.width")}:</span> {formatNumber(currentBox?.width)}
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <span className="title">{trans("common.height")}:</span> {formatNumber(currentBox?.height)}
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <span className="title">{trans("common.length")}:</span> {formatNumber(currentBox?.length)}
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <span className="title">{trans("common.weight")}:</span> {formatNumber(currentBox?.weight_per_box)}
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <span className="title">{trans("common.volume")}:</span> {formatNumber(currentBox?.volume_per_box)}
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <span className="title">{trans("warehouse.box_item.quantity")}:</span> {formatNumber(totalItems)}
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <span className="title">{trans("warehouse.sku.duplicate")}:</span> {formatNumber(currentBox?.duplicate)}
                                </div>
                            </div>

                            <div className="action-section d-flex align-items-center justify-content-end mt-3">
                                <NeedPermission need={'boxes.update'}>
                                    <Button variant="primary" className="ml-3 btn-large" onClick={handleEditBox}>{trans("common.edit")}</Button>
                                </NeedPermission>
                                <NeedPermission need={'boxes.create'}>
                                    <Button variant="success" className="ml-3 btn-large" onClick={handleCreateNewBox}>{trans("GLOBAL.BUTTON.CREATE")}</Button>
                                </NeedPermission>
                            </div>
                        </div>
                    </div>


                </div>
            </CardBody>
        </Card >
    );
};

CurrentBox.propTypes = {

};

export default CurrentBox;