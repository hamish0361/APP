import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchInvoice } from 'app/modules/Warehouse/warehouse-redux/invoiceSlice';
import { toAbsoluteUrl } from '_metronic/_helpers';

import SVG from 'react-inlinesvg';
import Layout from 'app/modules/Warehouse/components/Layout';
import NotFound from 'app/components/NotFound';
import InvoiceInfo from './InvoiceInfo';
import InvoiceCostInfo from './InvoiceCostInfo';
import LadingBillList from './LadingBillList';
import useTrans from 'helper/useTrans';
import InvoiceStatus from './InvoiceStatus';
import Button from 'app/components/Button';
import { dialog } from 'app/components/DialogNotify';

const InvoiceDetailPage = props => {

    const { data, loading } = useSelector(state => state.warehouse.invoice.detail);
    const dispatch = useDispatch();
    const params = useParams();
    const [trans] = useTrans();

    useEffect(() => {
        if (params?.id) dispatch(fetchInvoice({ id: params?.id }))
    }, [params?.id]); // eslint-disable-line

    const handleExport = () => {
        console.log('export excel');
        dialog.info("Tính năng đang phát triển");
    }

    if (!data && !loading) return <NotFound />

    return (
        <Layout
            title={`${trans("warehouse.invoice.title")} ${params?.id}`}
            toolbar={(
                <div>
                    <Button type="secondary" onClick={handleExport}>
                        <span class="svg-icon svg-icon-primary svg-icon-2x">
                            <SVG
                                src={toAbsoluteUrl(
                                    '/media/svg/icons/Files/Cloud-download.svg'
                                )}
                            ></SVG>
                        </span>
                        {trans("warehouse.invoice.export.excel")}
                    </Button>
                </div>
            )}
        >
            <div className="row">
                <div className="col-lg-6 col-md-12"><InvoiceInfo /></div>
                <div className="col-lg-6 col-md-12">
                    <InvoiceCostInfo />
                    <InvoiceStatus />
                </div>
            </div>
            <LadingBillList />
        </Layout>
    );
};

InvoiceDetailPage.propTypes = {

};

export default InvoiceDetailPage;