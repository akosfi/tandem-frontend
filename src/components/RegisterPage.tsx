import React, {Dispatch} from "react";
import {loginUserAction, registerUserAction} from "../store/user/actions";
import {connect} from "react-redux";

class RegisterPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            usernameInput: '',
            passwordInput: '',
            emailInput: '',
        };

        this.handleUsernameInputChange = this.handleUsernameInputChange.bind(this);
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
        this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
        this.handleRegistrationSubmit = this.handleRegistrationSubmit.bind(this);
    }

    handleUsernameInputChange(event: any) {
        this.setState({usernameInput: event.target.value});
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
            this.state.usernameInput,
            this.state.emailInput,
            this.state.passwordInput,
        );
    }

    renderRegistrationErrors() {
        if(this.props.registrationStatus && this.props.registrationStatus.status === 'fail') {
            console.log("igen");
            return (
                <span>{this.props.registrationStatus.message}</span>
            )
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleRegistrationSubmit}>
                    <label>
                        Email:
                        <input type="email" value={this.state.emailInput} onChange={this.handleEmailInputChange} />
                    </label>
                    <label>
                        Username:
                        <input type="text" value={this.state.usernameInput} onChange={this.handleUsernameInputChange} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={this.state.passwordInput} onChange={this.handlePasswordInputChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        registrationStatus: state.newUserCreationStatus
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        registerUser: (username: string, email: string, password: string) => dispatch(registerUserAction(username, email, password))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
