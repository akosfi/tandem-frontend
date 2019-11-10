import React from "react";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

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
        console.log(response.accessToken);
        console.log(response.name);
        console.log(response.email);
    }

    loginWithGoogle(response: any) {
        console.log(response.accessToken);
        console.log(response.profileObj.name);
        console.log(response.profileObj.email);
    }

}

export default SignInType;
