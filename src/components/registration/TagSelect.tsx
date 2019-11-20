import React from "react";
import {SelectedLanguage, SelectedLanguageWithDifficulty, SelectedTag} from "../../pages/RegisterPage";
import {Language} from "../../store/static/models/Language";
import {Button, Intent, Tag} from "@blueprintjs/core";
import _ from "lodash";
import ErrorToaster from "../shared/ErrorToaster";

class TagSelect extends React.Component<any, any> {
    constructor(props: any) {
        super(props);


        this.state = {
            selectedTags: [] as Array<SelectedTag>,
            errors: [] as Array<string>,
        };

        this.submitTags = this.submitTags.bind(this);
        this.renderTags = this.renderTags.bind(this);
        this.isTagSelected = this.isTagSelected.bind(this);
    }

    componentWillReceiveProps(): void {
        this.setState({
            selectedTags: [] as Array<SelectedTag>,
            errors: [] as Array<string>,
        })
    }

    isTagSelected(id: number) {
        return this
            .state
            .selectedTags
            .findIndex((t: SelectedTag) => t.id === id) !== -1;
    }

    renderTags() {
        return _.sortBy(this.props.tags, (t: any) => t.name)
                .map((tag: any) => {
                    return (
                        <Tag
                            key={tag.id}
                            className={'tan-tags-tag'}
                            onClick={() => this.selectTag(tag.id)}
                            large={true}
                            round={true}
                            interactive={true}
                            rightIcon={this.isTagSelected(tag.id) ? 'delete' : 'circle'}
                            intent={this.isTagSelected(tag.id) ? Intent.SUCCESS : Intent.NONE}
                        >{tag.name}</Tag>
                    );
                });
    }

    selectTag(id: number) {
        if(this.isTagSelected(id)){
            const tags = this.state.selectedTags;
            _.remove(tags, (t: any) => t.id === id);
            return this.setState({
                selectedTags: [...tags]
            });
        }

        this.setState({
            selectedTags: [...this.state.selectedTags, {id}]
        });
    }

    submitTags() {
        if(this.state.selectedTags.length <= 2){
            this.setState({
                errors: [...this.state.errors, "Select at least 3 tags!"]
            });
            return;
        }

        this.state.selectedTags.forEach((l: any) => {
            this.props.selectedTags.push(l);
        });
        this.props.nextClick();
    }

    render() {
        return (
            <div>
                <h1 className={'tan-text-center'}>{this.props.title}</h1>
                <div className={'tan-tags'}>
                    {this.renderTags()}
                </div>
                <div className={'tan-center'} style={{"marginTop": '32px'}}>
                    <Button
                        intent={Intent.SUCCESS}
                        text={"Continue"}
                        onClick={() => {this.submitTags()}}
                    />
                </div>
                <ErrorToaster
                    toasts={this.state.errors}
                />
            </div>
        );
    }
}

export default TagSelect;
