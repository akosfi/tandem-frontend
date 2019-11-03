import React from "react";

class TagSelect extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            topics: [] as Array<string>,
            selectedTopics: []
        };

        this.submit = this.submit.bind(this);
    }

    submit(event: any) {
        event.preventDefault();


        //SERVER STUFF


        this.props.nextClick();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submit}>
                    <span>asd</span>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default TagSelect;
