import React, {Dispatch} from "react";
import {connect} from "react-redux";
import {eventGetAction, userJoinEventAction} from "../store/events/actions";
import Event from "../store/events/models/Event";
import {NavLink} from "react-router-dom";
import {Button, Intent} from "@blueprintjs/core";

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
            return (
                <div className={"tan-event"}>
                    <span className={"tan-event-date"}>2019. 11. 12.</span>
                    <h1 className={"tan-event-title"}>{this.props.event.name}</h1>
                    <span className={"tan-event-peopleGoing"}>43 people going</span>
                    <div className={"tan-event-cover"}>
                        <img
                            src="https://cdn.nwmgroups.hu/s/img/i/1705/20170531gyor-felujitott-varosresz.jpg?w=645&h=441" alt="asd"/>
                    </div>
                    <h2>Details</h2>
                    <p className={"tan-event-details"}>{this.props.event.details}</p>
                    <Button
                        className={"tan-event-joinButton"}
                        intent={Intent.SUCCESS}
                        text={"Join event"}
                        onClick={() => this.props.joinEvent(this.props.event.id)}
                    />
                    <Button
                        className={"tan-event-joinButton"}
                        intent={Intent.DANGER}
                        text={"Leave event"}
                        onClick={() => this.props.joinEvent(this.props.event.id)}
                    />
                </div>
            );
        }
        else {
            return <p>Loading...</p>
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

