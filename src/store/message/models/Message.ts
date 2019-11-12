export enum MessageType {
    TEXT= "TEXT",
    IMAGE = "IMAGE",
}

export interface Message {
    sender_id: string;
    target_id: string;
    message: string;
    sent_at: Date;
    message_type: MessageType;
}
