import React, {Dispatch} from "react";
import {connect} from "react-redux";
import Event from "../store/events/models/Event";
import {eventsGetAction, eventsUserCreatedGetAction, eventsUserGoingGetAction} from "../store/events/actions";
import {NavLink} from "react-router-dom";
import {Button, Intent} from "@blueprintjs/core";

class EventsPage extends React.Component<any, any> {
    constructor(props: any){
        super(props);

        this.state = {};
        this.props.getEventsAll();
        this.props.getEventsUserCreated();
        this.props.getEventsGoing();
    }

    renderAllEvents() {
        if(this.props.events) {
            return (
                <div className={'tan-events'}>
                    {this.props.events.map((event: Event) => {
                        return this.renderEvent(event);
                    })}
                </div>
            );
        }
    }

    renderEvent(event: Event) {
        return (
            <NavLink to={`/event/${event.id}`}>
                <div className={'tan-events-item'}>
                    <span className={'tan-events-item-title'}><b>{event.name}</b></span>
                    <span className={'tan-events-item-date'}>2019. 11. 11.</span>
                </div>
            </NavLink>
        );
    }

    renderUserCreatedEvents() {
        if(this.props.eventsUserCreated && this.props.eventsUserCreated.length > 0) {
            return (
                <div className={'tan-events'}>
                    {this.props.eventsUserCreated.map((event: Event) => {
                      return this.renderEvent(event);
                    })}
                </div>
            );
        }
        else {
            return (
                <div>
                    <p>You don't have any event!</p>
                </div>
            );
        }
    }




    render() {
        return (
            <div>
                <h1>Your events</h1>
                {this.renderUserCreatedEvents()}
                <NavLink to="/event-create">
                    <Button
                        intent={Intent.SUCCESS}
                        icon="refresh"
                        text={"Create an event"} />
                </NavLink>

                <h1>Upcoming Events</h1>
                {this.renderAllEvents()}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        events: state.events.events,
        eventsUserCreated: state.events.eventsUserCreated,
        eventsUserGoing: state.events.eventsUserGoing,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getEventsAll: () => dispatch(eventsGetAction()),
        getEventsUserCreated: () => dispatch(eventsUserCreatedGetAction()),
        getEventsGoing: () => dispatch(eventsUserGoingGetAction()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
