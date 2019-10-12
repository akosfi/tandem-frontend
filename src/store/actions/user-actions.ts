import {
    USER_CURRENT_RECEIVED,
    USER_CURRENT_FAILED,
    USERS_ACTIVE_RECEIVED,
    USERS_KNOWN_RECEIVED,
    USERS_RECOMMENDED_RECEIVED
} from "./action-consts";
import {Dispatch} from "redux";

export function getCurrentUserAction() {
    return function(dispatch: Dispatch<any>) {
        fetch("/getUser")
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
        fetch('/getActiveUsers')
            .then(response => response.json())
            .then(data => dispatch({
                type: USERS_ACTIVE_RECEIVED,
                payload: data
            }))
            .catch(error => console.log("ERROR ACTIVE USERS FETCH"));
    }
}

export function getKnownUsersList() {
    return function(dispatch: Dispatch<any>) {
        fetch('/getKnowUsers')
            .then(response => response.json())
            .then(data => dispatch({
                type: USERS_KNOWN_RECEIVED,
                payload: data
            }))
            .catch(error => console.log("ERROR KNOWN USERS FETCH"));
    }
}

export function getRecommendedUsersList() {
    return function(dispatch: Dispatch<any>) {
        fetch('/getRecommendedUsers')
            .then(response => response.json())
            .then(data => dispatch({
                type: USERS_RECOMMENDED_RECEIVED,
                payload: data
            }))
            .catch(error => console.log("ERROR RECOMMENDED USERS FETCH"));
    }
}
