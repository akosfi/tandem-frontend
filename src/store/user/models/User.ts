export interface User {
    id: string;
    profilePicUrl: string;
    userName: string;
}


export interface CurrentUser extends User{
    signedIn: boolean;
}
