import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';
import Select from 'react-select';
import { Button } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { checkNumber } from 'helper/utils';
import usePrevious from 'helper/usePrevious';

InfoCard.propTypes = {
    tracking: PropTypes.object,
    onUpdate: PropTypes.func
};

function InfoCard({ tracking, onUpdate, intl }) {
    const codePrevious = usePrevious(tracking?.code || '');
    const [values, setValues] = useState({
        code: '',
        checked: {
            value: '0',
            label: intl.formatMessage({ id: 'GLOBAL.LABEL.NO' })
        }
    });

    const checkedOptions = [
        { value: '1', label: intl.formatMessage({ id: 'TRACKING.IN_STOCK' }) },
        { value: '0', label: intl.formatMessage({ id: 'TRACKING.OUT_STOCK' }) }
    ];

    React.useEffect(() => {
        setValues({
            code: tracking?.id || '',
            checked: {
                value: tracking.checked ? '1' : '0',
                label: tracking.checked
                    ? intl.formatMessage({ id: 'TRACKING.IN_STOCK' })
                    : intl.formatMessage({ id: 'TRACKING.OUT_STOCK' })
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tracking?.id]);

    const handleCheckedSelect = checked => {
        setValues({
            ...values,
            checked
        });
    };

    const handleInputChange = e => {
        const check = checkNumber(e.target.value);
        if (!check) return;

        setValues({
            ...values,
            code: e.target.value
        });
    };

    const handleUpdate = () => {
        const params = {
            code: values.code,
            checked: values.checked.value
        };
        onUpdate(params);
    };

    return (
        <Card>
            <CardHeader
                title={intl.formatMessage({ id: 'ORDER.SHIPMENT.TRACKING' })}
            >
                <CardHeaderToolbar>
                    <Button
                        color="primary"
                        onClick={handleUpdate}
                        disabled={codePrevious === values.code}
                    >
                        <FormattedMessage id="GLOBAL.BUTTON.UPDATE" />
                    </Button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <div className="row ">
                    {/* begin item */}
                    <div className="col-6">
                        <label>
                            <FormattedMessage id="TRACKING.CODE_TRACKING" />
                        </label>
                        <input
                            className="form-control"
                            value={values.code}
                            onChange={handleInputChange}
                            placeholder={intl.formatMessage({
                                id: 'GLOBAL.PLACEHOLER.INPUT'
                            })}
                        />
                    </div>
                    {/* end item */}
                    {/* begin item */}
                    <div className="col-6">
                        <label>
                            <FormattedMessage id="TRACKING.DETAIL.CHECK" />
                        </label>
                        <Select
                            options={checkedOptions}
                            value={values.checked}
                            onChange={handleCheckedSelect}
                        />
                    </div>
                    {/* end item */}
                </div>
            </CardBody>
        </Card>
    );
}

export default InfoCard;
