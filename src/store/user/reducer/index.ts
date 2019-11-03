import {User} from "../models/User";
import {
    USER_CURRENT_NOT_AUTHENTICATED,
    USER_CURRENT_AUTHENTICATED,
    USERS_ACTIVE_RECEIVED,
    USERS_KNOWN_RECEIVED,
    USERS_RECOMMENDED_RECEIVED, USER_LOGIN_STATUS_CHANGED, USER_REGISTRATION_STATUS_CHANGED, USER_CREATED
} from "../actions";

export enum UserStatus {
    Initial,
    LoggedIn,
    NotLoggedIn,
}

export enum UserCreationStatus {
    Initial,
    UserCreated,
}

const INITIAL_STATE = {
    currentUserAuthenticated: UserStatus.Initial as UserStatus,
    current: {} as User,
    activeUsers: [] as Array<User>,
    knownUsers: [] as Array<User>,
    recommendedUsers: [] as Array<User>,
    userCreationStatus: UserCreationStatus.Initial as UserCreationStatus,
};

function userReducer(state=INITIAL_STATE, action: any) {
    let reduced;
    switch (action.type){
        case USER_CURRENT_AUTHENTICATED:
            reduced = {...state, current: action.user, currentUserAuthenticated: UserStatus.LoggedIn};
            break;
        case USER_CURRENT_NOT_AUTHENTICATED:
            reduced = {...state, currentUserAuthenticated: UserStatus.NotLoggedIn };
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
        case USER_LOGIN_STATUS_CHANGED:
            reduced = {...state, userLoginStatus: action.status};
            break;
        /*case USER_REGISTRATION_STATUS_CHANGED:
            reduced = {...state, newUserCreationStatus: action.status};
            break;*/
        case USER_CREATED:
            reduced = {...state, userCreationStatus: UserCreationStatus.UserCreated};
            break;
        default:
            reduced = state;
            break;
    }
    return reduced;
}

export default userReducer;
