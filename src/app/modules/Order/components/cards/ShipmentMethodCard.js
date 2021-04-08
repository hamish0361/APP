import Loading from 'app/components/Loading';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { shallowEqual, useSelector } from 'react-redux';
import Select from 'react-select';
import { Button } from 'reactstrap';
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';

ShipmentMethodCard.propTypes = {
    shipment: PropTypes.object,
    onUpdate: PropTypes.func,
    methodRes: PropTypes.string
};

function ShipmentMethodCard({
    shipment = {},
    onUpdate = null,
    methodRes,
    intl
}) {
    const [isShow, setShow] = useState(false);
    const [selectedShipment, setSelectedShipment] = useState(null);
    const { shipmentMethodList } = useSelector(
        ({ home }) => ({ shipmentMethodList: home.home.shipmentMethodList }),
        shallowEqual
    );

    const { isActionLoading } = useSelector(
        ({ order }) => ({
            isActionLoading: order.list.isActionLoading
        }),
        shallowEqual
    );

    const handleUpdate = () => {
        if (onUpdate && selectedShipment) onUpdate(selectedShipment?.value);
    };

    const handleSelectShipment = shipment => {
        setSelectedShipment(shipment);
    };

    const shipmentOptions = shipmentMethodList?.map(item => {
        return {
            value: item.id,
            label: item.name,
            fee: item.fee
        };
    });

    useEffect(() => {
        setShow(false);
        setSelectedShipment(null);
    }, [methodRes]);

    const methodObj = shipmentMethodList?.find(x => x.id === methodRes);

    return (
        <Card className="h-100">
            {isActionLoading && <Loading />}
            <CardHeader
                title={intl.formatMessage({ id: 'ORDER.SHIPMENT_METHOD' })}
            >
                <CardHeaderToolbar>
                    {isShow && (
                        <div style={{ width: '200px' }}>
                            <Select
                                options={shipmentOptions}
                                className="w-100"
                                onChange={handleSelectShipment}
                                placeholder={intl.formatMessage({
                                    id: 'GLOBAL.SEARCH.PLACEHOLER_SELECT'
                                })}
                            />
                        </div>
                    )}
                    <Button
                        className="ml-2"
                        color="secondary"
                        onClick={() => {
                            setShow(!isShow);
                            setSelectedShipment(null);
                        }}
                    >
                        <i
                            style={{ paddingRight: 0 }}
                            className={
                                isShow ? 'flaticon-cancel' : 'flaticon-edit'
                            }
                        />
                    </Button>
                    <Button
                        className="ml-2"
                        color="primary"
                        onClick={handleUpdate}
                        disabled={!selectedShipment}
                    >
                        <FormattedMessage id="GLOBAL.BUTTON.UPDATE" />
                    </Button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <span className="order-title">
                            <FormattedMessage id="ORDER.NAME" />
                        </span>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {selectedShipment?.label ||
                                methodObj?.name ||
                                shipment?.name}
                        </div>
                    </div>
                </div>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <span className="order-title">
                            <FormattedMessage id="ORDER.FEE" />
                        </span>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {selectedShipment?.fee ||
                                methodObj?.fee ||
                                shipment?.fee}
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default ShipmentMethodCard;
