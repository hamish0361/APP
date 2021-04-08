import React from 'react';
import { IMAGES } from 'constant/Images';
import './index.scss';

ItemCard.propTypes = {};

function ItemCard({ intl }) {
    return (
        <div className="row mb-8">
            {/* begin item */}
            <div className="col-md-12">
                <div className="warehouse-card">
                    <div className="warehouse-card__balance">
                        <img src={IMAGES.IC_AMOUNT2} alt="ic_amount" />
                    </div>
                    <div className="p-6 w-100 h-100 bg-white">
                        <div className="mb-2">
                            <span className="font-size-h6 opacity-70 border-bottom border-success pb-1">
                                {intl.formatMessage({
                                    id: 'ACCOUNTING.ORDER.DETAIL.BALANCE'
                                })}
                            </span>
                        </div>
                        <div>
                            <span className="font-size-h6 opacity-70">
                                <b>VND:</b> 125.000
                            </span>
                        </div>
                        <div>
                            <span className="font-size-h6 opacity-70">
                                <b>JPY:</b> 235
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* end item */}
        </div>
    );
}

export default ItemCard;
