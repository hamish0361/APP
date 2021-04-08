import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Card, CardBody, CardHeader } from '_metronic/_partials/controls';

SupplierCard.propTypes = {
    supplier: PropTypes.object
};

function SupplierCard({ supplier = {}, intl }) {
    return (
        <Card className="h-100">
            <CardHeader title={intl.formatMessage({ id: 'ORDER.SUPPLIER' })} />
            <CardBody>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <label>
                            <FormattedMessage id="ORDER.NAME" />
                        </label>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {supplier?.name || ''}
                        </div>
                    </div>
                </div>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <label>
                            <FormattedMessage id="ORDER.EMAIL" />
                        </label>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {supplier?.email || ''}
                        </div>
                    </div>
                </div>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <label>
                            <FormattedMessage id="ORDER.ADDRESS" />
                        </label>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {supplier?.address || ''}
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default SupplierCard;
