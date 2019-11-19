import {Dispatch} from "redux";
import Cookies from 'js-cookie';
import {makeRequest} from "../../../util";
import {connectSocketAction} from "../../socket/actions";
import {AuthType} from "../models/User";
import {MessageType} from "../../message/models/Message";
import {messageSendAction} from "../../message/actions";

export function getCurrentUserAction() {
    return function(dispatch: Dispatch<any>) {
        const jwt_user = Cookies.get('jwt_user');
        if(jwt_user) {
            let parsedUser = JSON.parse(jwt_user as string);
            parsedUser.id = parsedUser.id.toString();

            return dispatch({
                type: USER_CURRENT_AUTHENTICATED,
                user: parsedUser
            });
        }

        makeRequest('/user/me', {})
            .then(data => {
                return dispatch({
                    type: USER_CURRENT_AUTHENTICATED,
                    user: data.user
                });
            })
            .catch((res) => {
                return dispatch({
                    type: USER_CURRENT_NOT_AUTHENTICATED,
                });
            });
    }
}

export function registerUserAction(full_name: string, email: string, password: string){
    return function(dispatch: Dispatch<any>) {
        makeRequest('/user/',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({full_name, email, password})
            })
            .then(data => {
                return dispatch({
                    type: USER_CREATED,
                    user: data.data
                });
            })
            .catch(data => {

            });
    };
}

export function loginUserAction(email: string, password: string) {
    return function(dispatch: Dispatch<any>) {
        makeRequest('/user/login',
        {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password})
            })
            .then(data => {
                return dispatch({
                    type: USER_CURRENT_AUTHENTICATED,
                    user: data
                });
            })
            .catch(err => {
                console.log(err)
            });
    };
}

export function loginUserWithThirdPartyAction(email: string, full_name: string, access_token: string, auth_type: AuthType) {
    return function(dispatch: Dispatch<any>) {
        makeRequest('/user/third-party',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, full_name, access_token, auth_type})
            })
            .then(data => {
                dispatch({
                    type: USER_CURRENT_AUTHENTICATED,
                    user: data
                });
                return dispatch(connectSocketAction());
            })
            .catch(err => {
                console.log(err)
            });
    };
}


export function userPreferencesPostAction(preferences: any) {
    return function(dispatch: Dispatch<any>) {
        makeRequest('/user/preferences',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...preferences})
            })
            .then(data => {
                return dispatch({
                    type: USER_CURRENT_AUTHENTICATED,
                    user: data
                });
            })
            .catch(err => {
                console.log(err)
            });
    };
}

export function uploadProfilePicture(file: any) {

    const data = new FormData();
    data.append('file', file);

    return function(dispatch: Dispatch<any>) {
        makeRequest('/user/picture',{
            method: "POST",
            body: data
        })
            .then(response => {
                //response data
                return dispatch({
                    type: USER_PICTURE_UPDATED,
                    picture: response.data
                });
            })
            .catch(err => {
                console.log(err)
            });
    };
}

export function getActiveUsersList() {
    return function(dispatch: Dispatch<any>) {
        makeRequest('/user/active', {})
            .then(users => {
                return dispatch({
                    type: USERS_ACTIVE_RECEIVED,
                    users: users.users
                })
            })
            .catch(err => console.log("Err fetching active users"));
    }
}

export function connectWithUser(id: number) {
    return function(dispatch: Dispatch<any>) {
        makeRequest(`/user/${id}/add`, {})
            .then(response => {
                console.log(response)
            })
            .catch(err => console.log("Err adding known users"));
    }
}

export function getUsersKnownList() {
    return function(dispatch: Dispatch<any>) {
        makeRequest('/user/known', {})
            .then(response => {
                return dispatch({
                    type: USERS_KNOWN_GET,
                    users: response.users
                })
            })
            .catch(err => console.log("Err fetching known users"));
    }
}

export function getUsersRecommendedList() {
    return function(dispatch: Dispatch<any>) {
        makeRequest('/user/recommended', {})
            .then(response => {
                return dispatch({
                    type: USERS_RECOMMENDED_GET,
                    users: response.users
                })
            })
            .catch(err => console.log("Err fetching recommended users"));
    }
}

export const USER_CURRENT_AUTHENTICATED = 'USER_CURRENT_AUTHENTICATED';
export const USER_CURRENT_NOT_AUTHENTICATED = 'USER_CURRENT_NOT_AUTHENTICATED';
export const USERS_ACTIVE_RECEIVED = 'USERS_ACTIVE_RECEIVED';
export const USERS_KNOWN_GET = 'USERS_KNOWN_GET';
export const USER_ADD_KNOWN = 'USER_ADD_KNOWN';
export const USERS_RECOMMENDED_GET = 'USERS_RECOMMENDED_GET';
export const USER_REGISTRATION_STATUS_CHANGED = 'USER_REGISTRATION_STATUS_CHANGED';
export const USER_LOGIN_STATUS_CHANGED = 'USER_LOGIN_STATUS_CHANGED';
export const USER_CREATED = 'USER_CREATED';
export const USER_PICTURE_UPDATED = 'USER_PICTURE_UPDATED';
