import React, {Dispatch} from 'react';
import './App.css';
import {createBrowserHistory} from 'history';
import {connect} from "react-redux";
import {messageSendAction} from "./store/actions/message-actions";
import {Router, Route, Redirect} from 'react-router';
import ChatsPage from "./components/ChatsPage";
import ChatPage from "./components/ChatPage";
import EventsPage from "./components/EventsPage";
import EventPage from "./components/EventPage";
import Socket from "./store/middlewares/socket";
import {connectSocketAction} from "./store/actions/socket-actions";
import {getActiveUsersList} from "./store/actions/user-actions";

const history = createBrowserHistory();

class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.props.connectToSocket();
        this.props.fetchActiveUsers();
    }

    componentDidMount(): void {
    }


    render() {
        return (
            <div>
                <Router history={history}>
                    <Route exact path="/">
                        <Redirect to="/chat"/>
                    </Route>
                    <Route exact path="/sign-up" component={App}/>
                    <Route exact path="/chat" component={ChatsPage}/>
                    <Route exact path="/chat/:id" component={ChatPage}/>
                    <Route exact path="/event" component={EventsPage}/>
                    <Route exact path="/event/:id" component={EventPage}/>
                </Router>
            </div>

        );
    }
}


const mapStateToProps = (state: any) => {
    return {
        messages: state.messages,
        activeUsers: state.users.activeUsers
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        connectToSocket: () => dispatch(connectSocketAction()),
        fetchActiveUsers: () => dispatch(getActiveUsersList()),
        sendMessage: () => dispatch(messageSendAction({
            from: 1,
            to: 2,
            text: "asd"
        })),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
