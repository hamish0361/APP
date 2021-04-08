import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { toAbsoluteUrl } from '_metronic/_helpers';
import clsx from 'clsx';
import useTrans from 'helper/useTrans';

import SVG from 'react-inlinesvg';
import { OverlayTrigger, Tooltip, ProgressBar } from 'react-bootstrap';

import './PalletItem.scss';
import NeedPermission from 'app/components/NeedPermission';

const PalletItem = ({ pallet, onSelect }) => {

    const currentPallet = useSelector(state => state.warehouse.performEntry.storage.currentPallet);
    const history = useHistory();
    const match = useRouteMatch();
    const [trans] = useTrans();

    const handleClick = () => {
        if (currentPallet?.id === pallet?.id) return;

        onSelect && onSelect(pallet);
    }

    const savePallet = () => {
        history.push(`${match.url}/save-pallet/${pallet?.id}`)
    }

    return (
        <div className={clsx("pallet-item", currentPallet?.id === pallet?.id && 'active')} onClick={handleClick}>
            <div className="d-flex">
                <div className="pallet-item__icon">
                    <SVG
                        src={toAbsoluteUrl(
                            '/media/svg/icons/Shopping/Pallet.svg'
                        )}
                        uniquifyIDs={true}
                    ></SVG>
                </div>
                <div className="pallet-item__info">
                    <div className="pallet-item__id">
                        {pallet?.id}
                    </div>

                    {pallet?.location?.floor ? (
                        <div className="pallet-item__position">
                            <span>F{pallet?.location?.floor}</span> &#215; <span>R{pallet?.location?.row}</span> &#215; <span>C{pallet?.location?.column}</span>
                        </div>
                    ) : ''}

                    {pallet?.location?.shelve ? (
                        <div className="extra">
                            <div className="shelve">{trans("warehouse.shelve.title")}: <span>{pallet?.location?.shelve?.id}</span></div>
                            <div className="area"><span>{pallet?.location?.shelve?.area?.name}</span></div>
                        </div>
                    ) : ''}
                </div>
                <div className="pallet-item__actions">
                    <NeedPermission need={['pallets.update']}>
                        <OverlayTrigger
                            key={'storage'}
                            placement={'top'}
                            overlay={
                                <Tooltip id={`tooltip-route`}>
                                    <span className="text-primary">{trans("warehouse.pallet.save_to_other_position")}</span>
                                </Tooltip>
                            }
                        >
                            <span onClick={savePallet} className="svg-icon svg-icon-success svg-icon-2x">
                                <SVG
                                    src={toAbsoluteUrl(
                                        '/media/svg/icons/Navigation/Route.svg'
                                    )}
                                ></SVG>
                            </span>
                        </OverlayTrigger>
                    </NeedPermission>
                </div>
            </div>

            <div className="pallet-item__status">
                <div className="status--item">
                    <span className="text-success">V: </span>
                    <ProgressBar variant="success" now={pallet?.boxes_volume} max={pallet?.type?.max_volume} />
                </div>

                <div className="status--item">
                    <span className="text-primary">W: </span>
                    <ProgressBar variant="info" now={pallet?.boxes_weight} max={pallet?.type?.max_weight} />
                </div>
            </div>
        </div>
    );
};

PalletItem.propTypes = {
    pallet: PropTypes.any,
    onSelect: PropTypes.func
};

export default React.memo(PalletItem);