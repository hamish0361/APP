import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import useTrans from 'helper/useTrans';
import { toAbsoluteUrl } from '_metronic/_helpers';

import SVG from 'react-inlinesvg';
import EditableText from 'app/components/EditableText';

const MessageTypeBox = ({ message, onRemove, onEdit, isCanUpdate, isCanDelete }) => {
    const [trans] = useTrans();

    const messageString = useMemo(() => {
        if (message.status === 'error') return <div className="message-string error">{trans("warehouse.container.add_box.failure", { data: message.box_id || '' })}</div>;

        return <div className="message-string success">
            {trans("warehouse.container.add_box.success", {
                quantity: message?.quantity || 1, box_id: message.box_id
            })}
        </div>;
    }, [message, trans]);

    const handleDeleteMessage = () => {
        onRemove && onRemove(message);
    }

    const handleEditQuantity = (v) => {
        if (v !== message.quantity) {
            onEdit && onEdit({ ...message, newQuantity: v });
        }
    }

    return (
        <div className="message-type-box message-wrapper">
            <div className="time">[{message.time}] {!!message.container && `[Cont - ${message.container.id}]`} {message.palletId && `[Pallet - ${message.palletId}]`}</div>
            {messageString}
            {message.id && (
                <>
                    {!!onEdit && isCanUpdate && (
                        <EditableText
                            value={message.quantity}
                            onChange={handleEditQuantity}
                            text=" "
                            type="number"
                            min={1}
                        />
                    )}
                    {!!onRemove && isCanDelete && (
                        <div className="delete-message svg-icon svg-icon-danger" onClick={handleDeleteMessage}>
                            <SVG
                                src={toAbsoluteUrl(
                                    '/media/svg/icons/General/Trash.svg'
                                )}
                            ></SVG>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

MessageTypeBox.propTypes = {
    message: PropTypes.any
};

export default MessageTypeBox;