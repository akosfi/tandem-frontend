import {EVENT_CREATED, EVENTS_GET, EVENTS_USER_CREATED_GET, EVENTS_USER_GOING_GET} from "../actions";


const INITIAL_STATE = {
    events: [] as Array<Event>,
    eventsUserGoing: [] as Array<Event>,
    eventsUserCreated: [] as Array<Event>,
    eventCreationStatus: {}
};

function eventsReducer(state=INITIAL_STATE, action: any) {
    let reduced;
    switch (action.type)
    {
        case EVENTS_GET:
            reduced = {...state, events: action.events};
            break;

        case EVENTS_USER_GOING_GET:
            reduced = {...state, eventsUserGoing: action.events};
            break;

        case EVENTS_USER_CREATED_GET:
            reduced = {...state, eventsUserCreated: action.events};
            break;

        case EVENT_CREATED:
            reduced = {
                ...state,
                eventsUserCreated: [...state.eventsUserCreated, action.event],
                eventsUserGoing: [...state.eventsUserGoing, action.event],
                eventCreationStatus: {
                    created: true,
                    event: action.event
                }
            };
            break;

        default:
            reduced = state;
    }
    return reduced;
}

export default eventsReducer;
