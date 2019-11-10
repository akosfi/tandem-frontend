import React, {Dispatch} from "react";
import {loginUserAction} from "../store/user/actions";
import {connect} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";

class LoginPage extends React.Component<any, any> {
    constructor(props: any){
        super(props);

        this.state = {
            emailInput: '',
            passwordInput: '',
        };

        this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }


    handleEmailInputChange(event: any) {
        this.setState({emailInput: event.target.value});
    }

    handlePasswordInputChange(event: any) {
        this.setState({passwordInput: event.target.value});
    }

    handleLoginSubmit(event: any) {
        event.preventDefault();
        this.props.loginUser(this.state.emailInput, this.state.passwordInput);
    }

    redirectToSignUp() {
        if(this.props.registrationFinished === false) return <Redirect to={'/sign-up'} />
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleLoginSubmit}>
                    <label>
                        Email:
                        <input type="email" value={this.state.emailInput} onChange={this.handleEmailInputChange} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={this.state.passwordInput} onChange={this.handlePasswordInputChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                {this.redirectToSignUp()}
                <NavLink to="/sign-up"> --Sign up! </NavLink>
            </div>
        );
    }
}


const mapStateToProps = (state: any) => {
    return {
        registrationFinished: state.users.current.registration_finished
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        loginUser: (email: string, password: string) => dispatch(loginUserAction(email, password))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
