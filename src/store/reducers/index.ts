import { combineReducers } from 'redux';
import messagesReducer  from './messages';
import socketReducer from "./socket";
import userReducer from "./user";
export default combineReducers({
    messages: messagesReducer,
    socket: socketReducer,
    users: userReducer,
});
