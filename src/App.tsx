import React, {Dispatch} from 'react';
import './App.css';
import {createBrowserHistory} from 'history';
import {connect} from "react-redux";
import {messageSendAction, messageSentAction} from "./store/actions/message-actions";
import {Router, Route, Redirect} from 'react-router';
import ChatsPage from "./components/ChatsPage";
import ChatPage from "./components/ChatPage";
import EventsPage from "./components/EventsPage";
import EventPage from "./components/EventPage";
import {connectSocketAction} from "./store/actions/socket-actions";

const history = createBrowserHistory();

class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.props.connectToSocket();
    }

    componentDidMount(): void {
    }


    render() {
        return (
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
        );
    }
}


const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        connectToSocket: () => dispatch(connectSocketAction()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
