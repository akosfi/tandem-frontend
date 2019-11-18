import {
    EVENT_CREATED,
    EVENT_GET,
    EVENT_JOINED_BY_USER, EVENT_LEFT_BY_USER,
    EVENTS_GET,
    EVENTS_USER_CREATED_GET,
    EVENTS_USER_GOING_GET
} from "../actions";

import Event from "../models/Event";
import EventDetailed from "../models/EventDetailed";

const INITIAL_STATE = {
    current: {} as EventDetailed,
    events: [] as Array<Event>,
    eventsUserGoing: [] as Array<Event>,
    eventsUserCreated: [] as Array<Event>,
    eventCreationStatus: {}
};

function eventsReducer(state=INITIAL_STATE, action: any) {
    let reduced;
    switch (action.type)
    {
        case EVENT_JOINED_BY_USER:
            reduced = {
                ...state,
                current: {
                    ...state.current,
                    user_joined: true
                }
            };
            break;

        case EVENT_LEFT_BY_USER:
            reduced = {
                ...state,
                current: {
                    ...state.current,
                    user_joined: false
                }
            };
            break;

        case EVENTS_GET:
            reduced = {...state, events: action.events};
            break;

        case EVENT_GET:
            reduced = {...state, current: action.event};
            //const events = state.events;

            /*let index = events.findIndex((e: Event) => e.id === action.event.id);
            if(index === -1) {
                reduced = {
                    ...state,
                    events: [...state.events, action.event]
                };
            }
            else {
                events[index] = action.event;
                reduced = {
                    ...state,
                    events: [...events]
                };
            }*/
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
