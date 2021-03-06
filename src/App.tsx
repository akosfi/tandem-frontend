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
import {connectSocketAction} from "./store/socket/actions";
import {Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import {NavLink} from "react-router-dom";


const history = createBrowserHistory();

class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.props.getCurrentUser();
    }

    componentDidMount(): void {
    }

    isUserAuthenticated(): boolean {
        return this.props.isUserLoggedIn === UserStatus.LoggedIn && this.props.registrationFinished;
    }

    renderPageBasedOnUserAuthentication() {
        if(this.props.isUserLoggedIn === UserStatus.Initial) return;

        return (
            <Router history={history}>

                {this.renderNavBar()}

                <ProtectedRoute
                    exact path="/chat"
                    component={ChatsPage}
                    condition={this.isUserAuthenticated()}
                    redirectUrl={'/sign-in'}
                />

                <ProtectedRoute
                    exact path="/chat/:id"
                    component={ChatPage}
                    condition={this.isUserAuthenticated()}
                    redirectUrl={'/sign-in'}
                />

                <ProtectedRoute
                    exact path="/event"
                    component={EventsPage}
                    condition={this.isUserAuthenticated()}
                    redirectUrl={'/sign-in'}
                />

                <ProtectedRoute
                    exact path="/event/:id"
                    component={EventPage}
                    condition={this.isUserAuthenticated()}
                    redirectUrl={'/sign-in'}
                />

                <ProtectedRoute
                    exact path="/event-create"
                    component={EventCreatePage}
                    condition={this.isUserAuthenticated()}
                    redirectUrl={'/sign-in'}
                />

                <ProtectedRoute
                    exact path="/sign-in"
                    component={LoginPage}
                    condition={!this.isUserAuthenticated()}
                    redirectUrl={'/chat'}
                />

                <ProtectedRoute
                    exact path="/sign-up"
                    component={RegisterPage}
                    condition={!this.isUserAuthenticated()}
                    redirectUrl={'/chat'}
                />

                <ProtectedRoute
                    exact path="/"
                    component={ChatsPage}
                    condition={this.isUserAuthenticated()}
                    redirectUrl={'/sign-in'}
                />


            </Router>
        );
    }

    renderNavBar() {
        if(this.isUserAuthenticated()){
            return (
                <Navbar>
                    <NavbarGroup align={Alignment.LEFT}>
                        <NavbarHeading>Tandem-BME</NavbarHeading>
                        <NavbarDivider />
                    </NavbarGroup>
                    <NavbarGroup align={Alignment.RIGHT}>
                        <NavLink to="/chat">
                            <Button className={Classes.MINIMAL} icon="chat" text="Chats" />
                        </NavLink>
                        <NavLink to="/event">
                            <Button className={Classes.MINIMAL} icon="timeline-events" text="Events" />
                        </NavLink>
                    </NavbarGroup>
                </Navbar>
            );
        }
    }

    render() {

        if(this.props.registrationFinished === true) {
            this.props.connectSocketAction();
        }

        return (
            <div className="container">
                {this.renderPageBasedOnUserAuthentication()}
            </div>
        );
    }
}


const mapStateToProps = (state: any) => {
    return {
        isUserLoggedIn: state.users.currentUserAuthenticated,
        registrationFinished: state.users.current.registration_finished
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getCurrentUser: () => dispatch(getCurrentUserAction()),
        connectSocketAction: () => dispatch(connectSocketAction())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
