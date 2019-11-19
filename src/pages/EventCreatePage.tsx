import React from "react";
import {connect} from "react-redux";
import {Dispatch} from "react";
import {Redirect} from 'react-router'
import {eventCreateAction} from "../store/events/actions";
import Event from '../store/events/models/Event';
import {loginUserAction} from "../store/user/actions";
import {NavLink} from "react-router-dom";
import {Alignment, Button, Checkbox, FileInput, InputGroup, Intent, Label, TextArea} from "@blueprintjs/core";

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
            details: this.state.details
        },
        this.state.cover_photo);
    }

    redirectIfEventCreated() {
        if(this.props.eventCreationStatus && this.props.eventCreationStatus.created){
            return <Redirect to={`/event/${this.props.eventCreationStatus.event.id}`} />
        }
    }

    render() {
        return (
            <div>
                <h1
                    className={"tan-text-center"}>
                    Create an event</h1>

                <div className={"tan-inputGroup"}>
                    <form onSubmit={this.handleEventCreationSubmit}>
                        <Label>
                            Name
                            <InputGroup
                                disabled={false}
                                large={false}
                                placeholder="Email"
                                onChange={this.handleNameInputChange}
                                value={this.state.name}
                                type={"text"}
                            />
                        </Label>
                        <Checkbox
                            checked={this.state.public}
                            label="Public"
                            alignIndicator={Alignment.RIGHT}
                            inline={false}
                            large={false}
                            onChange={this.handleEventVisibilityInputChange}
                        />
                        <Label>
                            Location
                            <InputGroup
                                disabled={false}
                                large={false}
                                placeholder="Email"
                                onChange={this.handleLocationInputChange}
                                value={this.state.location}
                                type={"text"}
                            />
                        </Label>
                        <Label>
                            Details
                            <TextArea
                                growVertically={true}
                                intent={Intent.PRIMARY}
                                onChange={this.handleDetailsInputChange}
                                value={this.state.details}
                                placeholder={'Details'}
                            />
                        </Label>

                        <Label>
                            Cover Photo
                            <FileInput
                                text="Choose file..."
                                onInputChange={this.handleCoverInputChange} />
                        </Label>


                        <div className={'tan-right'}>
                            <Button
                                intent={Intent.SUCCESS}
                                icon="refresh"
                                type={"submit"}
                                text={"Create"} />
                        </div>

                    </form>

                {this.redirectIfEventCreated()}
                </div>
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
        createEvent: (event: Event, file: any) => dispatch(eventCreateAction(event, file))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EventCreatePage);
