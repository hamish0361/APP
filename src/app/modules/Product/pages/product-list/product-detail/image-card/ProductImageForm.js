import PropTypes from 'prop-types';
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';
import { Route, useHistory } from 'react-router-dom';
import React from 'react';
import DialogUploadImgageProduct from './DialogUploadImgageProduct';
import '../index.scss';

ProductImageForm.propTypes = {
    imageProduct: PropTypes.string,
    idProduct: PropTypes.string
};

function ProductImageForm({ imageProduct = '', idProduct = '' }) {
    const histoty = useHistory();
    const handleUploadImage = () => {
        histoty.push(`/product/${idProduct}/detail/upload-image`);
    };

    return (
        <>
            <Route path="/product/:id/detail/upload-image">
                {({ history, match }) => (
                    <DialogUploadImgageProduct
                        id={match && match.params.id}
                        show={match != null}
                        onHide={() =>
                            history.push(`/product/${idProduct}/detail`)
                        }
                    />
                )}
            </Route>
            <Card>
                {/* <CardHeader title="Ảnh">
                    <CardHeaderToolbar>
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={handleUploadImage}
                        >
                            <i className="fa fa-images"></i>
                            Cập nhật
                        </button>
                    </CardHeaderToolbar>
                </CardHeader> */}
                <CardBody>
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={handleUploadImage}
                    >
                        <i className="fa fa-images"></i>
                        Cập nhật
                    </button>
                    <div className="text-center">
                        <img
                            className="image-product"
                            src={
                                imageProduct
                                    ? imageProduct
                                    : 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'
                            }
                            alt=""
                            style={{ maxWidth: '100%', height: '317px' }}
                        />
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default ProductImageForm;
