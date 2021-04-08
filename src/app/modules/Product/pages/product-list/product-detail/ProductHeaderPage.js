import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';
import { useHistory } from 'react-router-dom';

ProductHeaderPage.prototype = {
    idProduct: PropTypes.string
};

function ProductHeaderPage({ idProduct = '', intl }) {
    const history = useHistory();
    return (
        <div>
            <>
                <Card>
                    <CardHeader
                        title={intl.formatMessage({
                            id: 'PRODUCT.DETAIL.TITLE'
                        })}
                    >
                        <CardHeaderToolbar>
                            <button
                                type="button"
                                onClick={() => {
                                    history.push('/product/list');
                                }}
                                className="btn btn-light"
                            >
                                <i className="fa fa-arrow-left"></i>
                                {intl.formatMessage({
                                    id: 'PRODUCT.DETAIL.BACK.BUTTON'
                                })}
                            </button>
                            {``}
                            {/* <button
                                type="button"
                                onClick={() => {
                                    history.push(
                                        `/product/${idProduct}/create-wholesale`
                                    );
                                }}
                                className="btn btn-primary ml-2"
                            >
                                <i className="fa fa-plus"></i>
                                {intl.formatMessage({
                                    id: 'PRODUCT.DETAIL.CREATE_WHOLESALE.BUTTON'
                                })}
                            </button>
                            {`  `}
                            <button
                                type="button"
                                onClick={() => {
                                    history.push(
                                        `/product/${idProduct}/create-payment`
                                    );
                                }}
                                className="btn btn-primary ml-2"
                            >
                                <i className="fa fa-plus"></i>
                                {intl.formatMessage({
                                    id: 'PRODUCT.DETAIL.CREATE_PAYMENT.BUTTON'
                                })}
                            </button> */}
                            {`  `}
                        </CardHeaderToolbar>
                    </CardHeader>
                </Card>
            </>
        </div>
    );
}

export default ProductHeaderPage;
