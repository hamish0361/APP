import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import formatNumber from 'helper/formatNumber';

import { toAbsoluteUrl } from '_metronic/_helpers';
import SVG from 'react-inlinesvg';

import './BoxItem.scss';

const BoxItem = ({ box, active, onClick, showQuantity = () => false, showRelative = false, showTotalItems = false, showItems = false, externalLink }) => {

    const handleClick = () => {
        if (active) return;

        onClick && onClick(box)
    }

    const getTotalBoxItems = useMemo(() => {

        let totalBoxItems = 0;

        if (box?.items?.length) {
            totalBoxItems += box.items.reduce((prevV, curB) => prevV + (curB.quantity || 0), 0);
        }

        if (!box?.childs?.length) return totalBoxItems;

        totalBoxItems += box.childs.reduce((prevV, curB) => {
            let childItems = curB.items.reduce((prevC_V, curC_B) => prevC_V + (curC_B.quantity || 0), 0);

            return prevV + childItems * curB.duplicate;
        }, 0);

        return totalBoxItems;

    }, [box]);

    const handleExternalLink = (e, box) => {
        if(externalLink) {
            e.stopPropagation();

            window.open(externalLink(box), '_blank');
        }
    }

    return (
        <div className={clsx("box-item", active && 'active')} onClick={handleClick}>
            <div className="box-item__main-content">
                <div className="box-icon position-relative">
                    <SVG
                        src={toAbsoluteUrl(
                            '/media/svg/icons/Shopping/Box3.svg'
                        )}
                    ></SVG>

                    {!!showQuantity(box) && (
                        <div className="label-quantity">
                            {showQuantity(box)}
                        </div>
                    )}
                </div>
                <div className="box-info">
                    <div className="sku">SKU: <span onClick={(e) => handleExternalLink(e, box)}>{box.id}</span></div>
                    <div className="size">Size: {box.width} × {box.height} × {box.length}</div>
                    <div className="size">Weight: {formatNumber(box.weight)}</div>

                    {showTotalItems && (
                        <div className="size">Items: {formatNumber(getTotalBoxItems)}</div>
                    )}
                </div>
            </div>

            {showRelative && !!box?.childs?.length && (
                <div className="box-childs">
                    <div className="box-childs-title">Childs:</div>
                    <div className="box-childs-wrapper">
                        {box.childs.map((boxChild, boxChildIdx) => (
                            <div className="box-child" key={`box-child-${boxChildIdx}`}>
                                <div className="box-child--id">{boxChild.id}</div>
                                <div className="box-child--duplicate">{formatNumber(boxChild.duplicate)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {showItems && !!box?.items?.length && (
                <div className="box-childs">
                    <div className="box-childs-title">Items:</div>
                    <div className="box-childs-wrapper">
                        {box.items.map((item, itemIdx) => (
                            <div className="box-child" key={`box-child-${itemIdx}`}>
                                <div className="box-child--id">{item.product_id}</div>
                                <div className="box-child--duplicate">{formatNumber(item.quantity)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

BoxItem.propTypes = {
    box: PropTypes.any,
    active: PropTypes.bool,
    onClick: PropTypes.func,
    showQuantity: PropTypes.func,
    showRelative: PropTypes.bool,
    externalLink: PropTypes.func
};

export default BoxItem;