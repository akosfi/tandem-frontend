import {MESSAGE_RECEIVED, MESSAGE_SEND, MESSAGE_SENT, MESSAGES_GET} from "../actions/action-consts";
import {Message} from "../models/Message";


const INITIAL_STATE = {
  messages: { } as { [key: string]: Array<Message> }
};


function messageReducer(state = INITIAL_STATE, action: any) {
  let reduced;
  switch (action.type)
  {
    case MESSAGES_GET:
      reduced = Object.assign({}, state, {
        messages: action.messages
      });
      break;
    case MESSAGE_SENT:
      let _messagesToRecipient = state.messages;

      if(!_messagesToRecipient[action.message.to]){
        _messagesToRecipient[action.message.to] = [];
      }
      _messagesToRecipient[action.message.to].push(action.message);


      reduced = Object.assign({}, state, {
        messages: _messagesToRecipient
      });
      break;
    case MESSAGE_RECEIVED:
      let _messagesFromRecipient = state.messages;

      if(!_messagesFromRecipient[action.message.from]){
        _messagesFromRecipient[action.message.from] = [];
      }
      _messagesFromRecipient[action.message.from].push(action.message);

      reduced = Object.assign({}, state, {
        messages: _messagesFromRecipient
      });
      break;

    default:
      reduced = state;
  }
  return reduced;
}

export default messageReducer;
