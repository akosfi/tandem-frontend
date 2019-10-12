// Initial state
import {
    USER_CURRENT_RECEIVED,
    USER_CURRENT_FAILED,
    USERS_ACTIVE_RECEIVED,
    USERS_KNOWN_RECEIVED, USERS_RECOMMENDED_RECEIVED
} from "../actions/action-consts";
import {CurrentUser, User} from "../models/User";

const INITIAL_STATE = {
    currentUserSignedIn: false as boolean,
    current: {} as User,
    activeUsers: [] as Array<User>,
    knownUsers: [] as Array<User>,
    recommendedUsers: [] as Array<User>,
};

/*export const USER_CURRENT_RECEIVED = 'USER_CURRENT_RECEIVED';
export const USER_CURRENT_FAILED = 'USER_CURRENT_FAILED';
export const USERS_ACTIVE_RECEIVED = 'USERS_ACTIVE_RECEIVED';
export const USERS_KNOWN_RECEIVED = 'USERS_KNOWN_RECEIVED';
export const USERS_RECOMMENDED_RECEIVED = 'USERS_RECOMMENDED_RECEIVED';*/
// USER reducer
function userReducer(state=INITIAL_STATE, action: any) {
    let reduced;
    switch (action.type){
        case USER_CURRENT_RECEIVED:
            reduced = state;
            reduced.current = {...action.user, signedIn: true};
            reduced.currentUserSignedIn = true;
            break;
        case USER_CURRENT_FAILED:
            reduced = state;
            reduced.currentUserSignedIn = false;
            break;
        case USERS_ACTIVE_RECEIVED:
            reduced = state;
            reduced.activeUsers = action.users;
            break;
        case USERS_KNOWN_RECEIVED:
            reduced = state;
            reduced.knownUsers = action.users;
            break;
        case USERS_RECOMMENDED_RECEIVED:
            reduced = state;
            reduced.recommendedUsers = action.users;
            break;
        default:
            reduced = state;
            break;
    }
    return reduced;
}

export default userReducer;
