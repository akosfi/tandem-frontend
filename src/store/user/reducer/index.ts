import {User} from "../models/User";
import {
    USER_CURRENT_NOT_AUTHENTICATED,
    USER_CURRENT_AUTHENTICATED,
    USERS_ACTIVE_RECEIVED,
    USERS_KNOWN_GET,
    USERS_RECOMMENDED_GET,
    USER_LOGIN_STATUS_CHANGED,
    USER_REGISTRATION_STATUS_CHANGED,
    USER_CREATED,
    USER_PICTURE_UPDATED
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
            //check for profile picture
            reduced = {
                ...state,
                current: action.user,
                currentUserAuthenticated: UserStatus.LoggedIn
            };
            break;
        case USER_CURRENT_NOT_AUTHENTICATED:
            reduced = {...state, currentUserAuthenticated: UserStatus.NotLoggedIn };
            break;
        case USERS_ACTIVE_RECEIVED:
            reduced = {...state, activeUsers: action.users};
            break;
        case USERS_KNOWN_GET:
            reduced = {...state, knownUsers: action.users};
            break;
        case USERS_RECOMMENDED_GET:
            reduced = {...state, recommendedUsers: action.users};
            break;
        case USER_LOGIN_STATUS_CHANGED:
            reduced = {...state, userLoginStatus: action.status};
            break;
        case USER_PICTURE_UPDATED:
            reduced = {
                ...state,
                current: {
                    ...state.current,
                    profile_pic_url: action.picture
                }
            };
            break;
        case USER_CREATED:
            reduced = {
                ...state,
                userCreationStatus: UserCreationStatus.UserCreated,
                current: action.user
            };
            break;
        default:
            reduced = state;
            break;
    }
    return reduced;
}

export default userReducer;
