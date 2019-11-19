import React, {Dispatch} from "react";
import {connect} from "react-redux";
import {registerUserAction} from "../../store/user/actions";
import {UserCreationStatus} from "../../store/user/reducer";
import {Button, Checkbox, FileInput, InputGroup, Intent, Label} from "@blueprintjs/core";
import {NavLink} from "react-router-dom";
import ErrorToaster from "../shared/ErrorToaster";

class UserBasicData extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            fullNameInput: '',
            passwordInput: '',
            passwordRepeatInput: '',
            emailInput: '',
            termsAccepted: false,
            errors: [] as Array<String>,
            profilePicture: {},
            profilePicturePreviewUrl: '' as string
        };

        this.handleFullNameInputChange = this.handleFullNameInputChange.bind(this);
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
        this.handlePasswordRepeatInputChange = this.handlePasswordRepeatInputChange.bind(this);
        this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
        this.handleAcceptChange = this.handleAcceptChange.bind(this);
        this.handleRegistrationSubmit = this.handleRegistrationSubmit.bind(this);
    }

    handleFullNameInputChange(event: any) {
        this.setState({fullNameInput: event.target.value});
    }
    handlePasswordInputChange(event: any) {
        this.setState({passwordInput: event.target.value});
    }
    handlePasswordRepeatInputChange(event: any) {
        this.setState({passwordRepeatInput: event.target.value});
    }
    handleEmailInputChange(event: any) {
        this.setState({emailInput: event.target.value});
    }
    handleAcceptChange() {
        this.setState({
            termsAccepted: !this.state.termsAccepted
        });
    }
    handleRegistrationSubmit(event: any) {
        event.preventDefault();

        if(this.state.emailInput === ''||
            this.state.passwordInput === '' ||
            this.state.passwordRepeatInput === '' ||
            this.state.fullNameInput === ''){
            this.setState({
                errors: [...this.state.errors, "Please fill all fields!"]
            });
            return;
        }
        if(!this.state.termsAccepted){
            this.setState({
                errors: [...this.state.errors, "Please accept Terms and Conditions!"]
            });
            return;
        }
        if(this.state.passwordInput !== this.state.passwordRepeatInput){
            this.setState({
                errors: [...this.state.errors, "Password and Repeat Password field do not match!"]
            });
            return;
        }


        this.props.registerUser(
            this.state.fullNameInput,
            this.state.emailInput,
            this.state.passwordInput
        );
    }


    renderNextButton() {
        if(this.props.userCreationStatus === UserCreationStatus.UserCreated) {
            return this.props.nextClick();
        }
    }

    render() {
        return (
            <div>
                <h1
                    className={"tan-text-center"}>
                    Sign Up</h1>

                <div className={"tan-inputGroup"}>

                    <form onSubmit={this.handleRegistrationSubmit}>
                        <Label>
                            Email
                            <InputGroup
                                disabled={false}
                                large={false}
                                placeholder="Email"
                                onChange={this.handleEmailInputChange}
                                value={this.state.emailInput}
                                type={"email"}
                            />
                        </Label>
                        <Label>
                            Full Name:
                            <InputGroup
                                disabled={false}
                                large={false}
                                placeholder="Full Name"
                                onChange={this.handleFullNameInputChange}
                                value={this.state.fullNameInput}
                                type={"text"}
                            />
                        </Label>
                        <Label>
                            Password
                            <InputGroup
                                disabled={false}
                                large={false}
                                placeholder="Password"
                                onChange={this.handlePasswordInputChange}
                                value={this.state.passwordInput}
                                type={"password"}
                            />
                        </Label>

                        <Label>
                            Repeat password
                            <InputGroup
                                disabled={false}
                                large={false}
                                placeholder="Repeat password"
                                onChange={this.handlePasswordRepeatInputChange}
                                value={this.state.passwordRepeatInput}
                                type={"password"}
                            />
                        </Label>

                        <Checkbox
                            value={this.state.termsAccepted}
                            onChange={this.handleAcceptChange}
                            label="I accept the terms and conditions."
                        />

                        <div className={'tan-right'}>
                            <Button
                                intent={Intent.SUCCESS}
                                icon="refresh"
                                type={"submit"}
                                text={"Sign up"} />
                        </div>
                    </form>

                    <p
                        className={"tan-text-right"}>
                        Already have an account?
                        <b>
                            <NavLink to="/sign-in"> Sign in</NavLink>
                        </b>!
                    </p>
                </div>

                <ErrorToaster
                    toasts={this.state.errors}
                />
                {this.renderNextButton()}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        userCreationStatus: state.users.userCreationStatus
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        registerUser: (full_name: string, email: string, password: string) => dispatch(registerUserAction(full_name, email, password))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserBasicData);
