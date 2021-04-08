import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader } from '_metronic/_partials/controls';
import EmptyData from 'app/components/EmptyData';

TrackingCard.propTypes = {
    trackings: PropTypes.array
};

function TrackingCard({ trackings, intl }) {
    return (
        <Card className="h-100">
            <CardHeader
                title={intl.formatMessage({ id: 'DASHBOARD.TRACKING.TITLE' })}
            />
            {trackings?.length > 0 ? (
                <div className="dashboard-log h-100 m-8">
                    <div
                        className="border"
                        style={{ height: '100%', overflow: 'auto' }}
                    >
                        {trackings.map((item, index) => (
                            <div
                                className="dashboard-tracking__item  px-8 border-bottom py-5"
                                key={index}
                            >
                                <i
                                    className={`fa fa-genderless ${
                                        item.checked
                                            ? 'text-primary'
                                            : 'text-danger'
                                    } icon-xl mr-4`}
                                />
                                <div className="font-weight-bolder font-size-h6 opacity-80">
                                    {item.code}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <EmptyData />
            )}
        </Card>
    );
}

export default TrackingCard;
