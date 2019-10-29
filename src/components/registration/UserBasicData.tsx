import React from "react";

class UserBasicData extends React.Component<any, any> {
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

export default UserBasicData;
