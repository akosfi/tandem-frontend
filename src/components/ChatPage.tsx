import React, {Dispatch} from "react";
import {connect} from "react-redux";
import {messageSendAction, messageSentAction} from "../store/actions/message-actions";
import {Message} from "../store/models/Message";

class ChatPage extends React.Component<any, any> {

    constructor(props: any){
        super(props);

        this.state = {
            recipient: this.props.match.params.id,
            inputMessage: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        console.log(this.props.messages);
    }

    handleChange(event: any) {
        this.setState({inputMessage: event.target.value});
    }

    handleSubmit(event: any) {
        this.props.sendMessage(1, this.state.recipient, this.state.inputMessage); ///SENDER IDIDIDIDIDIDID
        this.setState({inputMessage: ''});
        event.preventDefault();
    }

    getMessagesOfRecipient() {
        if(this.props.messages[this.state.recipient]){
            return this.props.messages[this.state.recipient];
        }
        return [];
    }

    render() {
        return (
           <div>
               {this.state.recipient}

               {this.getMessagesOfRecipient().map((msg: Message) => {
                   return (<p>{msg.text}</p>)
               })}

               {/*this.props.getMessagesOfRecipient(this.state.recipient).messages.map((msg: Message) => {
                   return (<h5>{msg.text}</h5>)
               })*/}

               <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.inputMessage} onChange={this.handleChange} />
                   <input type="submit" value="Submit" />
               </form>
           </div>
        );
    }
}


const mapStateToProps = (state: any) => {
    return {
        messages: state.messages.messages,
    }
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        sendMessage: (from: string, to: string, text: string) => dispatch(messageSendAction({
            from,
            to,
            text,
        })),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);

