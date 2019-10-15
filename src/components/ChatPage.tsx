import React, {Dispatch} from "react";
import {connect} from "react-redux";
import {messageSendAction} from "../store/message/actions";
import {Message} from "../store/message/models/Message";

class ChatPage extends React.Component<any, any> {

    constructor(props: any){
        super(props);

        this.state = {
            chatRecipient: this.props.match.params.id,
            inputMessage: '',
        };
        this.handleInputMessageChange = this.handleInputMessageChange.bind(this);
        this.handleInputMessageSubmit = this.handleInputMessageSubmit.bind(this);
    }

    handleInputMessageChange(event: any) {
        this.setState({inputMessage: event.target.value});
    }

    handleInputMessageSubmit(event: any) {
        this.props.sendMessage(
            this.props.currentUser.id,
            this.state.chatRecipient,
            this.state.inputMessage
        );
        this.setState({inputMessage: ''});
    }

    getMessagesWithRecipient() {
        if(this.props.messages[this.state.chatRecipient]){
            return this.props.messages[this.state.chatRecipient];
        }
        return [];
    }

    render() {
        return (
           <div>
               {this.state.chatRecipient}

               {this.getMessagesWithRecipient().map((msg: Message) => {
                   return (<p key={Math.round(Math.random() * 1000)}>{msg.text}</p>)
               })}

               <input type="text" value={this.state.inputMessage} onChange={this.handleInputMessageChange} />
               <p onClick={this.handleInputMessageSubmit}>SUBMIT</p>
           </div>
        );
    }
}


const mapStateToProps = (state: any) => {
    return {
        currentUser: state.users.current,
        messages: state.messages.messages,
    }
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        sendMessage: (from: string, to: string, text: string) => dispatch(messageSendAction({
            from,
            to,
            text,
            time: new Date()
        })),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);

