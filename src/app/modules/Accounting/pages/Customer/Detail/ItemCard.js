import { IMAGES } from 'constant/Images';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import '../styles.scss';

function ItemCard({ user }) {
    return (
        <div className="row mb-xl-4 ">
            {/* begin item */}
            <div className="col-xl-3 col-lg-6 col-md-6 mb-xl-4 mb-8">
                <div className="warehouse-card">
                    <div className="warehouse-card__user">
                        <img src={IMAGES.IC_HUMAN} alt="user" />
                    </div>
                    <div
                        className="p-4 w-100 h-100 bg-white"
                        style={{ overflow: 'auto' }}
                    >
                        <div className="mb-2">
                            <span className="font-size-h7 opacity-70 border-bottom border-primary pb-1">
                                {user?.id?.toUpperCase() || '-'}
                            </span>
                        </div>
                        <div>
                            <span className="font-size-h7 opacity-70">
                                <b>
                                    <FormattedMessage id="ACCOUNTING.EMAIL.UPPERCASE" />
                                </b>{' '}
                                {user?.email || '-'}
                            </span>
                        </div>
                        <div>
                            <span className="font-size-h7 opacity-70">
                                <b>
                                    <FormattedMessage id="ACCOUNTING.ROLE.UPPERCASE" />
                                </b>{' '}
                                {user?.role_id || '-'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* end item */}
            {/* begin item */}
            <div className="col-xl-3 col-lg-6 col-md-6 mb-xl-4 mb-8">
                <div className="warehouse-card">
                    <div className="warehouse-card__amount">
                        <img src={IMAGES.IC_AMOUNT} alt="ic_amount" />
                    </div>
                    <div className="p-4 w-100 h-100 bg-white">
                        <div className="mb-2">
                            <span className="font-size-h7 opacity-70 border-bottom border-primary pb-1">
                                <FormattedMessage id="ACCOUNTING.TOTAL_DEPOSIT" />
                            </span>
                        </div>
                        <div>
                            <span className="font-size-h7 opacity-70">
                                <b>VND </b>125.000
                            </span>
                        </div>
                        <div>
                            <span className="font-size-h7 opacity-70">
                                <b>JPY </b>235
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* end item */}
            {/* begin item */}
            <div className="col-xl-3 col-lg-6 col-md-6 mb-xl-4 mb-8">
                <div className="warehouse-card">
                    <div className="warehouse-card__withdrawal">
                        <img src={IMAGES.IC_AMOUNT1} alt="ic_amount" />
                    </div>
                    <div className="p-4 w-100 h-100 bg-white">
                        <div className="mb-2">
                            <span className="font-size-h7 opacity-70 border-bottom border-danger pb-1">
                                <FormattedMessage id="ACCOUNTING.TOTAL_WITHDRAWAL" />
                            </span>
                        </div>
                        <div>
                            <span className="font-size-h7 opacity-70">
                                <b>VND </b>125.000
                            </span>
                        </div>
                        <div>
                            <span className="font-size-h7 opacity-70">
                                <b>JPY </b>235
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* end item */}
            {/* begin item */}
            <div className="col-xl-3 col-lg-6 col-md-6 mb-xl-4 mb-8">
                <div className="warehouse-card">
                    <div className="warehouse-card__balance">
                        <img src={IMAGES.IC_AMOUNT2} alt="ic_amount" />
                    </div>
                    <div className="p-4 w-100 h-100 bg-white">
                        <div className="mb-2">
                            <span className="font-size-h7 opacity-70 border-bottom border-success pb-1">
                                <FormattedMessage id="ACCOUNTING.SURPLUS" />
                            </span>
                        </div>
                        <div>
                            <span className="font-size-h7 opacity-70">
                                <b>VND </b>125.000
                            </span>
                        </div>
                        <div>
                            <span className="font-size-h7 opacity-70">
                                <b>JPY </b>235
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
