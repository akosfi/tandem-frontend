import io from 'socket.io-client';
import {Message} from "../../message/models/Message";


export const IM            = 'IM';
export const IDENT         = 'IDENTIFY';
export const CONNECT       = 'CONNECT';
export const DISCONNECT    = 'DISCONNECT';
export const CONNECT_ERR   = 'CONNECT_ERROR';
export const RECONNECT_ERR = 'RECONNECT_ERROR';
export const UPDATE_CLIENT = 'UPDATE_CLIENT';


export default class Socket {
    private readonly port: number;
    user: any;

    private socket: any;

    private readonly onChange: any;

    private readonly onSocketError: any;

    private readonly onMessage: any;

    private readonly onUpdateClient: any;

    constructor(onChange: any, onSocketError: any, onMessage: any, onUpdateClient: any) {
        this.onChange = onChange;
        this.onSocketError = onSocketError;
        this.onMessage = onMessage;
        this.onUpdateClient = onUpdateClient;
        this.socket = null;

        this.port = 8000;
    }

    connect = () => {
        const host = `http://localhost:${this.port}`;
        this.socket = io.connect(host);

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

    sendIm = (message: Message) => this.socket.emit(IM, message);

    disconnect = () => this.socket.close();

    onError = (message: string)  => {
        this.onSocketError(message);
        this.disconnect();
    };

}
