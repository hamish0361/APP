import CustomModal from 'app/components/CustomModal';
import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { toAbsoluteUrl } from '_metronic/_helpers';
import '@pathofdev/react-tag-input/build/index.css';
import { ModalProgressBar } from '_metronic/_partials/controls';
import { Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';

DialogDetailTransaction.propTypes = {
    detailTransaction: PropTypes.object,
    onHide: PropTypes.func,
    show: PropTypes.bool,
    onFilesReceipt: PropTypes.func,
    onDeleteReceipt: PropTypes.func,
    listTransaction: PropTypes.array,
    isActionLoading: PropTypes.bool,
    isLoadingDetail: PropTypes.bool,
    onFilesReceiptNew: PropTypes.func
};

function DialogDetailTransaction({
    detailTransaction = {},
    show = false,
    onHide = null,
    onFilesReceipt,
    onDeleteReceipt,
    isActionLoading,
    isLoadingDetail,
    onFilesReceiptNew,
    intl
}) {
    return (
        <>
            {/*Modal*/}
            <CustomModal
                show={show}
                title={intl.formatMessage({
                    id: 'ACCOUNTING.ORDER.DETAIL.TRANSACTION.TITLE'
                })}
                onHide={onHide}
            >
                {(isLoadingDetail || isActionLoading) && <ModalProgressBar />}
                <Modal.Body className="overlay overlay-block cursor-default">
                    <div className="form-group">
                        <label className="modal-title font-size-h6 mt-5 text-dark">
                            {intl.formatMessage({
                                id: 'ACCOUNTING.ORDER.EXECUTION_DATE'
                            })}
                        </label>
                        <div className="input-group input-group-solid">
                            <input
                                name="update_at"
                                type="text"
                                className="form-control"
                                value={detailTransaction?.updated_at || ''}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-lg-6">
                            <label className="modal-title font-size-h6 mt-5 text-dark">
                                {intl.formatMessage({
                                    id: 'ACCOUNTING.ORDER.DETAIL.TRANSACTION.ID'
                                })}
                            </label>
                            <div className="input-group input-group-solid">
                                <input
                                    name="id"
                                    type="text"
                                    className="form-control"
                                    value={detailTransaction?.id || ''}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="form-group col-lg-6">
                            <label className="modal-title font-size-h6 mt-5 text-dark">
                                {intl.formatMessage({
                                    id: 'ACCOUNTING.ORDER.AMOUNT_OF_MONEY'
                                })}
                            </label>
                            <div className="input-group input-group-solid">
                                <input
                                    name="amount"
                                    type="text"
                                    className="form-control"
                                    value={detailTransaction?.amount || ''}
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="modal-title font-size-h6 mt-5 text-dark">
                            {intl.formatMessage({
                                id: 'ACCOUNTING.ORDER.DESCRIPTION'
                            })}
                        </label>
                        <div className="input-group input-group-solid">
                            <input
                                name="amount"
                                style={{ height: '100px' }}
                                type="text"
                                className="form-control"
                                value={detailTransaction?.description || ''}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-lg-6">
                            <label className="modal-title font-size-h6 mt-5 text-dark">
                                {intl.formatMessage({
                                    id: 'ACCOUNTING.ORDER.USER'
                                })}
                            </label>
                            <div className="input-group input-group-solid">
                                <input
                                    name="user_id"
                                    type="text"
                                    className="form-control"
                                    value={detailTransaction?.user_id || ''}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="form-group col-lg-6">
                            <label className="modal-title font-size-h6 mt-5 text-dark">
                                {intl.formatMessage({
                                    id: 'ACCOUNTING.ORDER.PERFORMER'
                                })}
                            </label>
                            <div className="input-group input-group-solid">
                                <input
                                    name="prepared_by_id"
                                    type="text"
                                    className="form-control"
                                    value={
                                        detailTransaction?.prepared_by_id || ''
                                    }
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-lg-6">
                            <label className="modal-title font-size-h6 mt-5 text-dark">
                                {intl.formatMessage({
                                    id: 'ACCOUNTING.ORDER.TYPE'
                                })}
                            </label>
                            <div className="input-group input-group-solid">
                                <input
                                    name="type_id"
                                    type="text"
                                    className="form-control"
                                    value={detailTransaction?.type_id || ''}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="form-group col-lg-6">
                            <label className="modal-title font-size-h6 mt-5 text-dark">
                                {intl.formatMessage({
                                    id: 'ACCOUNTING.ORDER.CREATED_DATE'
                                })}
                            </label>
                            <div className="input-group input-group-solid">
                                <input
                                    name="create_at"
                                    type="text"
                                    className="form-control"
                                    value={detailTransaction?.created_at || ''}
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div>
                        <div
                            className="modal-title h4 mt-5 modal-title font-size-h6 mt-5 text-dark"
                            id="example-modal-sizes-title-lg"
                        >
                            {intl.formatMessage({
                                id:
                                    'ACCOUNTING.ORDER.DETAIL.TRANSACTION.RECEIPT'
                            })}
                        </div>
                        <div>
                            <div
                                className="tracking-card__header py-3"
                                style={{ paddingBottom: 'unset' }}
                            >
                                <span className="col-5 modal-title font-size-h6 mt-5 text-dark ">
                                    {intl.formatMessage({
                                        id:
                                            'ACCOUNTING.ORDER.DETAIL.TRANSACTION.REFERENCE'
                                    })}
                                </span>
                                <span className="col-5 modal-title font-size-h6 mt-5 text-dark">
                                    {intl.formatMessage({
                                        id:
                                            'ACCOUNTING.ORDER.DETAIL.TRANSACTION.FILE'
                                    })}
                                </span>
                                <span className="col-2 modal-title font-size-h6 mt-5 text-dark pl-0">
                                    #
                                </span>
                            </div>
                            {detailTransaction?.receipts?.map(
                                (transaction, index) => (
                                    <div
                                        key={index}
                                        className="tracking-card__item py-3"
                                        style={{
                                            backgroundColor:
                                                index % 2 !== 1
                                                    ? '#e2e3ef'
                                                    : '-'
                                        }}
                                    >
                                        <div className="col-5 order-title">
                                            <Link
                                                to={`/ban-hang/${transaction?.id}/chi-tiet`}
                                            >
                                                {`${intl.formatMessage({
                                                    id:
                                                        'ACCOUNTING.ORDER.DETAIL.TRANSACTION.ID'
                                                })} : ${transaction?.id} ` ||
                                                    '-'}
                                            </Link>
                                        </div>
                                        <div className="col-5 order-title row">
                                            <div
                                                className="col-6 order-title"
                                                style={{
                                                    padding: 'unset',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    width: '100px'
                                                }}
                                            >
                                                <a
                                                    href={`${process.env.REACT_APP_API_URL_ACCOUNTING}/files/${transaction.path_file}`}
                                                    data-toggle="tooltip"
                                                    title="Click to download!"
                                                >
                                                    {transaction.path_file ||
                                                        ''}
                                                </a>
                                            </div>
                                            <div>
                                                <input
                                                    name="file"
                                                    id="file"
                                                    className="order-title  "
                                                    type="file"
                                                    style={{
                                                        width: '100px'
                                                    }}
                                                    onChange={e =>
                                                        onFilesReceipt(
                                                            e,
                                                            transaction.id,
                                                            detailTransaction?.id
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-2 order-title text-center">
                                            <button
                                                className="btn btn-icon btn-light btn-hover-danger btn-sm font-weight-bolder mb-2"
                                                onClick={() =>
                                                    onDeleteReceipt(
                                                        transaction.id,
                                                        detailTransaction?.id
                                                    )
                                                }
                                            >
                                                <span className="svg-icon svg-icon-md svg-icon-danger">
                                                    <SVG
                                                        src={toAbsoluteUrl(
                                                            '/media/svg/icons/General/Trash.svg'
                                                        )}
                                                    ></SVG>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                )
                            )}
                            {/* New*/}
                            <div className="tracking-card__item py-5">
                                <div
                                    className="col-5 order-title"
                                    style={{ paddingLeft: 'unset' }}
                                />
                                <div className="col-5 order-title row">
                                    <div
                                        className="col-6 order-title"
                                        style={{
                                            padding: 'unset',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            width: '100px'
                                        }}
                                    ></div>
                                    <div>
                                        <input
                                            name="file"
                                            id="file"
                                            className="order-title  "
                                            type="file"
                                            style={{
                                                width: '100px'
                                            }}
                                            onChange={e =>
                                                onFilesReceiptNew(
                                                    e,
                                                    detailTransaction?.id
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                {/* <div className="col-2 order-title text-center">
                                    <button className="btn btn-icon btn-light btn-hover-success btn-sm font-weight-bolder mb-2">
                                        <span className="svg-icon svg-icon-md svg-icon-success">
                                            <SVG
                                                src={toAbsoluteUrl(
                                                    '/media/svg/icons/General/Save.svg'
                                                )}
                                            ></SVG>
                                        </span>
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        onClick={onHide}
                        className="btn btn-light btn-elevate modal-title font-size-h6 mt-5 text-dark"
                    >
                        Cancel
                    </button>
                </Modal.Footer>
            </CustomModal>
        </>
    );
}

export default DialogDetailTransaction;
