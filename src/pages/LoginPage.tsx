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
            termsAccepted: false,
        };

        this.loginWithFacebook = this.loginWithFacebook.bind(this);
        this.loginWithGoogle = this.loginWithGoogle.bind(this);

        this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleAcceptChange = this.handleAcceptChange.bind(this);
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

    handleAcceptChange() {
        this.setState({
            termsAccepted: !this.state.termsAccepted
        })
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
    render() {
        return (
            <div>
                <h1
                    className={"tan-text-center"}>
                    Sign In</h1>

                <div className={"tan-inputGroup"}>

                    <div className={'tan-center'}>
                        <GoogleLogin
                            clientId="775882795786-p487jvef6nk648qvdeonepafptpr248b.apps.googleusercontent.com"
                            className={'tan-socialButton'}
                            buttonText={'Google'}
                            autoLoad={false}
                            onSuccess={(response) => this.loginWithGoogle(response)}
                            onFailure={(response) => this.loginWithGoogle(response)}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>

                    <div className={'tan-center'}>
                        <FacebookLogin
                            appId="525980097979784"
                            autoLoad={false}
                            fields="name,email,picture"
                            icon={"fa-facebook"}
                            cssClass={'tan-socialButton'}
                            textButton={' Facebook'}
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

                        <Checkbox
                            value={this.state.termsAccepted}
                            onChange={this.state.handleAcceptChange}
                            label="I accept the terms and conditions." />


                        <Button
                            className={"tan-text-right"}
                            icon="refresh"
                            type={"submit"}
                            text={"Sign in"} />
                    </form>

                    <p
                        className={"tan-text-right"}>
                        Create an account
                        <b>
                            <NavLink to="/sign-up"> here</NavLink>
                        </b>!
                    </p>

                    {this.redirectToSignUp()}
                </div>

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
