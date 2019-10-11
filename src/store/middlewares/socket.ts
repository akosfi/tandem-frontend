import io from 'socket.io-client';


export const IM            = 'im';
export const IDENT         = 'identify';
export const CONNECT       = 'connect';
export const DISCONNECT    = 'disconnect';
export const CONNECT_ERR   = 'connect_error';
export const RECONNECT_ERR = 'reconnect_error';
export const UPDATE_CLIENT = 'update_client';


export default class Socket {
    private port: number;
    private user: any;

    private socket: any;

    //CONNECTION CHANGED EVENT
    private readonly onChange: any;

    //SOCKET ERROR EVENT
    private readonly onSocketError: any;

    //MESSAGE RECEIVED EVENT
    private readonly onMessage: any;

    //ACTIVE USERS LIST RECEIVED
    private readonly onUpdateClient: any;

    constructor(onChange: any, onSocketError: any, onMessage: any, onUpdateClient: any) {
        this.onChange = onChange;
        this.onSocketError = onSocketError;
        this.onMessage = onMessage;
        this.onUpdateClient = onUpdateClient;
        this.socket = null;
        this.user = null;
        this.port = 8000; //default
    }

    // User clicked connect button
    connect = (user: any, port: number) => {

        this.user = user;
        this.port = port;

        // Connect
        const host = `http://localhost:${port}`;
        this.socket = io.connect(host);

        // Set listeners
        this.socket.on(CONNECT, this.onConnected);
        this.socket.on(DISCONNECT, this.onDisconnected);
        this.socket.on(CONNECT_ERR, this.onError);
        this.socket.on(RECONNECT_ERR, this.onError);
    };

    onConnected = () => {
        this.sendIdent();
        this.socket.on(IM, this.onMessage);
        this.socket.on(UPDATE_CLIENT, this.onUpdateClient);
        this.onChange(true);
    };

    onDisconnected = () => this.onChange(false);

    sendIdent = () => this.socket.emit(IDENT, this.user);

    sendIm = (message: string) => this.socket.emit(IM, message);

    disconnect = () => this.socket.close();

    onError = (message: string)  => {
        this.onSocketError(message);
        this.disconnect();
    };

}
