import React, {Dispatch} from "react";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {connect} from "react-redux";
import {loginUserWithThirdPartyAction} from "../../store/user/actions";
import {AuthType} from "../../store/user/models/User";

class SignInType extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {

        };

        this.loginWithFacebook = this.loginWithFacebook.bind(this);
        this.loginWithGoogle = this.loginWithGoogle.bind(this);
    }

    render() {
        return (
            <div>
                <span onClick={this.props.nextClick}><b>Go to simple Registration</b></span>
                <FacebookLogin
                    appId="525980097979784"
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={() => {}}
                    callback={(response) => this.loginWithFacebook(response)} />

                <GoogleLogin
                    clientId="775882795786-p487jvef6nk648qvdeonepafptpr248b.apps.googleusercontent.com"
                    buttonText="LOGIN WITH GOOGLE"
                    autoLoad={false}
                    onSuccess={(response) => this.loginWithGoogle(response)}
                    onFailure={(response) => this.loginWithGoogle(response)}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        );
    }

    loginWithFacebook(response: any){
        this.props.loginUserWithThirdParty(
            response.email,
            response.name,
            response.accessToken,
            AuthType.T_FACEBOOK);
    }

    loginWithGoogle(response: any) {
        this.props.loginUserWithThirdParty(
            response.profileObj.email,
            response.profileObj.name,
            response.accessToken,
            AuthType.T_GOOGLE);
    }

}

const mapStateToProps = (state: any) => {
    return {

    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        loginUserWithThirdParty: (email: string, full_name: string, access_token: string, auth_type: AuthType) => dispatch(loginUserWithThirdPartyAction(email, full_name, access_token, auth_type))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignInType);
