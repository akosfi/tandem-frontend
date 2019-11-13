import React, {Dispatch} from "react";
import {connect} from "react-redux";
import {registerUserAction} from "../../store/user/actions";
import {UserCreationStatus} from "../../store/user/reducer";
import {Button, Checkbox, InputGroup, Label} from "@blueprintjs/core";

class UserBasicData extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            fullNameInput: '',
            passwordInput: '',
            emailInput: '',
        };

        this.handleFullNameInputChange = this.handleFullNameInputChange.bind(this);
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
        this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
        this.handleRegistrationSubmit = this.handleRegistrationSubmit.bind(this);
    }

    handleFullNameInputChange(event: any) {
        this.setState({fullNameInput: event.target.value});
    }
    handlePasswordInputChange(event: any) {
        this.setState({passwordInput: event.target.value});
    }
    handleEmailInputChange(event: any) {
        this.setState({emailInput: event.target.value});
    }

    handleRegistrationSubmit(event: any) {
        event.preventDefault();
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

                        <Checkbox checked={true} label="I accept the terms and conditions." />

                        <Button
                            icon="refresh"
                            type={"submit"}
                            text={"Sign up"} />
                    </form>
                </div>
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
