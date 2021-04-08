import React from 'react';
import PropTypes from 'prop-types';

import useTrans from 'helper/useTrans';
import { toAbsoluteUrl } from '_metronic/_helpers';

import SVG from 'react-inlinesvg';
import EditableText from 'app/components/EditableText';

const MessageTypeNotify = ({ message, onRemove, onEdit, isCanUpdate, isCanDelete }) => {
    const [trans] = useTrans();

    const handleDeleteMessage = () => {
        onRemove && onRemove(message)
    }

    const handleEditQuantity = (v) => {
        if (v !== message.quantity) {
            onEdit && onEdit({ ...message, newQuantity: v });
        }
    }

    return (
        <div className="message-type-notify message-wrapper">
            <div className="time">[{message.time}] {!!message.container && `[Cont - ${message.container.id}]`}</div>
            <div className="message-string warning">{trans(message.transObj.id, message.transObj.value)}</div>
            {message.id && (
                <>
                    {isCanUpdate && (
                        <EditableText
                            value={message.quantity}
                            onChange={handleEditQuantity}
                            text=" "
                            type="number"
                            min={1}
                        />
                    )}

                    {isCanDelete && (
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

MessageTypeNotify.propTypes = {
    message: PropTypes.any
};

export default MessageTypeNotify;