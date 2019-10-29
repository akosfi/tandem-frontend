import React, {Dispatch} from "react";
import {loginUserAction, registerUserAction} from "../store/user/actions";
import {connect} from "react-redux";
import App from "../App";
import UserBasicData from "../components/registration/UserBasicData";
import SignInType from "../components/registration/SignInType";


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
            currentRegistrationStep: RegistrationStep.SignInType as RegistrationStep
        };

        this.handleUserBasicDataSubmission = this.handleUserBasicDataSubmission.bind(this);
    }

    handleUserBasicDataSubmission(username: string, email: string, password: string) {
        this.props.registerUser(
            username,
            email,
            password,
        );
    }

//nextClick={() => {this.setState({currentRegistrationStep: RegistrationStep.UserBasicData})}}
    renderRegistrationComponent() {
        switch(this.state.currentRegistrationStep) {
            case RegistrationStep.SignInType:
                return (
                    <SignInType
                        nextClick={() => this.setState({currentRegistrationStep: RegistrationStep.UserBasicData})} />);

            case RegistrationStep.UserBasicData:
                return (
                    <UserBasicData />);

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

    alertme() {
        alert("awd)");
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
