// Initial state
import {USER_CURRENT_RECEIVED, USER_CURRENT_FAILED} from "../actions/action-consts";

const INITIAL_STATE = {
    id: '' as string,
    username: '' as string
};

// USER reducer
function userReducer(state=INITIAL_STATE, action: any) {
    let reduced;
    switch (action.type){
        case USER_CURRENT_RECEIVED:
            reduced = Object.assign({}, state, action.user);
            break;
        case USER_CURRENT_FAILED:
            break;
        default:
            reduced = state;
            break;
    }
    return reduced;
}

export default userReducer;
