import React, {Dispatch} from "react";
import {connect} from "react-redux";
import {eventGetAction, userJoinEventAction, userLeaveEventAction} from "../store/events/actions";
import Event from "../store/events/models/Event";
import {NavLink} from "react-router-dom";
import {Button, Intent} from "@blueprintjs/core";

class EventPage extends React.Component<any, any> {
    constructor(props: any){
        super(props);

        this.state = {

        };

        this.props.loadEvent(Number(this.props.match.params.id));
    }

    renderEvent() {
        if(this.props.event) {
            return (
                <div className={"tan-event"}>
                    <span className={"tan-event-date"}>2019. 11. 12.</span>
                    <h1 className={"tan-event-title"}>{this.props.event.name}</h1>
                    <span className={"tan-event-peopleGoing"}>{this.props.event.people_going} people going</span>
                    <div className={"tan-event-cover"}>
                        <img
                            src={`http://127.0.0.1:5000/img/${this.props.event.cover_photo}`} alt="asd"/>
                    </div>
                    <h2>Details</h2>
                    <p className={"tan-event-details"}>{this.props.event.details}</p>

                    {this.renderJoinButton()}

                </div>
            );
        }
        else {
            return <p>Loading...</p>
        }
    }

    renderJoinButton() {
        if(!this.props.event.user_joined) {
            return (
                <Button
                    className={"tan-event-joinButton"}
                    intent={Intent.SUCCESS}
                    text={"Join event"}
                    onClick={() => this.props.joinEvent(this.props.event.id)}
                />
            );
        }
        else {
            return (
                <Button
                    className={"tan-event-joinButton"}
                    intent={Intent.DANGER}
                    text={"Leave event"}
                    onClick={() => this.props.leaveEvent(this.props.event.id)}
                />
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderEvent()}
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        event: state.events.current
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        loadEvent: (id: number) => dispatch(eventGetAction(id)),
        joinEvent: (eventId: number) => dispatch(userJoinEventAction(eventId)),
        leaveEvent: (eventId: number) => dispatch(userLeaveEventAction(eventId)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EventPage);

