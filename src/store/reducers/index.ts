import { combineReducers } from 'redux';
import messagesReducer  from './messages';
import socketReducer from "./socket";
export default combineReducers({
    messages: messagesReducer,
    socket: socketReducer
});
