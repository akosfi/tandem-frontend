export interface User {
    id: string;
    profilePicUrl: string;
    username: string;
}


export interface CurrentUser extends User{
    signedIn: boolean;
}
