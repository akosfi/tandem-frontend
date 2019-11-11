import React from "react";
import {LanguageDifficulty} from "../../store/static/models/LanguageDifficulty";

class LanguageSelectItem extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            selectValue: LanguageDifficulty.Beginner as LanguageDifficulty
        };

        this.onSelectChange = this.onSelectChange.bind(this);
        this.onItemStateChange = this.onItemStateChange.bind(this);
        this.renderSelect = this.renderSelect.bind(this);
    }

    onSelectChange(event: any) {
        this.setState({
            selectValue: event.target.value
        });
        this.props.updateLanguageDifficulty(event.target.value);
    }

    onItemStateChange() {
        const language = (!this.props.withDifficulty) ?
                            {id: this.props.language.id} :
                            {id: this.props.language.id, d: this.state.selectValue};

        if(!this.props.isSelected) {
            this.props.addLanguage(language);
        }
        else {
            this.props.removeLanguage(language);
        }
    }


    renderSelect() {
        if(this.props.withDifficulty && this.props.isSelected) {
            return (
                <select onChange={this.onSelectChange} value={this.state.selectValue}>
                    <option value={LanguageDifficulty.Beginner}>Beginner</option>
                    <option value={LanguageDifficulty.Advanced}>Advanced</option>
                    <option value={LanguageDifficulty.Expert}>Expert</option>
                </select>
            );
        }
    }

    render() {
        return (
            <div>
                <span onClick={this.onItemStateChange}>{this.props.language.name}</span>
                {this.renderSelect()}
            </div>
        );
    }
}

export default LanguageSelectItem;
