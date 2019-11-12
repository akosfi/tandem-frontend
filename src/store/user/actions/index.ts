import {Dispatch} from "redux";
import Cookies from 'js-cookie';
import {makeRequest} from "../../../util";
import {connectSocketAction} from "../../socket/actions";
import {AuthType} from "../models/User";

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
                    status: data
                });
            })
            .catch(data => {

                ///???

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

export function getKnownUsersList() {
    return function(dispatch: Dispatch<any>) {
        makeRequest('/getKnowUsers/', {})
            .then(users => {
                return dispatch({
                    type: USERS_KNOWN_RECEIVED,
                    users
                })
            })
            .catch(err => console.log("Err fetching known users"));
    }
}

export function getRecommendedUsersList() {
    return function(dispatch: Dispatch<any>) {
        makeRequest('/getRecommendedUsers/', {})
            .then(users => {
                return dispatch({
                    type: USERS_KNOWN_RECEIVED,
                    users
                })
            })
            .catch(err => console.log("Err fetching recommended users"));
    }
}

export const USER_CURRENT_AUTHENTICATED = 'USER_CURRENT_AUTHENTICATED';
export const USER_CURRENT_NOT_AUTHENTICATED = 'USER_CURRENT_NOT_AUTHENTICATED';
export const USERS_ACTIVE_RECEIVED = 'USERS_ACTIVE_RECEIVED';
export const USERS_KNOWN_RECEIVED = 'USERS_KNOWN_RECEIVED';
export const USERS_RECOMMENDED_RECEIVED = 'USERS_RECOMMENDED_RECEIVED';
export const USER_REGISTRATION_STATUS_CHANGED = 'USER_REGISTRATION_STATUS_CHANGED';
export const USER_LOGIN_STATUS_CHANGED = 'USER_LOGIN_STATUS_CHANGED';
export const USER_CREATED = 'USER_CREATED';
