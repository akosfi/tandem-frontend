import {CONNECT_SOCKET, CONNECTION_CHANGED, DISCONNECT_SOCKET, PORT_CHANGED} from "./action-consts";

export const connectionChangedAction = (isConnected: boolean) => {
    return {
        type: CONNECTION_CHANGED,
        connected: isConnected,
        isError: false
    };
};

export const portChangedAction = (port: number) => {
    return {
        type: PORT_CHANGED,
        port: port
    };
};

export const connectSocketAction = (user: any, port: number) => {
    return {
        type: CONNECT_SOCKET
    };
};

export const disconnectSocketAction = () => {
    return {
        type: DISCONNECT_SOCKET
    };
};
