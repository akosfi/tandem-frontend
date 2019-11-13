import React, {Dispatch} from "react";
import {loginUserAction, loginUserWithThirdPartyAction} from "../store/user/actions";
import {connect} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import {AuthType} from "../store/user/models/User";
import {Button, Checkbox, InputGroup, Label} from "@blueprintjs/core";

class LoginPage extends React.Component<any, any> {
    constructor(props: any){
        super(props);

        this.state = {
            emailInput: '',
            passwordInput: '',
        };

        this.loginWithFacebook = this.loginWithFacebook.bind(this);
        this.showFacebookLogin = this.showFacebookLogin.bind(this);
        this.loginWithGoogle = this.loginWithGoogle.bind(this);

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

    loginWithFacebook(response: any){
        this.props.loginUserWithThirdParty(
            response.email,
            response.name,
            response.accessToken,
            AuthType.T_FACEBOOK);
    }

    loginWithGoogle(response: any) {
        console.log(response);
        this.props.loginUserWithThirdParty(
            response.profileObj.email,
            response.profileObj.name,
            response.accessToken,
            AuthType.T_GOOGLE);
    }

    redirectToSignUp() {
        if(this.props.registrationFinished === false) return <Redirect to={'/sign-up'} />
    }

    showFacebookLogin(e: any) {
        e.click();
    }


    render() {
        return (
            <div>
                <h1 onClick={this.showFacebookLogin}>Sign In</h1>

                <div>
                    <GoogleLogin
                        clientId="775882795786-p487jvef6nk648qvdeonepafptpr248b.apps.googleusercontent.com"
                        buttonText="LOGIN WITH GOOGLE"
                        autoLoad={false}
                        onSuccess={(response) => this.loginWithGoogle(response)}
                        onFailure={(response) => this.loginWithGoogle(response)}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>

                <div>
                    <FacebookLogin

                        appId="525980097979784"
                        autoLoad={false}
                        fields="name,email,picture"
                        onClick={() => {}}
                        callback={(response) => this.loginWithFacebook(response)} />
                </div>

                <form onSubmit={this.handleLoginSubmit}>
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

                    <Button icon="refresh" type={"submit"} text={"Sign in"} />
                </form>

                {this.redirectToSignUp()}

                <p>Create an account <b><NavLink to="/sign-up">here</NavLink></b>!</p>

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
        loginUser: (email: string, password: string) => dispatch(loginUserAction(email, password)),
        loginUserWithThirdParty: (email: string, full_name: string, access_token: string, auth_type: AuthType) => dispatch(loginUserWithThirdPartyAction(email, full_name, access_token, auth_type))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
