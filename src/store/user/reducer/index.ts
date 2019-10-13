// Initial state
import {CurrentUser, User} from "../models/User";
import {
    USER_CURRENT_NOT_AUTHENTICATED,
    USER_CURRENT_AUTHENTICATED,
    USERS_ACTIVE_RECEIVED,
    USERS_KNOWN_RECEIVED,
    USERS_RECOMMENDED_RECEIVED
} from "../actions";

const INITIAL_STATE = {
    currentUserAuthenticated: false as boolean,
    current: {} as User,
    activeUsers: [] as Array<User>,
    knownUsers: [] as Array<User>,
    recommendedUsers: [] as Array<User>,
};

// USER reducer
function userReducer(state=INITIAL_STATE, action: any) {
    let reduced;
    switch (action.type){
        case USER_CURRENT_AUTHENTICATED:
            reduced = {...state, current: action.user, currentUserAuthenticated: true};
            break;
        case USER_CURRENT_NOT_AUTHENTICATED:
            reduced = {...state, currentUserAuthenticated: false }
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
