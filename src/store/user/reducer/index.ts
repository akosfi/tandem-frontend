// Initial state
import {CurrentUser, User} from "../models/User";
import {
    USER_CURRENT_FAILED,
    USER_CURRENT_RECEIVED,
    USERS_ACTIVE_RECEIVED,
    USERS_KNOWN_RECEIVED,
    USERS_RECOMMENDED_RECEIVED
} from "../actions";

const INITIAL_STATE = {
    currentUserSignedIn: false as boolean,
    current: {},
    activeUsers: [] as Array<User>,
    knownUsers: [] as Array<User>,
    recommendedUsers: [] as Array<User>,
};

// USER reducer
function userReducer(state=INITIAL_STATE, action: any) {
    let reduced;
    switch (action.type){
        case USER_CURRENT_RECEIVED:
            reduced = {...state, current: action.user, currentUserSignedIn: true};
            break;
        case USER_CURRENT_FAILED:
            reduced = {...state, currentUserSignedIn: false }
            break;
        case USERS_ACTIVE_RECEIVED:
            reduced = {...state, activeUsers: action.users};
            break;
        case USERS_KNOWN_RECEIVED:
            reduced = {...state, knownUsers: action.users};
            break;
        case USERS_RECOMMENDED_RECEIVED:
            reduced = {...state, recommendedUsers: action.users};
            break;
        default:
            reduced = state;
            break;
    }
    return reduced;
}

export default userReducer;
