import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';

import { toAbsoluteUrl } from '_metronic/_helpers';
import clsx from 'clsx';
import queryString from 'query-string';
import { useDetailPallet } from '../context';
import _ from 'lodash';

import SVG from 'react-inlinesvg';

import './index.scss';

const PalletItem = ({ pallet }) => {

    const { togglePalletDetail } = useDetailPallet();
    const [isActive, setIsActive] = useState(false);
    const routerLocation = useLocation();

    useEffect(() => {
        if (routerLocation.search) {
            let search = queryString.parse(routerLocation.search);

            if (search['locations.pallets.id'] === pallet.id) {
                setIsActive(true);
            }

            if(_.findIndex(pallet?.pivot_boxes || [], ['box_id', search['locations.pallets.pivotBoxes.box_id']]) !== -1) {
                setIsActive(true);
            }
        }
    }, [routerLocation]); // eslint-disable-line

    const totalBoxesInPallet = useMemo(() => {
        return pallet?.pivot_boxes.reduce((prevV, curV) => prevV + curV?.current_quantity || 0, 0);
    }, [pallet]);

    const showPalletDetail = () => { togglePalletDetail(pallet) }

    if (!pallet || !pallet?.pivot_boxes?.length) return (
        <div className={clsx(
            "pallet-item-model",
            !pallet && 'placeholder',
            pallet && !pallet?.pivot_boxes?.length && 'empty-pallet',
            isActive && 'active'
        )}>
            <div className="pallet-item-model__icon">
                <SVG
                    src={toAbsoluteUrl(
                        '/media/svg/icons/Shopping/Pallet.svg'
                    )}
                ></SVG>
            </div>
            <div className="pallet-item-model__id">
                {pallet?.id}
            </div>
        </div>
    )

    return (
        <div className={clsx("pallet-item-model", isActive && 'active')} onClick={showPalletDetail}>
            <div className="pallet-item-model__icon">
                <SVG
                    src={toAbsoluteUrl(
                        '/media/svg/icons/Shopping/Pallet-with-box.svg'
                    )}
                ></SVG>
            </div>
            <div className="pallet-item-model__id">
                {pallet.id}
            </div>
            <div className="pallet-item-model_boxes-length">
                {totalBoxesInPallet}
            </div>
        </div>
    );
};

PalletItem.propTypes = {
    pallet: PropTypes.any,
    onSelect: PropTypes.func
};

export default React.memo(PalletItem);