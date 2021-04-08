import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import { shallowEqual, useSelector } from 'react-redux';
import Select from 'react-select';
import { Button } from 'reactstrap';
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';

ShipmentInfoCard.propTypes = {
    shipment: PropTypes.object,
    onUpdate: PropTypes.func,
    shipmentInfoRes: PropTypes.number
};

function ShipmentInfoCard({
    shipment = {},
    onUpdate = null,
    shipmentInfoRes,
    intl
}) {
    const [isShow, setShow] = useState(false);
    const [selectedShipment, setSelectedShipment] = useState(null);
    const { shipmentList } = useSelector(
        ({ order }) => ({
            shipmentList: order.shipmentInfo.shipmentInfoList
        }),
        shallowEqual
    );

    const shipmentOptions = shipmentList.map(item => {
        return {
            value: item.id,
            label: item.consignee,
            full_address: item.full_address,
            tel: item.tel
        };
    });

    const handleUpdate = () => {
        if (onUpdate && selectedShipment) {
            onUpdate(selectedShipment?.value);
        }
    };

    const handleSelectShipment = shipment => {
        setSelectedShipment(shipment);
    };

    useEffect(() => {
        setShow(false);
        setSelectedShipment(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shipmentInfoRes]);

    const shipmentObj = shipmentList.find(x => x.id === shipmentInfoRes);

    return (
        <Card style={{ height: '55%' }}>
            <CardHeader
                title={intl.formatMessage({ id: 'ORDER.SHIPMENT_INFO' })}
            >
                <CardHeaderToolbar>
                    {isShow && (
                        <div style={{ width: '200px' }}>
                            <Select
                                options={shipmentOptions}
                                className="w-100"
                                onChange={handleSelectShipment}
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
                            <FormattedMessage id="ORDER.CUSTOMER" />
                        </span>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {selectedShipment?.label ||
                                shipmentObj?.consignee ||
                                shipment?.consignee}
                        </div>
                    </div>
                </div>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <span className="order-title">
                            <FormattedMessage id="ORDER.ADDRESS" />
                        </span>
                    </div>
                    <div className="col-9">
                        <div
                            className="form-control bg-light"
                            style={{ overflow: 'auto' }}
                        >
                            {selectedShipment?.full_address ||
                                shipmentObj?.full_address ||
                                shipment?.full_address}
                        </div>
                    </div>
                </div>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <span className="order-title">
                            <FormattedMessage id="ORDER.TEL" />
                        </span>
                    </div>
                    <div className="col-9">
                        <NumberFormat
                            className="form-control bg-light"
                            format="#### #### #### ####"
                            value={
                                selectedShipment?.tel ||
                                shipmentObj?.tel ||
                                shipment?.tel
                            }
                            displayType="text"
                        />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default ShipmentInfoCard;
