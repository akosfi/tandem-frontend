import {CONNECT_SOCKET, connectionChangedAction, DISCONNECT_SOCKET} from "../actions";
import Socket from "./socket";
import {MESSAGE_SEND, messageReceivedAction, messageSentAction} from "../../message/actions";
import {getActiveUsersList} from "../../user/actions";

const socketMiddleware = (store: any)  => {
    const onConnectionChange = (isConnected: boolean) => {
        store.dispatch(connectionChangedAction(isConnected));

        if (isConnected) {
            store.dispatch(getActiveUsersList());
        }
    };

    const onIncomingMessage = (message: any) => {
        store.dispatch(messageReceivedAction(message));
    };

    const onSocketError = (status: any) => console.log("SOCKET ERROR" + status);


    const onUpdateClient = () => {

    };

    const socket = new Socket(
        onConnectionChange,
        onSocketError,
        onIncomingMessage,
        onUpdateClient,
    );

    return (next: any) => (action: any) => {
        socket.user = store.getState().users.current.id;

        switch (action.type) {

            case CONNECT_SOCKET:
                socket.connect();
                break;

            case DISCONNECT_SOCKET:
                socket.disconnect();
                break;

            case MESSAGE_SEND:
                socket.sendIm(action.message);
                store.dispatch(messageSentAction(action.message));
                break;

            default:
                break;
        }

        return next(action)
    };


};
export default socketMiddleware;
