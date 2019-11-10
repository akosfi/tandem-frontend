import React, {Dispatch} from "react";
import {connect} from "react-redux";
import {eventGetAction, userJoinEventAction} from "../store/events/actions";
import Event from "../store/events/models/Event";
import {NavLink} from "react-router-dom";

class EventPage extends React.Component<any, any> {
    constructor(props: any){
        super(props);

        this.state = {

        };

        this.props.loadEvent(Number(this.props.match.params.id));
//load detailed event here with user_Created boolean user_joined boolean
    }

    renderEvent() {
        if(this.props.event) {
            return (<div>
                <p>{this.props.event.name}</p>
                <h4 onClick={() => this.props.joinEvent(this.props.event.id)}>JOIN</h4>
            </div>)
        }
        else {
            return <p>Loading...</p>
        }
    }

    render() {
        return (
            <div>
                <NavLink to="/event"> --Events </NavLink>
                {this.renderEvent()}
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        event: state.events.events.find((e: Event) => e.id === Number(ownProps.match.params.id))
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        loadEvent: (id: number) => dispatch(eventGetAction(id)),
        joinEvent: (eventId: number) => dispatch(userJoinEventAction(eventId))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EventPage);

