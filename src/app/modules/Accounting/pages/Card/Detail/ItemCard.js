import { IMAGES } from 'constant/Images';
import React from 'react';
import '../styles.scss';
import Prototype from 'prop-types';

ItemCard.propTypes = {
    bank: Prototype.object
};

function ItemCard({ bank }) {
    return (
        <div className="row mb-xl-4">
            {/* begin bank */}
            <div className="col-xl-3 col-lg-6 mb-xl-4 mb-8">
                <div className="warehouse-card">
                    <div className="warehouse-card__bank">
                        <img src={IMAGES.IC_BANK} alt="ic_amount" />
                    </div>
                    <div
                        className="p-4 w-100 h-100 bg-white"
                        style={{ overflow: 'auto' }}
                    >
                        <div className="mb-2">
                            <span className="opacity-70 border-bottom border-primary pb-1">
                                Tên thẻ
                            </span>
                        </div>
                        <div>
                            <span className="opacity-70">
                                <b>Mã thẻ:</b> 0123456789
                            </span>
                        </div>
                        <div>
                            <span className="opacity-70">
                                <b>NH:</b> {bank?.name}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* end bank */}
            {/* begin item */}
            <div className="col-xl-3 col-lg-6 mb-xl-4 mb-8">
                <div className="warehouse-card">
                    <div className="warehouse-card__amount">
                        <img src={IMAGES.IC_AMOUNT} alt="ic_amount" />
                    </div>
                    <div className="p-4 w-100 h-100 bg-white">
                        <div className="mb-2">
                            <span className="opacity-70 border-bottom border-primary pb-1">
                                TỔNG TIỀN NỘP
                            </span>
                        </div>
                        <div>
                            <span className="opacity-70">
                                <b>VND:</b> 125.000
                            </span>
                        </div>
                        <div>
                            <span className="opacity-70">
                                <b>JPY:</b> 235
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* end item */}
            {/* begin item */}
            <div className="col-xl-3 col-lg-6 mb-xl-4 mb-8">
                <div className="warehouse-card">
                    <div className="warehouse-card__withdrawal">
                        <img src={IMAGES.IC_AMOUNT1} alt="ic_amount" />
                    </div>
                    <div className="p-4 w-100 h-100 bg-white">
                        <div className="mb-2">
                            <span className="opacity-70 border-bottom border-danger pb-1">
                                TỔNG TIỀN RÚT
                            </span>
                        </div>
                        <div>
                            <span className="opacity-70">
                                <b>VND:</b> 125.000
                            </span>
                        </div>
                        <div>
                            <span className="opacity-70">
                                <b>JPY:</b> 235
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* end item */}
            {/* begin item */}
            <div className="col-xl-3 col-lg-6 mb-xl-4 mb-8">
                <div className="warehouse-card">
                    <div className="warehouse-card__balance">
                        <img src={IMAGES.IC_AMOUNT2} alt="ic_amount" />
                    </div>
                    <div className="p-4 w-100 h-100 bg-white">
                        <div className="mb-2">
                            <span className="opacity-70 border-bottom border-success pb-1">
                                SỐ DƯ
                            </span>
                        </div>
                        <div>
                            <span className="opacity-70">
                                <b>VND:</b> 125.000
                            </span>
                        </div>
                        <div>
                            <span className="opacity-70">
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
