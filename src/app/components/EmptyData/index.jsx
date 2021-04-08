import useTrans from 'helper/useTrans';
import React, { useMemo } from 'react';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '_metronic/_helpers';
import './index.scss';

const EmptyData = ({ emptyText }) => {

    const [trans] = useTrans();

    const text = useMemo(() => {
        if (emptyText) return emptyText;

        return trans("GLOBAL.NO_DATA")
    }, [emptyText, trans]);

    return (
        <div className="empty-data">
            <div className="empty-data__icon">
                <SVG
                    src={toAbsoluteUrl('/media/svg/icons/Code/empty-data.svg')}
                />
            </div>
            <div className="empty-data__text">
                {text}
            </div>
        </div>
    );
};

export default EmptyData;
