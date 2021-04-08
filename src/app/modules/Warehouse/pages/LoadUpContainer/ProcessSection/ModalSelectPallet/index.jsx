import React, { useImperativeHandle, useState } from 'react';

import useTrans from 'helper/useTrans';
import useLoadUp from '../../hooks/useLoadUp';

import CustomModal from 'app/components/CustomModal';
import SelectPallet from 'app/components/Select/SelectPallet';
import { Modal } from 'react-bootstrap';

const ModalSelectPallet = (props, ref) => {

    const [show, setShow] = useState();
    const [boxId, setBoxId] = useState();
    const [trans] = useTrans();
    const { loadUpBox } = useLoadUp(ref);

    useImperativeHandle(ref, () => ({
        open: ({ id }) => {
            setShow(true);
            setBoxId(id);
        }
    }));

    const closeModal = () => {
        setShow(false);
    }

    const handleChangePallet = (palletSelected) => {
        closeModal();
        loadUpBox(boxId, palletSelected);
    }

    return (
        <CustomModal
            show={show}
            onHide={closeModal}
            title={trans("warehouse.load_up_container.select.pallet.title")}
        >
            <Modal.Body>
                {!!boxId && (
                    <SelectPallet
                        onChange={handleChangePallet}
                        defaultParams={{
                            search: `pivotBoxes.box_id:${boxId}`,
                            searchFields: `pivotBoxes.box_id:=`
                        }}
                    />
                )}

                <div className="mt-5 text-right">
                    <button className="btn btn-secondary" onClick={closeModal}>
                        {trans("common.cancel")}
                    </button>
                </div>
            </Modal.Body>
        </CustomModal>
    );
};

export default React.forwardRef(ModalSelectPallet);