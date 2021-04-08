import React, { useEffect, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from '_metronic/_partials/controls';
import OriginDetailForm from './OriginDetailForm';
import {
    fetchOriginById,
    updateOrigin
} from '../../../product-redux/originSlice';
import Loading from 'app/components/Loading';
import { dialog } from 'app/components/DialogNotify';
import TopHeader from 'app/modules/Product/components/TopHeader';
import _ from 'lodash';
import { injectIntl } from 'react-intl';

function ProductOriginDetailPage({
    history,
    match: {
        params: { id }
    },
    intl
}) {
    const dispatch = useDispatch();
    const origin = useSelector(state => state.product.origin);
    const { originDetail, isLoading, isActionLoading } = origin;

    useEffect(() => {
        dispatch(fetchOriginById(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const btnRef = useRef();

    const handleEditClick = () => {
        if (btnRef && btnRef.current) {
            btnRef.current.click();
        }
    };

    const handleSave = values => {
        let body = {
            id: id,
            params: {
                ..._.omit(values, ['id'])
            }
        };
        dispatch(updateOrigin(body)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DETAIL.ORIGIN.SUCCESS'
                    })}}`
                );
            } else {
                dialog.error(
                    `{${intl.formatMessage({
                        id: 'PRODUCT.DETAIL.ORIGIN.FAIL'
                    })}}`
                );
            }
        });
    };

    const initOrigin = {
        id: originDetail.id || '',
        name: originDetail.name || ''
    };

    return (
        <>
            {(isLoading || isActionLoading) && <Loading />}
            <TopHeader
                title={intl.formatMessage({
                    id: 'ORIGIN.DETAIL_PAGE'
                })}
            >
                <button
                    type="button"
                    onClick={() => {
                        history.push('/product/origin');
                    }}
                    className="btn btn-light"
                >
                    <i className="fa fa-arrow-left"></i>
                    {intl.formatMessage({ id: 'GLOBAL.BUTTON.BACK' })}
                </button>
                {`  `}
                {`  `}
                <button
                    type="submit"
                    className="btn btn-primary ml-2"
                    onClick={handleEditClick}
                >
                    {intl.formatMessage({ id: 'GLOBAL.BUTTON.SAVE' })}
                </button>
            </TopHeader>
            <div className="pb-8 px-8">
                <Card>
                    <CardBody>
                        <OriginDetailForm
                            onSave={handleSave}
                            btnRef={btnRef}
                            initialValues={initOrigin}
                            intl={intl}
                        ></OriginDetailForm>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default injectIntl(connect(null, null)(ProductOriginDetailPage));
