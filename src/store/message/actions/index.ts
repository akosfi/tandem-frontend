import {Message} from "../models/Message";
import {Dispatch} from "redux";
import {makeRequest} from "../../../util";
import {connectSocketAction} from "../../socket/actions";
import {USER_CURRENT_AUTHENTICATED} from "../../user/actions";

export const MESSAGES_GET = 'MESSAGES_GET';
export const MESSAGE_SEND = 'MESSAGE_SEND';
export const MESSAGE_SENT = 'MESSAGE_SENT';
export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';


export function getMessagesAction() {
    return function(dispatch: Dispatch<any>) {
        makeRequest('/message/',{})
            .then(messages => {
                return dispatch({
                    type: MESSAGES_GET,
                    messages: messages
                });
            })
            .catch(err => {
                console.log(err)
            });
    };
}



export const messageReceivedAction = (message: Message) => {
    return {
        type: MESSAGE_RECEIVED,
        message: message as Message
    };
};

export const messageSendAction = (message: Message) => {
    return {
        type: MESSAGE_SEND,
        message: message as Message
    };
};

export const messageSentAction = (message: Message) => {
    return {
        type: MESSAGE_SENT,
        message: message as Message
    };
};
