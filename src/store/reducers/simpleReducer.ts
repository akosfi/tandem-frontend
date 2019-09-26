import {IAction} from "../actions/action-type";

export default (state = {}, action: IAction) => {
    switch (action.type) {
        case 'SIMPLE_ACTION':
            return {
                result: action.payload
            };
        default:
            return state
    }
}
