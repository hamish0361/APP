import React, { useState, useEffect } from 'react';

import { useDetailPallet } from '../context';
import { toAbsoluteUrl } from '_metronic/_helpers';
import clsx from 'clsx';
import warehouseApi from 'apis/warehouse';
import formatNumber from 'helper/formatNumber';

import SVG from 'react-inlinesvg';
import Barcode from 'react-barcode';
import { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';

import './index.scss';

const PalletDetail = () => {
    const { pallet, showPallet, togglePalletDetail } = useDetailPallet();
    const [selectedBox, setSelectedBox] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!showPallet) setSelectedBox(undefined);
    }, [showPallet]);

    const hideDetailPallet = () => {
        togglePalletDetail();
    }

    const handleSelectBox = (box) => {
        setLoading(true);
        warehouseApi.box.fetchBox(box.id, { with: 'items;childs.items' })
            .then(res => {
                setSelectedBox(res);
            })
            .catch((err) => {
                dialog.error('Get data box failure!')
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className={clsx("pallet-detail", showPallet ? 'show' : 'hide')}>
            <div className="pallet-detail-head d-flex align-items-center">
                <div className="close-section btn btn-link" onClick={hideDetailPallet}>
                    <SVG
                        src={toAbsoluteUrl(
                            '/media/svg/icons/Navigation/Arrow-left.svg'
                        )}
                    ></SVG>
                </div>
                <div className='pallet-id'>{pallet?.id}</div>
            </div>

            <div className="pallet-content">
                {!!pallet?.pivot_boxes?.length && (
                    <>
                        <div className="list-box-wrapper">
                            {pallet.pivot_boxes.map(({ box, current_quantity }, boxIdx) => (
                                <div
                                    className={clsx("box d-flex align-items-center justify-content-between", selectedBox?.id === box.id && "selected")}
                                    key={`box-item-${boxIdx}`}
                                    onClick={() => handleSelectBox(box)}
                                >
                                    <div className="box-id">{box.id} <span className="quantity-on-pallet">{current_quantity}</span></div>
                                    <div className="show-on-hover svg-icon svg-icon-primary">
                                        <SVG
                                            src={toAbsoluteUrl(
                                                '/media/svg/icons/Navigation/Arrow-right.svg'
                                            )}
                                        ></SVG>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="box-content position-relative">
                            {loading && <Loading local />}
                            {selectedBox && (
                                <div className="d-flex h-100">
                                    <div className="box-info">
                                        <div>
                                            <div className="icon-section">
                                                <SVG
                                                    src={toAbsoluteUrl(
                                                        '/media/svg/icons/Shopping/Box4.svg'
                                                    )}
                                                ></SVG>
                                                <div className="bar-code">
                                                    <Barcode value={selectedBox?.id || "0"} textPosition="top" height={40} />
                                                </div>
                                            </div>
                                            <div className="d-flex mt-3">
                                                <div className="box-width">Chiều dài: {formatNumber(selectedBox.width)}</div>
                                                <div className="box-height">Chiều rộng:{formatNumber(selectedBox.height)}</div>
                                                <div className="box-length">Chiều cao: {formatNumber(selectedBox.length)}</div>
                                                <div className="box-weight">Khối lượng: {formatNumber(selectedBox.weight_per_box)}</div>
                                                <div className="box-volume">Thể tích: {formatNumber(selectedBox.volume_per_box)}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-items-wrapper">
                                        <div className="box-items-title">Sản phẩm trong thùng</div>

                                        <div className="box-items-list">
                                            {selectedBox.childs.map((child, cIdx) => (
                                                <div className="box-child" key={`box-child-${cIdx}`}>
                                                    <div className="box-child-id">Thùng con: {child.id} (SL: {child.duplicate})</div>
                                                    <div className="box-child-items">
                                                        {child.items.map((item, iIdx) => (
                                                            <div className="box-item" key={`box-child-item-${iIdx}`}>
                                                                <div className="box-item__product-id">{item.product_id}</div>
                                                                <div className="box-item__quantity">Số lượng: {item.quantity} <small>x</small> {child.duplicate}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                            {selectedBox.items.map((item, iIdx) => (
                                                <div className="box-item" key={`box-item-${iIdx}`}>
                                                    <div className="box-item__product-id">{item.product_id}</div>
                                                    <div className="box-item__quantity">Số lượng: {item.quantity}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
};

export default PalletDetail;