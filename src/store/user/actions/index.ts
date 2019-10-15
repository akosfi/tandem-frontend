import {Dispatch} from "redux";
import Cookies from 'js-cookie';
import {makeRequest} from "../../../util";
import {connectSocketAction} from "../../socket/actions";

export function getCurrentUserAction() {
    return function(dispatch: Dispatch<any>) {
        const jwt_user = Cookies.get('jwt_user');

        if(jwt_user) {
            dispatch({
                type: USER_CURRENT_AUTHENTICATED,
                user: JSON.parse((jwt_user as string))
            });
            return dispatch(connectSocketAction());
        }

        makeRequest('/user', {})
            .then(data => {
                dispatch({
                    type: USER_CURRENT_AUTHENTICATED,
                    user: data
                });
                return dispatch(connectSocketAction());
            })
            .catch(err => {
                if(err.message === '403'){
                    return dispatch({
                        type: USER_CURRENT_NOT_AUTHENTICATED,
                    });
                }
            });
    }
}


export function loginUserAction(name: string) {
    return function(dispatch: Dispatch<any>) {
        makeRequest('/login',
        {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({name})
            })
            .then(data => {
                dispatch({
                    type: USER_CURRENT_AUTHENTICATED,
                    user: data
                });
                return dispatch(connectSocketAction());
            });
    };
}



export function getActiveUsersList() {
    return function(dispatch: Dispatch<any>) {
        makeRequest('/getActiveUsers', {})
            .then(users => {
                return dispatch({
                    type: USERS_ACTIVE_RECEIVED,
                    users
                })
            })
            .catch(err => console.log("Err fetching active users"));
    }
}

export function getKnownUsersList() {
    return function(dispatch: Dispatch<any>) {
        makeRequest('/getKnowUsers', {})
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
        makeRequest('/getRecommendedUsers', {})
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
