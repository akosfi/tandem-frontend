import React, {Dispatch} from 'react';
import {createBrowserHistory} from 'history';
import {connect} from "react-redux";
import {Router, Route, Redirect} from 'react-router';
import ChatsPage from "./pages/ChatsPage";
import {getCurrentUserAction} from "./store/user/actions";
import LoginPage from "./pages/LoginPage";

import "./App.scss";
import RegisterPage from "./pages/RegisterPage";
import {ProtectedRoute} from "./util/ProtectedRoute";
import ChatPage from "./pages/ChatPage";
import EventsPage from "./pages/EventsPage";
import EventPage from "./pages/EventPage";
import {UserStatus} from "./store/user/reducer";
import EventCreatePage from "./pages/EventCreatePage";


const history = createBrowserHistory();

class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.props.getCurrentUser();
    }

    componentDidMount(): void {
    }


    renderBasedOnUserAuthentication() {
        if(this.props.isUserLoggedIn === UserStatus.Initial) return;

        return (
            <Router history={history}>

                <ProtectedRoute
                    exact path="/chat"
                    component={ChatsPage}
                    condition={this.props.isUserLoggedIn === UserStatus.LoggedIn}
                    redirectUrl={'/sign-in'}
                />

                <ProtectedRoute
                    exact path="/chat/:id"
                    component={ChatPage}
                    condition={this.props.isUserLoggedIn === UserStatus.LoggedIn}
                    redirectUrl={'/sign-in'}
                />

                <ProtectedRoute
                    exact path="/event"
                    component={EventsPage}
                    condition={this.props.isUserLoggedIn === UserStatus.LoggedIn}
                    redirectUrl={'/sign-in'}
                />

                <ProtectedRoute
                    exact path="/event/:id"
                    component={EventPage}
                    condition={this.props.isUserLoggedIn === UserStatus.LoggedIn}
                    redirectUrl={'/sign-in'}
                />

                <ProtectedRoute
                    exact path="/event-create"
                    component={EventCreatePage}
                    condition={this.props.isUserLoggedIn === UserStatus.LoggedIn}
                    redirectUrl={'/sign-in'}
                />

                <ProtectedRoute
                    exact path="/sign-in"
                    component={LoginPage}
                    condition={this.props.isUserLoggedIn === UserStatus.NotLoggedIn}
                    redirectUrl={'/chat'}
                />

                <ProtectedRoute
                    exact path="/sign-up"
                    component={RegisterPage}
                    condition={this.props.isUserLoggedIn === UserStatus.NotLoggedIn}
                    redirectUrl={'/chat'}
                />

                <ProtectedRoute
                    exact path="/"
                    component={ChatsPage}
                    condition={this.props.isUserLoggedIn === UserStatus.LoggedIn}
                    redirectUrl={'/sign-in'}
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
