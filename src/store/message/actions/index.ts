export const MESSAGES_GET = 'MESSAGES_GET';
export const MESSAGE_SEND = 'MESSAGE_SEND';
export const MESSAGE_SENT = 'MESSAGE_SENT';
export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';

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
};

export const messageSendAction = (message: any) => {
    return {
        type: MESSAGE_SEND,
        message: message
    };
};

export const messageSentAction = (message: any) => {
    return {
        type: MESSAGE_SENT,
        message: message
    };
};
