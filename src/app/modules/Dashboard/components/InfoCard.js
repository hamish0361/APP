import { IMAGES } from 'constant/Images';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Card } from '_metronic/_partials/controls';

InfoCard.propTypes = {
    user: PropTypes.object
};

function InfoCard({ user }) {
    return (
        <Card className="h-100">
            <div className="p-8">
                <div
                    className="d-flex mb-6 dashboard-info__profile"
                    style={{ overflow: 'hidden' }}
                >
                    <img
                        src={IMAGES.PROFILE}
                        alt="profile"
                        className="rounded-circle"
                    />
                    <div className="ml-4">
                        <div className="font-size-h6 font-weight-bolder opacity-80">
                            {user.id}
                        </div>
                        <div>{user.role}</div>
                        <div>{user.email}</div>
                    </div>
                </div>
                {/* begin item */}
                <div className="dashboard-info__vnd mb-4 p-5">
                    <div className="font-size-h6 font-weight-bolder">
                        <FormattedMessage id="DASHBOARD.CURRENCY.VND" />
                    </div>
                    <div className="font-size-h6">120.000.000</div>
                </div>
                {/* end item */}
                {/* begin item */}
                <div className="dashboard-info__jpy mb-4 p-5">
                    <div className="font-size-h6 font-weight-bolder">
                        <FormattedMessage id="DASHBOARD.CURRENCY.JPY" />
                    </div>
                    <div className="font-size-h6">120.000.000</div>
                </div>
                {/* end item */}
                {/* begin item */}
                <div className="dashboard-info__usd p-5">
                    <div className="font-size-h6 font-weight-bolder">
                        <FormattedMessage id="DASHBOARD.CURRENCY.USD" />
                    </div>
                    <div className="font-size-h6">120.000.000</div>
                </div>

                {/* end item */}
            </div>
        </Card>
    );
}

export default InfoCard;
