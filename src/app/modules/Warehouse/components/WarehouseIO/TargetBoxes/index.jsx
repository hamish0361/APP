import React, { useMemo } from 'react';

import clsx from 'clsx';
import formatNumber from 'helper/formatNumber';
import _ from 'lodash';

import './index.scss';

const listColors = ["#f5222d", "#fa541c", "#fa8c16", "#faad14", "#d4b106", "#a0d911", "#52c41a", "#13c2c2", "#1890ff", "#2f54eb", "#722ed1", "#eb2f96", "#bfbfbf"]

const TargetBoxes = ({
    targetBoxes = {},
    currentContainer,
    countRendering = (v) => `${formatNumber(v.count || 0)} / ${formatNumber(v.quantity)}`,
    labelPrefix = "Invoice",
    onRemoveTarget
}) => {

    const shuffleColorList = useMemo(() => {
        return _.shuffle(listColors);
    }, []);

    const getBGColor = (idx) => {
        const rIdx = idx % listColors.length;

        return hexToRgba(shuffleColorList[rIdx]) || shuffleColorList[rIdx];
    }

    function hexToRgba(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        if (result)
            return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, .5)`;

        return null;
    }

    const handleRemoveInvoice = (c) => {
        onRemoveTarget && onRemoveTarget(c);
    }

    if (!currentContainer) return <></>;

    return (
        <div className="target-boxes shadow-sm">
            <div className="invoice-item" style={{ background: getBGColor(currentContainer.id) }}>
                <div className="invoice-item-head">
                    - {labelPrefix} {currentContainer.id} -
                    {onRemoveTarget && (
                        <span aria-hidden="true" className="remove-btn" onClick={() => handleRemoveInvoice(currentContainer)}>&times;</span>
                    )}
                </div>
                <div className="list-boxes">
                    {Object.entries(targetBoxes).map(([boxId, v], bIdx) => (
                        <div className={clsx(`box-data`, !v.quantity && 'warning')} key={`box-data-${bIdx}`}>
                            <div className="box-id">{boxId}</div>
                            <div className="count">{countRendering(v)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

TargetBoxes.propTypes = {

};

export default TargetBoxes;