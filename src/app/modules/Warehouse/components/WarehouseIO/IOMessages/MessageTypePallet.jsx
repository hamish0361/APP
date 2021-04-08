import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useTrans from 'helper/useTrans';

const MessageTypePallet = ({ message }) => {

    const [trans] = useTrans();

    const messageString = useMemo(() => {
        if (message.status === 'error') return <div className="message-string error">{trans("warehouse.container.add_pallet.failure", { data: message.pallet_id || '' })}</div>;

        return (
            <div className="message-string success have-submess">
                <div className="submess">{trans("warehouse.container.add_pallet.success", { data: message.pallet_id })}</div>
            </div>
        )
    }, [message, trans]);

    return (
        <div className="message-type-pallet message-wrapper">
            <div className="time">[{message.time}] {!!message.container && `[Cont - ${message.container.id}]`}</div>
            {messageString}
        </div>
    );
};

MessageTypePallet.propTypes = {
    message: PropTypes.any
};

export default MessageTypePallet;