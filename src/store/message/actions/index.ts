import {Message, MessageType} from "../models/Message";
import {Dispatch} from "redux";
import {makeRequest} from "../../../util";

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

export function sendImageMessageAction(file: any, sender_id: number, target_id: number) {

    const data = new FormData();
    data.append('file', file);

    return function(dispatch: Dispatch<any>) {
        makeRequest('/message/image',{
            method: "POST",
            body: data
            })
            .then(response => {
                return dispatch(messageSendAction({
                    sender_id: sender_id.toString(),
                    target_id: target_id.toString(),
                    message: response.data,
                    sent_at: new Date(),
                    message_type: MessageType.IMAGE
                }))
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
