import React, {Dispatch} from "react";
import {connect} from "react-redux";
import {messageSendAction, sendImageMessageAction} from "../store/message/actions";
import {Message, MessageType} from "../store/message/models/Message";
import _ from 'lodash';
import {NavLink} from 'react-router-dom'
import {Button, InputGroup, Intent, Label} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";

class ChatPage extends React.Component<any, any> {

    fileInput: any;

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

    handleInputMessageSubmit() {
        if(this.state.inputMessage === '') return;
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
            return (
                <div
                    key={Math.round(Math.random()*100000)}
                    className={'tan-chat-message tan-chat-message-own'}>
                    <p className={'tan-chat-message-content'}>
                        {msg.message}
                    </p>
                </div>
            );
        }
        else {
            return (
                <div
                    key={Math.round(Math.random()*100000)}
                    className={'tan-chat-message tan-chat-message-recipient'}>
                    <p className={'tan-chat-message-content'}>
                        {msg.message}
                    </p>
                </div>
            );
        }
    }

    renderImageMessage(msg: Message) {
        return (
            <div
                key={Math.round(Math.random()*100000)}
                className={'tan-chat-message tan-chat-message-own'}>
                <img
                    className={'tan-chat-message-image'}
                    key={msg.message} src={`http://127.0.0.1:5000/static/img/${msg.message}`} alt=""/>
            </div>
        );
    }

    render() {
        return (
           <div>
               <NavLink to="/chat"> --Chats </NavLink>

               {this.state.chatRecipient}

               <div className={"tan-chat-window"}>
                   <div className={"tan-chat-window-messages"}>
                       {this.getMessagesWithRecipient().map((msg: Message) => {
                           if(msg.message_type === MessageType.TEXT) {
                               return this.renderTextMessage(msg);
                           }
                           else{
                               return this.renderImageMessage(msg);
                           }

                       })}
                   </div>

                   <div className={"tan-chat-window-input"}>
                       <div className={"tan-chat-window-input-imageInput"}>
                           <label>
                               <Button icon="media" onClick={() => this.fileInput.click()}/>
                               <form style={{'display': 'none'}}>
                                   <input ref={element => this.fileInput = element} type="file" name="file" onChange={this.handleInputImageSubmit} />
                               </form>
                           </label>
                       </div>
                       <div className={"tan-chat-window-input-textInput"}>
                           <InputGroup
                               value={this.state.inputMessage}
                               onChange={this.handleInputMessageChange}
                               placeholder="Enter your message..."
                               rightElement={
                                   (<Button
                                       icon={IconNames.CIRCLE_ARROW_RIGHT}
                                       minimal={true}
                                       onClick={this.handleInputMessageSubmit}
                                   />)
                               }
                               onKeyPress={(target) => {
                                   if(target.key === 'Enter'){
                                       return this.handleInputMessageSubmit();
                                   }
                               }
                               }
                               type={"text"}
                           />
                       </div>
                   </div>
               </div>

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

