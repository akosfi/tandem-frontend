import {Dispatch} from "redux";


export const USER_CURRENT_RECEIVED = 'USER_CURRENT_RECEIVED';
export const USER_CURRENT_FAILED = 'USER_CURRENT_FAILED';
export const USERS_ACTIVE_RECEIVED = 'USERS_ACTIVE_RECEIVED';
export const USERS_KNOWN_RECEIVED = 'USERS_KNOWN_RECEIVED';
export const USERS_RECOMMENDED_RECEIVED = 'USERS_RECOMMENDED_RECEIVED';

export function getCurrentUserAction() {
    return function(dispatch: Dispatch<any>) {
        fetch("http://localhost:8000/getUser")
          .then(response => response.json())
          .then(data => dispatch({
              type: USER_CURRENT_RECEIVED,
              payload: data
            }))
          .catch(error => dispatch({
              type: USER_CURRENT_FAILED,
              payload: error
            })
          );
    }
}

export function getActiveUsersList() {
    return function(dispatch: Dispatch<any>) {
        fetch('http://localhost:8000/getActiveUsers')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                return dispatch({
                    type: USERS_ACTIVE_RECEIVED,
                    users: data
                })})
            .catch(error => console.log("ERROR ACTIVE USERS FETCH"));
    }
}

export function getKnownUsersList() {
    return function(dispatch: Dispatch<any>) {
        fetch('http://localhost:8000/getKnowUsers')
            .then(response => response.json())
            .then(data => dispatch({
                type: USERS_KNOWN_RECEIVED,
                users: data
            }))
            .catch(error => console.log("ERROR KNOWN USERS FETCH"));
    }
}

export function getRecommendedUsersList() {
    return function(dispatch: Dispatch<any>) {
        fetch('http://localhost:8000/getRecommendedUsers')
            .then(response => response.json())
            .then(data => dispatch({
                type: USERS_RECOMMENDED_RECEIVED,
                users: data
            }))
            .catch(error => console.log("ERROR RECOMMENDED USERS FETCH"));
    }
}
