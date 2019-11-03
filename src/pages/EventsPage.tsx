import React, {Dispatch} from "react";
import {connect} from "react-redux";
import Event from "../store/events/models/Event";

class EventsPage extends React.Component<any, any> {
    constructor(props: any){
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div>
                <h3>User created events</h3>
                {this.props.eventsUserCreated.map((event: Event) => {
                    return <p>{event.name}</p>
                })}
                <h3>Events</h3>
                {this.props.events.map((event: Event) => {
                    return <p>{event.name}</p>
                })}
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
