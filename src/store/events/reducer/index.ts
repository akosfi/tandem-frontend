import {User} from "../../user/models/User";
import {MESSAGE_RECEIVED, MESSAGE_SENT, MESSAGES_GET} from "../../message/actions";
import {EVENTS_ADD} from "../actions";

const INITIAL_STATE = {
    events: [] as Array<Event>,
};

function eventsReducer(state=INITIAL_STATE, action: any) {
    let reduced;
    switch (action.type)
    {
        case EVENTS_ADD:
            reduced = Object.assign({}, state, {
                events: action.events
            });
            break;

        default:
            reduced = state;
    }
    return reduced;
}
