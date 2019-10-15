export default interface Event {
    id: string;
    title: string;
    description: string;
    date: Date;
    coverPicUrl: string;
    numberOfPeopleGoing: number;
    eventType: EventType;
}


export enum EventType {
    Public,
    InviteOnly
}
