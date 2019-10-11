import {CONNECT_SOCKET, CONNECTION_CHANGED, DISCONNECT_SOCKET, PORT_CHANGED} from "./action-consts";

export const connectionChanged = (isConnected: boolean) => {
    return {
        type: CONNECTION_CHANGED,
        connected: isConnected,
        isError: false
    };
};

export const portChanged = (port: number) => {
    return {
        type: PORT_CHANGED,
        port: port
    };
};

export const connectSocket = (user: any, port: number) => {
    return {
        type: CONNECT_SOCKET
    };
};

export const disconnectSocket = () => {
    return {
        type: DISCONNECT_SOCKET
    };
};
