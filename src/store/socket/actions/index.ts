export const CONNECTION_CHANGED = 'CONNECTION_CHANGED';
export const PORT_CHANGED = 'PORT_CHANGED';
export const CONNECT_SOCKET = 'CONNECT_SOCKET';
export const DISCONNECT_SOCKET = 'DISCONNECT_SOCKET';

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

export const connectSocketAction = () => {
    return {
        type: CONNECT_SOCKET
    };
};

export const disconnectSocketAction = () => {
    return {
        type: DISCONNECT_SOCKET
    };
};
