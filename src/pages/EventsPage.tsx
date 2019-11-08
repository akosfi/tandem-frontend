import React, {Dispatch} from "react";
import {connect} from "react-redux";
import Event from "../store/events/models/Event";
import {eventsGetAction, eventsUserCreatedGetAction, eventsUserGoingGetAction} from "../store/events/actions";

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
            return (this.props.events.map((event: Event) => {
                return <p>{event.name}</p>
            }));
        }
    }

    renderUserCreatedEvents() {
        if(this.props.events) {
            return (this.props.events.map((event: Event) => {
                return <p>{event.name}</p>
            }));
        }
    }

    renderUserGoingEvents() {
        if(this.props.eventsUserGoing) {
            return (this.props.eventsUserGoing.map((event: Event) => {
                return <p>{event.name}</p>
            }));
        }
    }

    render() {
        return (
            <div>
                <h3>User created events</h3>
                {this.renderUserCreatedEvents()}
                <h3>User going events</h3>
                {this.renderUserGoingEvents()}
                <h3>Events</h3>
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
