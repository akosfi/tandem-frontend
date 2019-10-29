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
import RegisterPage from "./components/RegisterPage";
import {ProtectedRoute} from "./util/ProtectedRoute";


const history = createBrowserHistory();

class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.props.getCurrentUser();
    }

    componentDidMount(): void {
    }


    renderBasedOnUserAuthentication() {
        return (
            <Router history={history}>
                <Route exact path="/">
                    <Redirect to="/chat"/>
                </Route>

                <ProtectedRoute
                    exact path="/chat"
                    component={ChatsPage}
                    condition={this.props.isUserLoggedIn}
                    redirectUrl={'/sign-in'}
                />

                <ProtectedRoute
                    exact path="/chat/:id"
                    component={ChatsPage}
                    condition={this.props.isUserLoggedIn}
                    redirectUrl={'/sign-in'}
                />

                <ProtectedRoute
                    exact path="/event"
                    component={ChatsPage}
                    condition={this.props.isUserLoggedIn}
                    redirectUrl={'/sign-in'}
                />

                <ProtectedRoute
                    exact path="/event/:id"
                    component={ChatsPage}
                    condition={this.props.isUserLoggedIn}
                    redirectUrl={'/sign-in'}
                />

                <ProtectedRoute
                    exact path="/sign-in"
                    component={LoginPage}
                    condition={!this.props.isUserLoggedIn}
                    redirectUrl={'/chat'}
                />

                <ProtectedRoute
                    exact path="/sign-up"
                    component={RegisterPage}
                    condition={!this.props.isUserLoggedIn}
                    redirectUrl={'/chat'}
                />
            </Router>
        );
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
