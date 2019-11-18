import React from "react";
import {connect} from "react-redux";
import {Dispatch} from "react";
import {Redirect} from 'react-router'
import {eventCreateAction} from "../store/events/actions";
import Event from '../store/events/models/Event';
import {loginUserAction} from "../store/user/actions";
import {NavLink} from "react-router-dom";

class EventCreatePage extends React.Component<any, any> {
    constructor(props: any){
        super(props);

        this.state = {
            name: "",
            date: (new Date()) as Date,
            public: false as boolean,
            location: "",
            details: "",
            cover_photo: {} as File,
        };

        this.handleNameInputChange = this.handleNameInputChange.bind(this);
        this.handleEventVisibilityInputChange = this.handleEventVisibilityInputChange.bind(this);
        this.handleLocationInputChange = this.handleLocationInputChange.bind(this);
        this.handleDetailsInputChange = this.handleDetailsInputChange.bind(this);
        this.handleEventCreationSubmit = this.handleEventCreationSubmit.bind(this);
        this.handleCoverInputChange = this.handleCoverInputChange.bind(this);
    }

    handleNameInputChange(event: any) {
        this.setState({name: event.target.value});
    }
    handleEventVisibilityInputChange() {
        this.setState({public: !this.state.public});
    }
    handleLocationInputChange(event: any) {
        this.setState({location: event.target.value});
    }
    handleDetailsInputChange(event: any) {
        this.setState({details: event.target.value});
    }
    handleCoverInputChange(event: any){
        this.setState({cover_photo: event.target.files[0]})
    }

    handleEventCreationSubmit(event: any) {
        event.preventDefault();

        this.props.createEvent({
            id: 0,
            name: this.state.name,
            date: this.state.date,
            public: this.state.public,
            location: this.state.location,
            details: this.state.details,
            cover_photo: this.state.cover_photo
        });
    }

    redirectIfEventCreated() {
        //console.log(this.props.eventCreationStatus);
        if(this.props.eventCreationStatus && this.props.eventCreationStatus.created){
            return <Redirect to={`/event/${this.props.eventCreationStatus.event.id}`} />
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleEventCreationSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.name} onChange={this.handleNameInputChange} />
                    </label>
                    <label>
                        Public:
                        <input type="checkbox" checked={this.state.public} onChange={this.handleEventVisibilityInputChange} />
                    </label>
                    <label>
                        Location:
                        <input type="text" value={this.state.location} onChange={this.handleLocationInputChange} />
                    </label>
                    <label>
                        Details:
                        <input type="text" value={this.state.details} onChange={this.handleDetailsInputChange} />
                    </label>
                    <label>
                        Cover:
                        <input type="file" name="file" onChange={this.handleCoverInputChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                {this.redirectIfEventCreated()}
            </div>
        );
    }
}



const mapStateToProps = (state: any) => {
    return {
        eventCreationStatus: state.events.eventCreationStatus
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        createEvent: (event: Event) => dispatch(eventCreateAction(event))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EventCreatePage);
