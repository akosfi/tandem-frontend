import React, {Dispatch} from "react";
import {loginUserAction, registerUserAction} from "../store/user/actions";
import {connect} from "react-redux";
import App from "../App";
import UserBasicData from "../components/registration/UserBasicData";


enum RegistrationStep {
    SignInType,
    UserBasicData,
    UserNativeLanguages,
    UserFluentLanguages,
    UserGoalLanguages,
    UserTopicsLiked,
}

class RegisterPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            currentRegistrationStep: RegistrationStep.UserBasicData as RegistrationStep
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


    renderRegistrationComponent() {
        switch(this.state.currentRegistrationStep) {
            case RegistrationStep.SignInType:
                break;
            case RegistrationStep.UserBasicData:
                return (<UserBasicData />);
            case RegistrationStep.UserNativeLanguages:
                break;
            case RegistrationStep.UserFluentLanguages:
                break;
            case RegistrationStep.UserGoalLanguages:
                break;
            case RegistrationStep.UserTopicsLiked:
                break;
            default:
                return (<span>asd</span>);
        }
    }

    render(){
        return this.renderRegistrationComponent();
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
