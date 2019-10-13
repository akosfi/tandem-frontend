import io from 'socket.io-client';
import {Message} from "../models/Message";


export const IM            = 'IM';
export const IDENT         = 'IDENTIFY';
export const CONNECT       = 'CONNECT';
export const DISCONNECT    = 'DISCONNECT';
export const CONNECT_ERR   = 'CONNECT_ERROR';
export const RECONNECT_ERR = 'RECONNECT_ERROR';
export const UPDATE_CLIENT = 'UPDATE_CLIENT';


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

    constructor(onChange: any, onSocketError: any, onMessage: any, onUpdateClient: any, user: any) {
        this.onChange = onChange;
        this.onSocketError = onSocketError;
        this.onMessage = onMessage;
        this.onUpdateClient = onUpdateClient;
        this.socket = null;


        this.user = user;
        this.port = 8000; //default
    }

    // User clicked connect button
    connect = () => {
        // Connect
        const host = `http://localhost:${this.port}`;
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

    sendIm = (message: Message) => this.socket.emit(IM, message);

    disconnect = () => this.socket.close();

    onError = (message: string)  => {
        this.onSocketError(message);
        this.disconnect();
    };

}
