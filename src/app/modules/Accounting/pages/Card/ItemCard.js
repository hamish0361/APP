import { IMAGES } from 'constant/Images';
import React from 'react';
import './styles.scss';

ItemCard.propTypes = {};

function ItemCard() {
    return (
        <div className="row mb-xl-4">
            {/* begin item */}
            <div className="col-xl-4 mb-xl-4 mb-8">
                <div className="warehouse-card">
                    <div className="warehouse-card__amount">
                        <img src={IMAGES.IC_AMOUNT} alt="ic_amount" />
                    </div>
                    <div className="p-4 w-100 h-100 bg-white">
                        <div className="mb-2">
                            <span className="font-size-h7 opacity-70 border-bottom border-primary pb-1">
                                TỔNG TIỀN NỘP
                            </span>
                        </div>
                        <div>
                            <span className="font-size-h7 opacity-70">
                                <b>VND:</b> 125.000
                            </span>
                        </div>
                        <div>
                            <span className="font-size-h7 opacity-70">
                                <b>JPY:</b> 235
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* end item */}
            {/* begin item */}
            <div className="col-xl-4 mb-xl-4 mb-8">
                <div className="warehouse-card">
                    <div className="warehouse-card__withdrawal">
                        <img src={IMAGES.IC_AMOUNT1} alt="ic_amount" />
                    </div>
                    <div className="p-4 w-100 h-100 bg-white">
                        <div className="mb-2">
                            <span className="font-size-h7 opacity-70 border-bottom border-danger pb-1">
                                TỔNG TIỀN RÚT
                            </span>
                        </div>
                        <div>
                            <span className="font-size-h7 opacity-70">
                                <b>VND:</b> 125.000
                            </span>
                        </div>
                        <div>
                            <span className="font-size-h7 opacity-70">
                                <b>JPY:</b> 235
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* end item */}
            {/* begin item */}
            <div className="col-xl-4 mb-xl-4 mb-8">
                <div className="warehouse-card">
                    <div className="warehouse-card__balance">
                        <img src={IMAGES.IC_AMOUNT2} alt="ic_amount" />
                    </div>
                    <div className="p-4 w-100 h-100 bg-white">
                        <div className="mb-2">
                            <span className="font-size-h7 opacity-70 border-bottom border-success pb-1">
                                SỐ DƯ
                            </span>
                        </div>
                        <div>
                            <span className="font-size-h7 opacity-70">
                                <b>VND:</b> 125.000
                            </span>
                        </div>
                        <div>
                            <span className="font-size-h7 opacity-70">
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
