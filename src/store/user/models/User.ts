interface BaseUser {
    full_name: string;
    email: string;
    registration_finished: boolean;
}

export interface User extends BaseUser{
    id: string;
    profile_pic_url: string;
}

export interface ThirdPartyUser extends BaseUser{
    access_token: string;
    auth_type: AuthType;
}


export enum AuthType {
    PASSWORD='PASSWORD',
    T_FACEBOOK='T_FACEBOOK',
    T_GOOGLE='T_GOOGLE',
}
