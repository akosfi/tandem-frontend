import React, {Dispatch} from "react";
import {connect} from "react-redux";
import {eventGetAction} from "../store/events/actions";
import Event from "../store/events/models/Event";

class EventPage extends React.Component<any, any> {
    constructor(props: any){
        super(props);

        this.state = {

        };

        this.props.loadEvent(Number(this.props.match.params.id));
    }

    renderEvent() {
        if(this.props.event) {
            return <p>{this.props.event.name}</p>
        }
        else {
            return <p>Loading...</p>
        }
    }

    render() {
        return (
            <div>
                <span></span>
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
        loadEvent: (id: number) => dispatch(eventGetAction(id))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EventPage);

