import React from 'react';
import logo from './logo.svg';
import './App.css';
import {sendMessage} from './api';

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      timestamp: 'no timestamp yet'
    };

    sendMessage("HI SERVER");
  }


  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              {this.state.timestamp}
            </a>
          </header>
        </div>
    );
  }
}

export default App;
