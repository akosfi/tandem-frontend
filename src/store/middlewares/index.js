import {connectionChangedAction} from "../actions/socket-actions";
import Socket from "./socket";

const socketMiddleware = store => {
    const onConnectionChange = isConnected => {
        store.dispatch(connectionChangedAction(isConnected));
        //store.dispatch(statusChanged(isConnected ? 'Connected' : 'Disconnected'));
    };

    //const onSocketError = (status) => store.dispatch(statusChanged(status, true));

    //const onIncomingMessage = message => store.dispatch(messageReceived(message));

    // The server has updated us with a list of all users currently on the system
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
        null,//onSocketError,
        onIncomingMessage,
        null//,onUpdateClient
    );

}
