import React, {Dispatch} from 'react';
import {createBrowserHistory} from 'history';
import {connect} from "react-redux";
import {Router, Route, Redirect} from 'react-router';
import ChatsPage from "./components/ChatsPage";
import ChatPage from "./components/ChatPage";
import EventsPage from "./components/EventsPage";
import EventPage from "./components/EventPage";
import {connectSocketAction} from "./store/socket/actions";
import {getCurrentUserAction, loginUserAction} from "./store/user/actions";
import LoginPage from "./components/LoginPage";

const history = createBrowserHistory();

class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.props.getCurrentUser();


        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(): void {
    }

    handleChange(event: any) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event: any) {
        this.props.loginUser(this.state.value);
        event.preventDefault();
    }


    renderBasedOnUserAuthentication() {
        if(this.props.isUserLoggedIn){
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
        else {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                            <input type="text" value={this.state.value} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            );
        }
    }

    render() {
        return (
            this.renderBasedOnUserAuthentication()
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
        loginUser: (name: string) => dispatch(loginUserAction(name))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
