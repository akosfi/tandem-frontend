import React, {Dispatch} from "react";
import {connect} from "react-redux";
import {User} from "../store/user/models/User";
import {Link, NavLink} from "react-router-dom";

class ChatsPage extends React.Component<any, any> {
    constructor(props: any){
        super(props);
        this.state = {};
    }

    componentDidMount(): void {
    }

    renderActiveUsers() {
        return this.props
            .activeUsers
            .filter((u: User) => u.id.toString() !== this.props.currentUser.id.toString())
            .map((u: User) => {
                return <Link key={u.id} to={'/chat/' + u.id}>{u.full_name}</Link>
            });
    }

    render() {
        return (
            <div>
                <h1>ChatsPage</h1>

                {this.renderActiveUsers()}


                <NavLink to="/chat"> --Chats </NavLink>
                <NavLink to="/event"> --Events </NavLink>
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

