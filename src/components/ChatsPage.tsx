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

        //this.props.getActiveUsersList();


        //store.dispatch(getActiveUsersList());
    }



    render() {



        return (
            <div>
                <h1>ChatsPage</h1>

                {this.props.activeUsers.map((user: User) => {
                    if(this.props.currentUser.id.toString() !== user.id.toString() ) {
                        return (
                            <h1>
                                asd
                                <Link key={user.id} to={'/chat/' + user.id}>{user.username}</Link>
                            </h1>
                        );
                    }
                })}
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
        getActiveUsersList: () => dispatch(getActiveUsersList())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatsPage);

