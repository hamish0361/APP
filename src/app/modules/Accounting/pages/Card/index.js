import { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardBody } from '_metronic/_partials/controls';
import AccountingTable from '../../components/AccountingTable';
import TopHeader from '../../components/TopHeader';
import { createCard, fetchCard } from '../../redux/cardSlice';
import DialogNew from './DialogNew';
import TopFilter from './TopFilter';

function CardPage({ intl }) {
    const dispatch = useDispatch();
    const history = useHistory();

    // store
    const { cardList, isLoading, isActionLoading, banks } = useSelector(
        ({ accounting, home }) => ({
            cardList: accounting.card.list,
            isLoading: accounting.card.isLoading,
            isActionLoading: accounting.card.isActionLoading,
            banks: home.home.bankList
        }),
        shallowEqual
    );

    const [show, setShow] = useState(false);
    const [params, setParams] = useState({
        with: 'bank',
        search: '',
        searchFields: ''
    });

    useEffect(() => {
        dispatch(fetchCard(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    // handle submit
    const handleNewSubmit = paramsCard => {
        const { name, code, bankId } = paramsCard;
        const body = {
            name,
            id: code,
            bank_id: bankId
        };
        if (!code) {
            dialog.warning(
                ` ${intl.formatMessage({
                    id: 'ACCOUNTING.CARD.DIALOG_NEW.REQUIRED.ID'
                })}`
            );
        } else if (!name) {
            dialog.warning(
                ` ${intl.formatMessage({
                    id: 'ACCOUNTING.CARD.DIALOG_NEW.REQUIRED.NAME'
                })}`
            );
        } else {
            dispatch(createCard(body)).then(res => {
                if (res.type.includes('fulfilled')) {
                    dispatch(fetchCard(params));
                    dialog.success(
                        ` ${intl.formatMessage({
                            id: 'ACCOUNTING.CARD.DIALOG_NEW.REQUIRED.SUCCESS'
                        })}`
                    );
                } else {
                    dialog.error(
                        ` ${intl.formatMessage({
                            id: 'ACCOUNTING.CARD.DIALOG_NEW.REQUIRED.ERROR'
                        })}`
                    );
                }
                setShow(false);
            });
        }
    };

    const handleSubmitSearch = ({ search, searchFields }) => {
        setParams({
            ...params,
            search,
            searchFields
        });
    };

    const rows = cardList?.map(item => {
        return {
            id: item.id || '',
            name: item.name || '-',
            code: '-',
            bank: item.bank?.name || '-',
            balance: '-'
        };
    });

    const handleViewDetail = id => {
        history.push(`/ke-toan/the/${id}/chi-tiet`);
    };

    const loading = isLoading || isActionLoading;

    const columns = [
        { id: 'id', title: 'id' },
        {
            id: 'code',
            title: ` ${intl.formatMessage({
                id: 'ACCOUNTING.CARD.TOPFILTER.ID'
            })}`
        },
        {
            id: 'name',
            title: ` ${intl.formatMessage({
                id: 'ACCOUNTING.CARD.TOPFILTER.NAME'
            })}`
        },
        {
            id: 'bank',
            title: ` ${intl.formatMessage({
                id: 'ACCOUNTING.CARD.TOPFILTER.BANK'
            })}`
        },
        {
            id: 'balance',
            title: ` ${intl.formatMessage({
                id: 'ACCOUNTING.CARD.TOPFILTER.BALANCE'
            })}`
        }
    ];
    return (
        <>
            {loading && <Loading />}
            {/* begin header */}
            <TopHeader
                title={intl.formatMessage({
                    id: 'ACCOUNTING.CARD.TITLE'
                })}
            >
                <button
                    style={{ width: '100px' }}
                    className="btn btn-primary btn-sm font-size-h6 font-weight-bolder mr-2"
                    onClick={() => {
                        setShow(true);
                    }}
                >
                    {intl.formatMessage({
                        id: 'GLOBAL.BUTTON.CREATE_ORDER'
                    })}
                </button>
            </TopHeader>
            {/* end header */}
            <div className="px-8 pb-8">
                <Card>
                    <CardBody>
                        <TopFilter onSearch={handleSubmitSearch} intl={intl} />
                        <AccountingTable
                            width="1100px"
                            columns={columns}
                            rows={rows}
                            isDelete={false}
                            onViewEdit={handleViewDetail}
                            page={1}
                            lastpage={1}
                        />
                    </CardBody>
                </Card>
            </div>
            {/* begin modal */}
            <DialogNew
                banks={banks}
                show={show}
                onHide={() => setShow(false)}
                onNewSubmit={handleNewSubmit}
                intl={intl}
            />
            {/* end modal */}
        </>
    );
}

export default injectIntl(connect(null, null)(CardPage));
