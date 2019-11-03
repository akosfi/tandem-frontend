import React from "react";

class TopicSelect extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            topics: [] as Array<string>,
            selectedTopics: []
        };

        this.submitTopics = this.submitTopics.bind(this);
    }

    submitTopics(event: any) {
        event.preventDefault();


        //SERVER STUFF


        this.props.nextClick();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitTopics}>
                    <span>asd</span>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default TopicSelect;
