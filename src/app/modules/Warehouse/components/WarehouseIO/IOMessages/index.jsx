import React, { useMemo } from 'react';

import MessageTypePallet from './MessageTypePallet';
import MessageTypeNotify from './MessageTypeNotify';
import MessageTypeBox from './MessageTypeBox';

import './index.scss';
import usePermission from 'app/components/NeedPermission/usePermission';

const IOMessage = ({
    messages = [],
    onDelete,
    onEdit,
    permissions
}) => {

    const isCanUpdate = usePermission(permissions.update);
    const isCanDelete = usePermission(permissions.delete);

    const messageItems = useMemo(() => {
        return messages.map((m, idx) => {
            return (
                <div className="message" key={`message-${idx}`}>
                    {m.type === 'PALLET' && <MessageTypePallet message={m} />}
                    {m.type === 'NOTIFY' && <MessageTypeNotify message={m} onRemove={onDelete} isCanUpdate={isCanUpdate} isCanDelete={isCanDelete} onEdit={onEdit} />}
                    {m.type === 'BOX' && <MessageTypeBox message={m} onRemove={onDelete} isCanUpdate={isCanUpdate} isCanDelete={isCanDelete} onEdit={onEdit} />}
                </div>
            );
        })
    }, [messages, onDelete, onEdit, isCanUpdate, isCanDelete]);

    return (
        <div className="io-message-wrapper">
            <div className="io-message-box shadow-sm">
                {messageItems}
            </div>
        </div>
    );
};

export default IOMessage;