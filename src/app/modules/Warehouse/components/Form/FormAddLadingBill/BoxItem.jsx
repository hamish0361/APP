
import React, { useMemo } from 'react';

import { toAbsoluteUrl } from '_metronic/_helpers';
import clsx from 'clsx';

import SVG from 'react-inlinesvg';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import useTrans from 'helper/useTrans';
import useTracking from './useTracking';
import getShipmentMethodFromTrackingInfo from 'helper/getShipmentMethodFromTrackingInfo';

const BoxItem = ({ item, handleToggle, boxIdxInListChecked, handleQuantityChange, labelId }) => {

    const [trans] = useTrans();

    const tracking = useTracking(item?.box?.sfa?.tracking);

    const suggestShipmentMethod = useMemo(() => {
        return getShipmentMethodFromTrackingInfo(tracking.data);
    }, [tracking]);

    return (
        <div className="col-lg-6 col-sm-12" key={item.id}>
            <ListItem role={undefined} dense button onClick={handleToggle(item)}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={boxIdxInListChecked(item) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <div className="item-box">
                    <SVG
                        src={toAbsoluteUrl(
                            '/media/svg/icons/Shopping/Box4.svg'
                        )}
                    ></SVG>
                    <div className="item-box__info">
                        <span className="item-box__id">{item.box_id}</span>
                        <div className={clsx("item-box__shipment-method", !suggestShipmentMethod && 'd-none')}>
                            {trans("warehouse.shipment_method.sort.title")}: <b className={clsx(suggestShipmentMethod === 'sea' ? 'text-primary' : 'text-success')}>{suggestShipmentMethod}</b>
                        </div>
                    </div>
                </div>
            </ListItem>
            <div className={clsx("item-quantity", boxIdxInListChecked(item) !== -1 ? '' : 'd-none')}>
                {trans("common.quantity")}: <input name={item.id} className="ml-3 form-control" defaultValue={item.avalableQuantity} min={1} type="number" max={item?.avalableQuantity} onChange={handleQuantityChange} />
            </div>
        </div>
    );
};

BoxItem.propTypes = {

};

export default BoxItem;