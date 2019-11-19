import React, {Dispatch} from "react";
import {registerUserAction} from "../../store/user/actions";
import {connect} from "react-redux";
import {Language} from "../../store/static/models/Language";
import {SelectedLanguage, SelectedLanguageWithDifficulty} from "../../pages/RegisterPage";
import LanguageSelectItem from "./LanguageSelectItem";
import _ from 'lodash';
import {Button, Intent, IToastProps, Position, Toaster} from "@blueprintjs/core";
import {IToasterProps} from "@blueprintjs/core/lib/esm/components/toast/toaster";
import ErrorToaster from "../shared/ErrorToaster";

class LanguageSelect extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            selectedLanguages:
                (this.props.withDifficulty) ?
                    ([] as Array<SelectedLanguageWithDifficulty>) :
                    ([] as Array<SelectedLanguage>),
            errors: [] as Array<string>,
        };
        this.isLanguageSelected = this.isLanguageSelected.bind(this);
        this.submitLanguages = this.submitLanguages.bind(this);
        this.renderLanguages = this.renderLanguages.bind(this);
        this.removeLanguage = this.removeLanguage.bind(this);
        this.selectLanguage = this.selectLanguage.bind(this);
        this.updateDifficulty = this.updateDifficulty.bind(this);
    }

    componentWillReceiveProps(): void {
        this.setState({
            selectedLanguages:
                (this.props.withDifficulty) ?
                    ([] as Array<SelectedLanguageWithDifficulty>) :
                    ([] as Array<SelectedLanguage>)
        })
    }

    submitLanguages() {
        if(this.state.selectedLanguages.length <= 0){
            this.setState({
                errors: [...this.state.errors, "Select at least one language!"]
            });
            return;
        }
        this.state.selectedLanguages.forEach((l: any) => {
            this.props.selectedLanguages.push(l);
        });
        this.props.nextClick();
    }

    renderLanguages() {
        return this.props.languages.map((language: Language) => {
            return <LanguageSelectItem
                        key={language.id}
                        language={language}
                        withDifficulty={this.props.withDifficulty}
                        updateLanguageDifficulty={this.updateDifficulty}
                        addLanguage={this.selectLanguage}
                        removeLanguage={this.removeLanguage}
                        isSelected={this.isLanguageSelected(language)}
                    />

        });
    }
    isLanguageSelected(language: any) {
        return this.state.selectedLanguages.findIndex((l: any) => l.id === language.id) !== -1;
    }
    selectLanguage(language: any) {
        this.setState({
            selectedLanguages: [...this.state.selectedLanguages, {...language}]
        });
    }
    removeLanguage(language: any) {
        const languages = this.state.selectedLanguages;
        _.remove(languages, (l: any) => l.id === language.id);
        this.setState({
            selectedLanguages: [...languages]
        });
    }
    updateDifficulty(language: Language){
        this.removeLanguage(language);
        this.selectLanguage(language);
    }


    render() {
        console.log(this.state.selectedLanguages);
        return (
            <div className={'container'}>
                <h1 className={'tan-text-center'}>{this.props.title}</h1>
                <div className={'tan-languages'}>
                    {this.renderLanguages()}
                </div>
                <div className={'tan-center'} style={{"marginTop": '32px'}}>
                    <Button
                        intent={Intent.SUCCESS}
                        text={"Continue"}
                        onClick={() => {this.submitLanguages()}}
                    />
                </div>


                <ErrorToaster
                    toasts={this.state.errors}
                />
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

