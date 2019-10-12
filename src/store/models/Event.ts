export default interface Event {
    title: string;
    description: string;
    date: Date;
    coverPicUrl: string;
    numberOfPeopleGoing: number;
}


export enum EventType {
    Public,
    InviteOnly
}
