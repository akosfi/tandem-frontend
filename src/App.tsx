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

const history = createBrowserHistory();

class App extends React.Component<any, any> {

    //mySocket: Socket;
    constructor(props: any) {
        super(props);
        /*
            this.mySocket = new Socket(
                (connected: Boolean) => {console.log("CONNECTION CHANGED: " + connected)},
                (error: any) => {console.log("SOCKET ERROR:" + error)},
                (message: any) => {console.log("MESSAGE RECEIVED" + message)},
                (message: any) => {console.log("MESSAGE RECEIVED" + message)},
            );

            this.mySocket.connect(2, 8000);*/

        //this.props.sendMessage();
        //this.props.getMessages();
        // this.props.sendMessage();
        this.props.connectToSocket();
    }

    componentDidMount(): void {
        console.log("MOUNTED");

    }


    render() {
        return (
            <div>
                <a onClick={this.props.sendMessage}>SEND MESSAGE</a>
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
        messages: state.messages
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        connectToSocket: () => dispatch(connectSocketAction(1, 8000)),
        sendMessage: () => dispatch(messageSendAction({
            from: 1,
            to: 2,
            text: "asd"
        })),
    };
};
/*
getMessages: () => dispatch(getMessagesAction()),
sendMessage: () => dispatch(messageSendAction({
id: "2",
senderId: "10",
targetId: "12",
message: "HI!",
sendDate: new Date()
})),
}
};
*/
export default connect(mapStateToProps, mapDispatchToProps)(App);
