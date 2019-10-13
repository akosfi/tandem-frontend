import React, {Dispatch} from "react";
import {connectSocketAction} from "../store/socket/actions";
import {getActiveUsersList} from "../store/user/actions";
import {messageSentAction} from "../store/message/actions";
import {connect} from "react-redux";
import {User} from "../store/user/models/User";
import {Link} from "react-router-dom";

class ChatsPage extends React.Component<any, any> {
    constructor(props: any){
        super(props);
    }

    componentDidMount(): void {
    }

    render() {
        return (
            <div>
                <h1>ChatsPage</h1>

                <h2>{JSON.stringify(this.props.activeUsers, null, 4)}</h2>

                {this.props.activeUsers.map((user: User)=>{
                    return (
                        <h1>
                            asd
                            <Link key={user.id} to={'/chat/' + user.id}>{user.username}</Link>
                        </h1>
                    );
                })}
            </div>
        );
    }
}


const mapStateToProps = (state: any) => {
    console.log(state.users.activeUsers);
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

