import React, {Dispatch} from "react";
import {connect} from "react-redux";
import {registerUserAction, uploadProfilePicture} from "../../store/user/actions";
import {UserCreationStatus} from "../../store/user/reducer";
import {Button, Checkbox, FileInput, InputGroup, Intent, Label} from "@blueprintjs/core";
import {NavLink} from "react-router-dom";
import ErrorToaster from "../shared/ErrorToaster";

class UserProfilePicture extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            profilePicture: {},
            profilePicturePreviewUrl: '' as string
        };
        this.renderProfilePicturePreview = this.renderProfilePicturePreview.bind(this);
        this.handleProfilePictureInputChange = this.handleProfilePictureInputChange.bind(this);
        this.handleProfilePictureUpload = this.handleProfilePictureUpload.bind(this);
        this.renderNextButton = this.renderNextButton.bind(this);
    }

    handleProfilePictureInputChange(event: any) {
        this.setState({
            profilePicture: event.target.files[0],
            profilePicturePreviewUrl: URL.createObjectURL(event.target.files[0])
        });
    }

    handleProfilePictureUpload(event: any) {
        const fileToUpload = this.state.profilePicture;
        this.props.uploadProfilePicture(fileToUpload);
    }

    renderProfilePicturePreview() {
        if(this.state.profilePicturePreviewUrl !== '') {
            return (<div className={'tan-avatar'}>
                <img src={this.state.profilePicturePreviewUrl} alt="preview_profile_pic"/>
            </div>);
        }
    }

    renderNextButton() {

        if(this.props.user.profile_pic_url) {
            return (<div className={'tan-right'}>
                <Button
                    intent={Intent.SUCCESS}
                    icon="refresh"
                    text={"Continue"}
                    onClick={this.props.nextClick}
                />
            </div>);
        }

    }

    render() {
        return (
            <div>
                <h1
                    className={"tan-text-center"}>
                    Choose Profile Picture</h1>

                <div className={"tan-inputGroup"}>

                    <Label>
                        Select profile picture
                        <FileInput
                            text="Choose file..."
                            onInputChange={this.handleProfilePictureInputChange} />
                    </Label>

                    {this.renderProfilePicturePreview()}

                    <div className={'tan-right'}>
                        <Button
                            intent={Intent.SUCCESS}
                            icon="refresh"
                            text={"Upload"}
                            onClick={this.handleProfilePictureUpload}
                        />
                    </div>

                    {this.renderNextButton()}

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.users.current,
        userCreationStatus: state.users.userCreationStatus
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        uploadProfilePicture: (file: any) => dispatch(uploadProfilePicture(file))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePicture);
