import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
    fecthProductId,
    uploadImageProduct,
    updateProduct
} from 'app/modules/Product/product-redux/productSlice';
import { useFileUpload } from 'use-file-upload';
import '../index.scss';
import { dialog } from 'app/components/DialogNotify';

DialogUploadImgageProduct.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    id: PropTypes.string
};

function DialogUploadImgageProduct({ id = '', show = false, onHide = null }) {
    const dispatch = useDispatch();
    const [defaultSrc, setDefaultSrc] = useState(
        'https://cdn.onlinewebfonts.com/svg/img_212908.png'
    );
    const [files, selectFiles] = useFileUpload();

    const bodyFetchById = {
        id: id,
        params: {
            with: 'suppliers;package'
        }
    };

    const handleUploadImage = e => {
        const urlImage = e.target.value;
        if (urlImage.length <= 0) {
            const formData = new FormData();
            formData.set('image', files.file, files.name);
            const params = {
                idProduct: id,
                data: formData
            };
            dispatch(uploadImageProduct(params)).then(res => {
                if (res.type.includes('fulfilled')) {
                    dialog.success('Update image success');
                    dispatch(fecthProductId(bodyFetchById));
                } else {
                    dialog.error('Update image failed');
                    setDefaultSrc(
                        'https://cdn.onlinewebfonts.com/svg/img_212908.png'
                    );
                }
                onHide();
            });
        } else {
            const body = {
                id: id,
                params: { image_url: urlImage }
            };
            dispatch(updateProduct(body)).then(res => {
                if (res.type.includes('fulfilled')) {
                    dialog.success('Update image success');
                    dispatch(fecthProductId(bodyFetchById));
                } else {
                    dialog.error('Update image failed');
                    setDefaultSrc(
                        'https://cdn.onlinewebfonts.com/svg/img_212908.png'
                    );
                }
                onHide();
            });
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            {/*begin::Loading*/}
            {/*end::Loading*/}
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Cập nhập ảnh
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="app">
                <button
                    onClick={() => selectFiles({ accept: 'image/*' })}
                    type="button"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Click me to change image!"
                >
                    <img src={files?.source || defaultSrc} alt="preview" />
                </button>
                <div className="col-lg-12 col-md-12">
                    <label htmlFor="basic-url">URL ảnh</label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span
                                className="input-group-text"
                                id="basic-addon3"
                            >
                                Dán liên kết vào đây
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            id="basic-url"
                            aria-describedby="basic-addon3"
                            onChange={handleUploadImage}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <button
                        type="button"
                        onClick={onHide}
                        className="btn btn-light btn-elevate"
                    >
                        Hủy
                    </button>
                    <> </>
                    <button
                        type="button"
                        onClick={handleUploadImage}
                        className="btn btn-primary btn-elevate"
                    >
                        Cập nhập
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default DialogUploadImgageProduct;
