import React, {Dispatch} from "react";
import {connect} from "react-redux";
import {messageSendAction, sendImageMessageAction} from "../store/message/actions";
import {Message, MessageType} from "../store/message/models/Message";
import _ from 'lodash';
import {NavLink} from 'react-router-dom'

class ChatPage extends React.Component<any, any> {

    constructor(props: any){
        super(props);

        this.state = {
            chatRecipient: this.props.match.params.id,
            inputMessage: '',
        };
        this.handleInputMessageChange = this.handleInputMessageChange.bind(this);
        this.handleInputMessageSubmit = this.handleInputMessageSubmit.bind(this);
        this.handleInputImageSubmit = this.handleInputImageSubmit.bind(this);
        this.renderTextMessage = this.renderTextMessage.bind(this);
        this.renderImageMessage = this.renderImageMessage.bind(this);
    }

    handleInputMessageChange(event: any) {
        this.setState({inputMessage: event.target.value});
    }

    handleInputMessageSubmit(event: any) {
        this.props.sendTextMessage(
            this.props.currentUser.id,
            this.state.chatRecipient,
            this.state.inputMessage
        );
        this.setState({inputMessage: ''});
    }

    handleInputImageSubmit(event: any) {
        const fileToUpload = event.target.files[0];
        this.props.sendImageMessage(fileToUpload, this.props.currentUser.id, this.state.chatRecipient);
    }

    getMessagesWithRecipient() {
        let messagesWithRecipient = this.props.messages[this.state.chatRecipient];
        if(messagesWithRecipient){
            return _.sortBy(
                messagesWithRecipient,
                (message: Message) => new Date(message.sent_at));
        }
        return [];
    }

    renderTextMessage(msg: Message) {
        if(msg.sender_id.toString() === this.props.currentUser.id.toString()) {
            return (<p style={{textAlign: 'right'}} key={Math.round(Math.random() * 1000)}>{msg.message}</p>)
        }
        else {
            return (<p key={Math.round(Math.random() * 1000)}>{msg.message}</p>)
        }
    }

    renderImageMessage(msg: Message) {
        return <img src={`http://127.0.0.1:5000/static/img/${msg.message}`} alt=""/>
    }

    render() {
        return (
           <div>
               <NavLink to="/chat"> --Chats </NavLink>

               {this.state.chatRecipient}

               {this.getMessagesWithRecipient().map((msg: Message) => {
                   if(msg.message_type === MessageType.TEXT) {
                       return this.renderTextMessage(msg);
                   }
                   else{
                       return this.renderImageMessage(msg);
                   }

               })}

               <input type="text" value={this.state.inputMessage} onChange={this.handleInputMessageChange} />
               <p onClick={this.handleInputMessageSubmit}>SUBMIT</p>

               <form>
                   <input type="file" name="file" onChange={this.handleInputImageSubmit} />
               </form>

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
        sendTextMessage: (from: string, to: string, text: string) => dispatch(messageSendAction({
            sender_id: from,
            target_id: to,
            message: text,
            sent_at: new Date(),
            message_type: MessageType.TEXT
        })),
        sendImageMessage: (file: any, sender_id: number, target_id: number) => dispatch(sendImageMessageAction(file, sender_id, target_id))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);

