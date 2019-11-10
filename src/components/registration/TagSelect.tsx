import React from "react";
import {SelectedTag} from "../../pages/RegisterPage";
import {Language} from "../../store/static/models/Language";

class TagSelect extends React.Component<any, any> {
    constructor(props: any) {
        super(props);


        this.state = {
            selectedTags: [] as Array<SelectedTag>
        };

        this.submitTags = this.submitTags.bind(this);
        this.renderTags = this.renderTags.bind(this);
    }

    renderTags() {
        return this.props.tags.map((tag: any) => {
            return <h4 key={tag.id} onClick={() => this.selectTag(tag.id)}>{tag.name}</h4>
        });
    }

    selectTag(id: number) {
        this.setState({
            selectedTags: [...this.state.selectedTags, {id}]
        });
    }

    submitTags() {
        this.state.selectedTags.forEach((l: any) => {
            this.props.selectedTags.push(l);
        });
        this.props.nextClick();
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                {this.renderTags()}
                <button onClick={() => {this.submitTags()}}>Submit</button>
            </div>
        );
    }
}

export default TagSelect;
