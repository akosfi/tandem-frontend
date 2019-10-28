import {Message} from "../models/Message";
import {MESSAGE_RECEIVED, MESSAGE_SENT, MESSAGES_GET} from "../actions";


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
      let _messagesToRecipient = state.messages[action.message.target_id];

      if(!_messagesToRecipient){
        _messagesToRecipient = [];
      }
      _messagesToRecipient.push(action.message);

      reduced =
          {
            ...state,
            messages:
                {
                  ...state.messages,
                  [action.message.target_id]: _messagesToRecipient
                }
          };
      break;

    case MESSAGE_RECEIVED:
      let _messagesFromRecipient = state.messages[action.message.sender_id];

      if(!_messagesFromRecipient){
        _messagesFromRecipient = [];
      }
      _messagesFromRecipient.push(action.message);

      reduced =
          {
            ...state,
            messages:
                {
                  ...state.messages,
                  [action.message.sender_id]: _messagesFromRecipient
                }
          };
      break;

    default:
      reduced = state;
  }
  return reduced;
}

export default messageReducer;
