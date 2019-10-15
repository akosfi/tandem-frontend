import React, {Dispatch} from 'react';
import {createBrowserHistory} from 'history';
import {connect} from "react-redux";
import {Router, Route, Redirect} from 'react-router';
import ChatsPage from "./components/ChatsPage";
import ChatPage from "./components/ChatPage";
import EventsPage from "./components/EventsPage";
import EventPage from "./components/EventPage";
import {getCurrentUserAction} from "./store/user/actions";
import LoginPage from "./components/LoginPage";

import "./App.scss";


const history = createBrowserHistory();

class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.props.getCurrentUser();
    }

    componentDidMount(): void {
    }


    renderBasedOnUserAuthentication() {
        if (this.props.isUserLoggedIn) {
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
        } else {
            return (
                <LoginPage/>
            );
        }
    }

    render() {
        return (
            <div className="container">
                {this.renderBasedOnUserAuthentication()}
            </div>

        );
    }
}


const mapStateToProps = (state: any) => {
    return {
        isUserLoggedIn: state.users.currentUserAuthenticated
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getCurrentUser: () => dispatch(getCurrentUserAction()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
