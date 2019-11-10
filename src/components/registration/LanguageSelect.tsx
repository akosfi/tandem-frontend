import React, {Dispatch} from "react";
import {registerUserAction} from "../../store/user/actions";
import {connect} from "react-redux";
import {Language} from "../../store/static/models/Language";
import {SelectedLanguage, SelectedLanguageWithDifficulty} from "../../pages/RegisterPage";

class LanguageSelect extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            selectedLanguages:
                (this.props.withDifficulty) ?
                    ([] as Array<SelectedLanguageWithDifficulty>) :
                    ([] as Array<SelectedLanguage>)
        };

        this.submitLanguages = this.submitLanguages.bind(this);
        this.renderLanguages = this.renderLanguages.bind(this);
    }

    submitLanguages() {
        this.state.selectedLanguages.forEach((l: any) => {
            this.props.selectedLanguages.push(l);
        });
        this.props.nextClick();
    }

    renderLanguages() {
        return this.props.languages.map((language: Language) => {
            return <h4 key={language.id} onClick={() => this.selectLanguage(language.id)}>{language.name}</h4>
        });
    }

    selectLanguage(id: number) {
        this.setState({
            selectedLanguages: [...this.state.selectedLanguages, {id}]
        });
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                {this.renderLanguages()}
                <button onClick={() => {this.submitLanguages()}}>Submit</button>
            </div>
        );
    }
}


const mapStateToProps = (state: any) => {
    return {
        languages: state.static.languages
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelect);

