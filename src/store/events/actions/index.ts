import {Dispatch} from "redux";
import {makeRequest} from "../../../util";
import Event from "../models/Event";

export const EVENTS_ADD = 'EVENTS_ADD';

export const eventsAddAction = (events: Array<Event>) => {
    return {
        type: EVENTS_ADD,
        messages: events as Array<Event>
    }
};


export function eventsFetchAction(name: string) {
    return function(dispatch: Dispatch<any>) {
        makeRequest('/events/', {})
            .then(events => eventsAddAction(events))
            .catch(error => console.log("ERROR FETCHING EVENTS"));
    };
}

export function eventCreateAction(event: Event) {
    return function(dispatch: Dispatch<any>) {
        makeRequest('/events/',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event)
            })
            .then(event => {

            })
            .catch(error => console.log("ERROR POSTING EVENT"))
    };
}
