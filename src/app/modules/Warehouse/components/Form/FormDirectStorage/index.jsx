import React, { useMemo } from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router';

import useTrans from 'helper/useTrans';
import * as Yup from 'yup';
import { isLocationCode, isPalletCode } from 'helper/useScanBarcode';
import { toAbsoluteUrl } from '_metronic/_helpers';

import SVG from 'react-inlinesvg';
import { FastField, Formik } from 'formik';
import { BarcodeInput } from '_metronic/_partials/controls';
import FormStatus from '../FormStatus';
import Form from '../FormEnterIndex';
import ModalAddLocation from './ModalAddLocation';

import './index.scss';

function FormDirectStorage({
    formItemClass = 'col-lg-6 col-sm-12',
    initialValues = {
        pallet_id: '',
        location_id: ''
    },
    onSubmit
}, ref) {
    const [trans] = useTrans();
    const match = useRouteMatch();
    const history = useHistory();

    const validationSchema = Yup.object().shape({
        pallet_id: Yup.string()
            .required(trans("validation.message.required")),
        location_id: Yup.string()
            .required(trans("validation.message.required")),
    });

    const handleCreateLocation = () => {
        history.push(`${match.url}/create-location`);
    }

    const locationLabel = useMemo(() => {
        return (
            <div className="location-label">
                <span>{trans("warehouse.location.id")}</span>
                <span className="svg-icon svg-icon-primary ml-3 cursor-pointer" onClick={() => handleCreateLocation()}>
                    <SVG
                        src={toAbsoluteUrl(
                            '/media/svg/icons/Code/Info-circle.svg'
                        )}
                    ></SVG>
                </span>
            </div>
        )
    }, []); // eslint-disable-line

    const handleCreateLocationSuccess = (location) => {
        ref.current.setFieldValue('location_id', location.id);
    }

    return (
        <>
            <Route path={`${match.path}/create-location`}>
                {({ match }) => (
                    <ModalAddLocation
                        show={match !== null}
                        onSuccess={handleCreateLocationSuccess}
                    />
                )}
            </Route>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={onSubmit}
                innerRef={ref}
                validationSchema={validationSchema}
            >
                <Form className="form form-label-right form-direct-storage">
                    <div className="form-group row">
                        <div className={formItemClass}>
                            <div>
                                <FastField
                                    name="pallet_id"
                                    component={BarcodeInput}
                                    label={trans("warehouse.pallet.id")}
                                    placeholder={trans("warehouse.pallet.id")}
                                    autoComplete="off"
                                    condition={isPalletCode}
                                />
                            </div>
                        </div>

                        <div className={formItemClass}>
                            <div>
                                <FastField
                                    name="location_id"
                                    component={BarcodeInput}
                                    label={locationLabel}
                                    placeholder={trans("warehouse.location.id")}
                                    autoComplete="off"
                                    condition={isLocationCode}
                                />
                            </div>
                        </div>
                    </div>
                    <FormStatus />
                </Form>
            </Formik>
        </>
    );
}

export default React.forwardRef(FormDirectStorage);
