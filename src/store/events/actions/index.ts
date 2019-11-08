import {Dispatch} from "redux";
import {makeRequest} from "../../../util";
import Event from "../models/Event";


export const EVENT_GET = 'EVENT_GET';
export const EVENTS_GET = 'EVENTS_GET';
export const EVENTS_USER_GOING_GET = 'EVENTS_USER_GOING_GET';
export const EVENTS_USER_CREATED_GET = 'EVENTS_USER_CREATED_GET';
export const EVENT_CREATED = 'EVENT_CREATED';

export function eventsGetAction() {
    return function(dispatch: Dispatch<any>) {
        makeRequest('/event/',{})
            .then(events => {
                return dispatch({
                    type: EVENTS_GET,
                    events
                });
            })
            .catch(err => {
                console.log(err)
            });
    };
}

export function eventGetAction(id: number) {
    return function(dispatch: Dispatch<any>) {
        makeRequest(`/event/${id}`,{})
            .then(event => {
                return dispatch({
                    type: EVENT_GET,
                    event
                });
            })
            .catch(err => {
                console.log(err)
            });
    };
}

export function userCreatedEventsGetAction(){
    return function(dispatch: Dispatch<any>) {
        makeRequest('/event/userCreated',{})
            .then(events => {
                return dispatch({
                    type: EVENTS_USER_CREATED_GET,
                    events
                });
            })
            .catch(err => {
                console.log(err)
            });
    };
}

export function userGoingEventsGetAction() {
    return function(dispatch: Dispatch<any>) {
        makeRequest('/event/userGoing',{})
            .then(events => {
                return dispatch({
                    type: EVENTS_USER_GOING_GET,
                    events
                });
            })
            .catch(err => {
                console.log(err)
            });
    };
}

export function userJoinEventAction(eventId: number) {
    return function(dispatch: Dispatch<any>) {
        makeRequest(`/event/${eventId}/join`,{})
            .then(event => {
                /*return dispatch({
                    type: EVENTS_USER_GOING_GET,
                    events
                });*/
            })
            .catch(err => {
                console.log(err)
            });
    };
}

export function eventCreateAction(event: Event) {
    return function(dispatch: Dispatch<any>) {
        makeRequest('/event/',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event)
            })
            .then(response => {
                return dispatch({
                    type: EVENT_CREATED,
                    event: response.data
                });
            })
            .catch(error => console.log(error))
    };
}
