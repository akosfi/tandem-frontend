import React, {Dispatch} from 'react';
import './App.css';
import { createBrowserHistory } from 'history';
import {connect} from "react-redux";
import {getMessagesAction, sendMessageAction} from "./store/actions/message-actions";

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
      <div>
        <div>
          <p>{JSON.stringify(this.props.messages)}</p>
          <p>asd2</p>
          <p>asd3</p>
          <p>asd4</p>
        </div>
        <input type="text"/>
      
      </div>
      /*
      <Provider store={configureStore()}>
        <Router history={history}>
            <div>
                <Route exact path="/" component={App} />
                <Route exact path="/sign-up" component={App} />
                <Route exact path="/chat" component={App} />
                <Route exact path="/chat/:id" component={App} />
                <Route exact path="/event" component={App} />
                <Route exact path="/events" component={App} />
            </div>
        </Router>
    </Provider>*/
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

