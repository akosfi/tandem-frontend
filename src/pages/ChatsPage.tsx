import React, {Dispatch} from "react";
import {connect} from "react-redux";
import {User} from "../store/user/models/User";
import {Link, NavLink} from "react-router-dom";
import {Divider, Icon, IconName, Intent, Tag} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";

class ChatsPage extends React.Component<any, any> {
    constructor(props: any){
        super(props);
        this.state = {};
    }

    componentDidMount(): void {
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

    render() {
        return (
            <div>
                <h1>ChatsPage</h1>

                <div className={'tan-chat-recommendation'}>
                    <div className={'tan-chat-recommendation-item'}>
                        <img
                            src="https://assets.teenvogue.com/photos/5d7bedd9eb2d250008cbc0c6/master/pass/tout.jpg"
                            alt="r_photo"/>

                        <span>Alicia Jackson</span>
                    </div>
                </div>
                
                {this.renderActiveUsers()}
            </div>
        );
    }
}


const mapStateToProps = (state: any) => {
    return {
        currentUser: state.users.current,
        activeUsers: state.users.activeUsers
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatsPage);

