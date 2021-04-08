import React, { useState } from 'react';

import { toAbsoluteUrl } from '_metronic/_helpers';

import SVG from 'react-inlinesvg';
import { Button } from 'react-bootstrap';
import Popover from '@material-ui/core/Popover';
import { useFormikContext } from 'formik';
import DialogNewProduct from './DialogNewProduct';
import useTrans from 'helper/useTrans';

const AddProduct = props => {

    const { setFieldValue, submitForm } = useFormikContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const [showMd, setShowMd] = useState(false);
    const open = Boolean(anchorEl);
    const [trans] = useTrans();

    const toggleModal = () => setShowMd(!showMd);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCreateProductSuccess = (response) => {
        toggleModal();
        setTimeout(() => {
            setFieldValue('product_id', response?.id)
                .then(() => {
                    submitForm();
                });
        }, 600);
    }

    const openModal = () => {
        toggleModal();
        handleClose();
    }

    return (
        <div className="add-product-label">
            {trans("warehouse.jancode.title")}

            <Button variant="link" onClick={handleClick} className="p-0 border-0">
                <SVG
                    src={toAbsoluteUrl(
                        '/media/svg/icons/Code/Info-circle.svg'
                    )}
                ></SVG>
            </Button>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <div className="p-3">
                    {trans("warehouse.jancode.not_have_jancode")}? <Button variant="link" onClick={openModal}>{trans("warehouse.jancode.create.title")}</Button>
                </div>
            </Popover>

            <DialogNewProduct show={showMd} onHide={toggleModal} onSuccess={handleCreateProductSuccess} />
        </div>
    );
};

AddProduct.propTypes = {

};

export default React.memo(AddProduct);