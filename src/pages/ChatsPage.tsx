import React, {Dispatch} from "react";
import {connect} from "react-redux";
import {User} from "../store/user/models/User";
import {Link} from "react-router-dom";
import {connectWithUser, getUsersKnownList, getUsersRecommendedList} from "../store/user/actions";
import {MessageType} from "../store/message/models/Message";

class ChatsPage extends React.Component<any, any> {
    constructor(props: any){
        super(props);
        this.state = {};

        this.props.getRecommendedUsers();
        this.props.getKnownUsers();

        this.renderRecommendedUsers = this.renderRecommendedUsers.bind(this);
        this.renderActiveUsers = this.renderActiveUsers.bind(this);
        this.renderKnownUsers = this.renderKnownUsers.bind(this);
        this.getLastMessageWithUser = this.getLastMessageWithUser.bind(this);
    }

    componentDidMount(): void {
    }

    renderRecommendedUsers() {
        if(!this.props.recommendedUsers || this.props.recommendedUsers.length <= 0){
            return <div><h4>No recommended users!</h4></div>
        }


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
        if(!this.props.activeUsers || this.props.activeUsers.length <= 0){
            return <div><h4>No user is active currently!</h4></div>
        }


        return (
            <div className={'tan-chat-active'}>
                {this.props
                    .activeUsers
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
        if(!this.props.knownUsers || this.props.knownUsers.length <= 0){
            return <div><h4>No previous conversations!</h4></div>
        }

        return (
            <div>
                {this.props
                    .knownUsers
                    .map((u: User) => {
                        return (
                            <div
                                className={'tan-chat-conversation-item'}
                                key={u.id}
                                onClick={() => this.props.history.push(`/chat/${u.id}`)}
                            >
                                <div className={'tan-chat-conversation-item-avatar'}>
                                    <img
                                        src="https://assets.teenvogue.com/photos/5d7bedd9eb2d250008cbc0c6/master/pass/tout.jpg"
                                        alt="r_photo"/>
                                </div>
                                <div className={'tan-chat-conversation-item-content'}>
                                    <span><b>{u.full_name}</b></span>
                                    <span>{this.getLastMessageWithUser(Number(u.id))}</span>
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


    getLastMessageWithUser(id: number) {
        if(this.props.messages && this.props.messages[id]){
            if(this.props.messages[id].length > 0){
                const message = this.props.messages[id][this.props.messages[id].length - 1];
                console.log(new Date(message.sent_at));
                if(message.message_type === MessageType.IMAGE) {
                    return "Image sent"
                }
                return message.message;
            }
            return "Say something!"
        }
        return "Say something!"
    }

    render() {
        return (
            <div>
                <h1>Recommended users</h1>
                {this.renderRecommendedUsers()}
                <h1>Active users</h1>
                {this.renderActiveUsers()}
                <h1>Conversations</h1>
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
        activeUsers: state.users.activeUsers,
        messages: state.messages.messages
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

