import React, {Dispatch} from "react";
import {loginUserAction, registerUserAction, userPreferencesPostAction} from "../store/user/actions";
import {connect} from "react-redux";
import App from "../App";
import UserBasicData from "../components/registration/UserBasicData";
import SignInType from "../components/registration/SignInType";
import LanguageSelect from "../components/registration/LanguageSelect";
import TagSelect from "../components/registration/TagSelect";
import {LanguageDifficulty} from "../store/static/models/LanguageDifficulty";
import {LearningGoal} from "../store/static/models/LearningGoal";
import {languagesGetAction, learningGoalsGetAction, topicsGetAction} from "../store/static/actions";

export interface SelectedLanguage {
    id: number;
}

export interface SelectedLanguageWithDifficulty {
    d: LanguageDifficulty
}

export interface SelectedTag {
    id: number;
}


enum RegistrationStep {
    SignInType,
    UserBasicData,
    UserNativeLanguages,
    UserFluentLanguages,
    UserGoalLanguages,
    UserTopicsLiked,
    UserGoals,
}

class RegisterPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        //registrationFinished is ready, since we only load this page if we know that the user is registered or not
        this.state = {
            currentRegistrationStep: (this.props.registrationFinished === false)
                                        ? RegistrationStep.UserNativeLanguages
                                        : RegistrationStep.SignInType,

            userPreferences: {
                nativeLanguages: [] as Array<SelectedLanguage>,
                fluentLanguages: [] as Array<SelectedLanguage>,
                goalLanguages: [] as Array<SelectedLanguageWithDifficulty>,
                topicsLiked: [] as Array<SelectedTag>,
                learningGoals: [] as Array<LearningGoal>,
            }
        };

        this.submitUserBasicData = this.submitUserBasicData.bind(this);
        this.submitUserPreferences = this.submitUserPreferences.bind(this);


        this.props.loadStatic();
    }

    submitUserBasicData(username: string, email: string, password: string) {
        this.props.registerUser(
            username,
            email,
            password,
        );
    }

    submitUserPreferences(){
        console.log(this.state.userPreferences);
        this.props.setUserPreferences(this.state.userPreferences);
    }

    renderRegistrationComponent() {
        switch(this.state.currentRegistrationStep) {
            default:
            case RegistrationStep.SignInType:
                return (
                    <SignInType
                        nextClick={() => this.setState({currentRegistrationStep: RegistrationStep.UserBasicData})} />);

            case RegistrationStep.UserBasicData:
                return (
                    <UserBasicData
                        nextClick={() => this.setState({currentRegistrationStep: RegistrationStep.UserNativeLanguages})}
                        handleUserBasicDataSubmission={this.submitUserBasicData}/>);

            case RegistrationStep.UserNativeLanguages:
                return (
                    <LanguageSelect
                        title="Select the languages  you speak natively"
                        withDifficulty={false}
                        selectedLanguages={this.state.userPreferences.nativeLanguages}
                        nextClick={() => this.setState({currentRegistrationStep: RegistrationStep.UserFluentLanguages})}/>);

            case RegistrationStep.UserFluentLanguages:
                return (
                    <LanguageSelect
                        title="Select the languages  you speak fluently"
                        withDifficulty={false}
                        selectedLanguages={this.state.userPreferences.fluentLanguages}
                        nextClick={() => this.setState({currentRegistrationStep: RegistrationStep.UserGoalLanguages})}/>);


            case RegistrationStep.UserGoalLanguages:
                return (
                    <LanguageSelect
                        title="Select the languages  you want to learn"
                        withDifficulty={true}
                        selectedLanguages={this.state.userPreferences.goalLanguages}
                        nextClick={() => this.setState({currentRegistrationStep: RegistrationStep.UserTopicsLiked})}/>);

            case RegistrationStep.UserTopicsLiked:
                return (
                    <TagSelect
                        title="Select the topics  you interested in."
                        tags={this.props.topics}
                        selectedTags={this.state.userPreferences.topicsLiked}
                        nextClick={() => this.setState({currentRegistrationStep: RegistrationStep.UserGoals})}/>);

            case RegistrationStep.UserGoals:
                return (
                    <TagSelect
                        title="Select your language learning goals."
                        tags={this.props.learning_goals}
                        selectedTags={this.state.userPreferences.learningGoals}
                        nextClick={this.submitUserPreferences}  />);
        }
    }


    render(){
        return this.renderRegistrationComponent();
    }
}

const mapStateToProps = (state: any) => {
    return {
        registrationFinished: state.users.current.registration_finished,
        languages: state.static.languages,
        topics: state.static.topics,
        learning_goals: state.static.learning_goals,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        registerUser: (username: string, email: string, password: string) => dispatch(registerUserAction(username, email, password)),
        loadStatic: () => {
            dispatch(languagesGetAction());
            dispatch(topicsGetAction());
            return dispatch(learningGoalsGetAction());
        },
        setUserPreferences: (preferences: any) => dispatch(userPreferencesPostAction(preferences))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
