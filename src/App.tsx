import React, {Dispatch} from 'react';
import './App.css';
import { createBrowserHistory } from 'history';
import {connect} from "react-redux";
import {getMessagesAction, sendMessageAction} from "./store/actions/message-actions";
import { Router, Route, Redirect } from 'react-router';
import ChatsPage from "./components/ChatsPage";
import ChatPage from "./components/ChatPage";
import EventsPage from "./components/EventsPage";
import EventPage from "./components/EventPage";

const history = createBrowserHistory();

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);



    //this.props.sendMessage();
    //this.props.getMessages();
  }

  componentDidMount(): void {
    console.log("MOUNTED");
  }


  render() {
    return (
      <Router history={history}>
          <Route exact path="/">
            <Redirect to="/chat" />
          </Route>
          <Route exact path="/sign-up" component={App} />
          <Route exact path="/chat" component={ChatsPage} />
          <Route exact path="/chat/:id" component={ChatPage} />
          <Route exact path="/event" component={EventsPage} />
          <Route exact path="/event/:id" component={EventPage} />
      </Router>
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
    getMessages: () => dispatch(getMessagesAction()),
    sendMessage: () => dispatch(sendMessageAction({
      id: "2",
      senderId: "10",
      targetId: "12",
      message: "HI!",
      sendDate: new Date()
    })),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

