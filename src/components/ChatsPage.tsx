import React, {Dispatch} from "react";
import {connectSocketAction} from "../store/actions/socket-actions";
import {getActiveUsersList} from "../store/actions/user-actions";
import {messageSentAction} from "../store/actions/message-actions";
import {connect} from "react-redux";
import {User} from "../store/models/User";
import {Link} from "react-router-dom";

class ChatsPage extends React.Component<any, any> {
    constructor(props: any){
        super(props);

    }

    componentDidMount(): void {
        this.props.fetchActiveUsers();
    }

    render() {
        return (
            <div>
                <h1>ChatsPage</h1>

                <h2>{JSON.stringify(this.props.activeUsers, null, 4)}</h2>

                {this.props.activeUsers.map((user: User)=>{
                    return (
                        <p>
                            <Link key={user.id} to={'/chat/' + user.id}>{user.userName}</Link>
                        </p>
                    );
                })}
            </div>
        );
    }
}


const mapStateToProps = (state: any) => {
    return {
        activeUsers: state.users.activeUsers
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        connectToSocket: () => dispatch(connectSocketAction()),
        fetchActiveUsers: () => dispatch(getActiveUsersList()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatsPage);

