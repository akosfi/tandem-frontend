import {connectionChangedAction} from "../actions/socket-actions";
import Socket from "./socket";
import {messageReceivedAction, messageSentAction} from "../actions/message-actions";
import {CONNECT_SOCKET, DISCONNECT_SOCKET, MESSAGE_SEND} from "../actions/action-consts";

const socketMiddleware = store => {
    const onConnectionChange = isConnected => {
        store.dispatch(connectionChangedAction(isConnected));
        //store.dispatch(statusChanged(isConnected ? 'Connected' : 'Disconnected'));
    };


    const onIncomingMessage = (message) => {
        store.dispatch(messageReceivedAction(message));
    };

    const onSocketError = (status) => console.log("SOCKET ERROR" + status);


    const onUpdateClient = (message) => console.log("CLIENT UPDATE MESSAGE" + message);

    //const onSocketError = (status) => store.dispatch(statusChanged(status, true));

    //const onIncomingMessage = message => store.dispatch(messageReceived(message));

    /*const onUpdateClient = message => {
        store.dispatch()
    };*/
    /*const onUpdateClient = message => {

        const messageState = store.getState().messageState;

        // Remove this user from the list
        const otherUsers = message.list.filter(user => user !== messageState.user);

        // Has our recipient disconnected?
        const recipientLost = messageState.recipient !== UI.NO_RECIPIENT && !(message.list.find(user => user === messageState.recipient));

        // Has our previously disconnected recipient reconnected?
        const recipientFound = !!messageState.lostRecipient && !!message.list.find(user => user === messageState.lostRecipient);

        const dispatchUpdate = () => {
            store.dispatch(clientUpdateReceived(otherUsers, recipientLost));
        };

        if (recipientLost && !messageState.recipientLost) { // recipient just now disconnected
            store.dispatch(statusChanged(`${messageState.recipient} ${UI.RECIPIENT_LOST}`, true));
            dispatchUpdate();
        } else if (recipientFound) { // previously lost recipient just reconnected
            store.dispatch(statusChanged(`${messageState.lostRecipient} ${UI.RECIPIENT_FOUND}`));
            dispatchUpdate();
            store.dispatch(recipientChanged(messageState.lostRecipient));
        } else {
            dispatchUpdate();
        }
    };*/

    const socket = new Socket(
        onConnectionChange,
        onSocketError,
        onIncomingMessage,
        onUpdateClient
    );

    return next => action => {

        switch (action.type){

            case CONNECT_SOCKET:
                socket.connect(); //!!!!!!!!!!!!!!!!!!!!!!!!!!!
                break;

            case DISCONNECT_SOCKET:
                socket.disconnect();
                break;

            case MESSAGE_SEND:
                console.log("AAAA");
                console.log(action);
                socket.sendIm("asd");
                store.dispatch(messageSentAction(action.message));
                /*socket.sendIm({
                    'from': 1,
                    'to': 2,
                    'text': action.message
                });*/
                //store.dispatch(messageSent());
                break;

            default:
                break;
        }

        return next(action)
    };


};
export default socketMiddleware;
