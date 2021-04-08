import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useTrans from 'helper/useTrans';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

PopoverConfirmDelete.propTypes = {
    onYesClick: PropTypes.func,
    id: PropTypes.string
};

const PopoverItem = props => {
    const { id, item, onYesClick } = props;
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [trans] = useTrans();

    const toggle = () => setPopoverOpen(!popoverOpen);

    const handleYesClick = () => {
        setPopoverOpen(!popoverOpen);
        onYesClick && onYesClick();
    };

    return (
        <span>
            <Button
                color="danger"
                size="sm"
                onClick={() => setPopoverOpen(true)}
                id={'Popover-' + id}
                type="button"
            >
                {trans('common.delete')}
            </Button>
            <Popover
                placement={item.placement}
                isOpen={popoverOpen}
                target={'Popover-' + id}
                toggle={toggle}
            >
                <PopoverHeader>Xác nhận xoá item</PopoverHeader>
                <PopoverBody>
                    <div className="font-weight-bold">Bạn có chắc chắn xoá</div>
                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            color="secondary"
                            size="sm"
                            className="mr-2"
                            onClick={() => setPopoverOpen(false)}
                        >
                            Không
                        </Button>
                        <Button
                            color="danger"
                            size="sm"
                            onClick={handleYesClick}
                        >
                            Có
                        </Button>
                    </div>
                </PopoverBody>
            </Popover>
        </span>
    );
};

function PopoverConfirmDelete({ id, onYesClick }) {
    return <PopoverItem item="Bottom" id={id} onYesClick={onYesClick} />;
}

export default PopoverConfirmDelete;
