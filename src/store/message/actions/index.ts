import {Message} from "../models/Message";

export const MESSAGES_GET = 'MESSAGES_GET';
export const MESSAGE_SEND = 'MESSAGE_SEND';
export const MESSAGE_SENT = 'MESSAGE_SENT';
export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';

export const messageReceivedAction = (message: Message) => {
    return {
        type: MESSAGE_RECEIVED,
        message: message as Message
    };
};

export const messagesGetAction = (messages: Array<Message>) => {
    return {
        type: MESSAGES_GET,
        messages: messages as Array<Message>
    }
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
