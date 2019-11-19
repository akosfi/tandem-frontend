import React, {Dispatch} from "react";
import {connect} from "react-redux";
import {User} from "../store/user/models/User";
import {Link, NavLink} from "react-router-dom";
import {Divider, Icon, IconName, Intent, Tag} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import {connectWithUser, getUsersKnownList, getUsersRecommendedList} from "../store/user/actions";

class ChatsPage extends React.Component<any, any> {
    constructor(props: any){
        super(props);
        this.state = {};

        this.props.getRecommendedUsers();
        this.props.getKnownUsers();

        this.renderRecommendedUsers = this.renderRecommendedUsers.bind(this);
        this.renderActiveUsers = this.renderActiveUsers.bind(this);
        this.renderKnownUsers = this.renderKnownUsers.bind(this);
    }

    componentDidMount(): void {
    }

    renderRecommendedUsers() {

        return (
            <div className={'tan-chat-recommendation'}>
                {this.props
                    .recommendedUsers
                    .map((u: User) => {
                        return (
                            <div
                                className={'tan-chat-recommendation-item'}
                                key={u.id}
                                onClick={() => this.props.connectWithUser(u.id)}
                            >
                                <Link
                                    to={'/chat/' + u.id}>
                                    <img
                                        src="https://assets.teenvogue.com/photos/5d7bedd9eb2d250008cbc0c6/master/pass/tout.jpg"
                                        alt="r_photo"/>

                                    <span>{u.full_name}</span>
                                </Link>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    renderActiveUsers() {
        return (
            <div className={'tan-chat-active'}>
                {this.props
                    .activeUsers
                    .filter((u: User) => u.id.toString() !== this.props.currentUser.id.toString())
                    .map((u: User) => {
                        return (
                            <div className={'tan-chat-active-item'}>
                                <Link
                                    key={u.id}
                                    to={'/chat/' + u.id}>
                                    <img
                                        src="https://assets.teenvogue.com/photos/5d7bedd9eb2d250008cbc0c6/master/pass/tout.jpg"
                                        alt="r_photo"/>
                                </Link>
                                <span className={"tan-chat-active-item-dot"}> </span>
                            </div>)
                    })
                }
            </div>
        );
    }

    renderKnownUsers() {
        return (
            <div>
                {this.props
                    .knownUsers
                    .map((u: User) => {
                        return (
                            <div
                                className={'tan-chat-conversation-item'}
                                onClick={() => this.props.history.push(`/chat/${u.id}`)}
                            >
                                <div className={'tan-chat-conversation-item-avatar'}>
                                    <img
                                        src="https://assets.teenvogue.com/photos/5d7bedd9eb2d250008cbc0c6/master/pass/tout.jpg"
                                        alt="r_photo"/>
                                </div>
                                <div className={'tan-chat-conversation-item-content'}>
                                    <span><b>{u.full_name}</b></span>
                                    <span>I would love to take this trip!!</span>
                                </div>
                                <div className={'tan-chat-conversation-item-date'}>
                                    <p>9:45AM</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderRecommendedUsers()}
                {this.renderActiveUsers()}
                {this.renderKnownUsers()}




            </div>
        );
    }
}


const mapStateToProps = (state: any) => {
    return {
        recommendedUsers: state.users.recommendedUsers,
        knownUsers: state.users.knownUsers,
        currentUser: state.users.current,
        activeUsers: state.users.activeUsers
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getRecommendedUsers: () => dispatch(getUsersRecommendedList()),
        getKnownUsers: () => dispatch(getUsersKnownList()),
        connectWithUser: (id: number) => dispatch(connectWithUser(id))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatsPage);

