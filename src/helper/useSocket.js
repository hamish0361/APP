import { useCallback, useRef } from "react";

import { printerSocketConfig } from 'config/printerSocket';
import { useSelector } from "react-redux";

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export default function useSocket({
    onReceivedMessage
}) {

    const defaultIPServer = useSelector(state => state.warehouse.settings.printer.socketServer);
    const socket = useRef();

    const connect = useCallback((ipConnect) => {

        let serverIP = ipConnect || defaultIPServer;

        const sk = new WebSocket(serverIP + '?encoding=text', printerSocketConfig);
        socket.current = sk;

        socket.current.onerror = function (evt) {
            socket.current = null;
        };
    }, [defaultIPServer]); // eslint-disable-line

    const listenSocketConnectAndSendData = useCallback((d) => {
        /** Đã có sẵn kết nối */
        if (socket.current.readyState === 1) {
            socket.current.send(d);
        } else {
            /** Chưa có sẵn kết nối */
            socket.current.onopen = function () {
                socket.current.send(d);
            };
        }
    }, [defaultIPServer]); // eslint-disable-line

    const listenSocketMessage = useCallback(() => {
        socket.current.onmessage = function (evt) {

            // Nếu data không thể parse từ JSON thì đó k phải là dữ liệu chúng ta cần
            if (!isJsonString(evt?.data)) return;

            const evtData = JSON.parse(evt.data) || {};

            onReceivedMessage(evtData);
        }
    }, []); // eslint-disable-line

    const send = useCallback((d) => {
        if (!socket.current) {
            connect(defaultIPServer);
        }
        listenSocketConnectAndSendData(d);
        listenSocketMessage();
    }, [connect, listenSocketConnectAndSendData, listenSocketMessage, defaultIPServer]); // eslint-disable-line

    return [send];
}