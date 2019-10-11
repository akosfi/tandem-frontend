import {MESSAGE_RECEIVED, MESSAGE_SEND, MESSAGE_SENT, MESSAGES_GET} from "./action-consts";

export const messageReceivedAction = (message: any) => {
    return {
        type: MESSAGE_RECEIVED,
        message: message
    };
};

export const messagesGetAction = (messages: any) => {
    return {
        type: MESSAGES_GET,
        messages: messages
    }
}

export const messageSendAction = (message: any) => {
    return {
        type: MESSAGE_SEND,
        message: message
    };
};

export const messageSentAction = () => {
    return {
        type: MESSAGE_SENT
    };
};
