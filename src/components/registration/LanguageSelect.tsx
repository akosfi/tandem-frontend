import React from "react";

class LanguageSelect extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            languages: [] as Array<string>,
            selectedLanguages: []
        };

        this.submitLanguages = this.submitLanguages.bind(this);
    }

    submitLanguages(event: any) {
        event.preventDefault();


        //SERVER STUFF


        this.props.nextClick();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitLanguages}>
                    <span>asd</span>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default LanguageSelect;
