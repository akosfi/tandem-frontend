import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import socketMiddleware from "./socket/middlewares";
import messagesReducer from "./message/reducer";
import socketReducer from "./socket/reducer";
import userReducer from "./user/reducer";
import staticReducer from "./static/reducer";
import eventsReducer from "./events/reducer";

const rootReducer = combineReducers({
    messages: messagesReducer,
    socket: socketReducer,
    users: userReducer,
    static: staticReducer,
    events: eventsReducer,
});


export default function configureStore(initialState={}) {
    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(thunk, socketMiddleware),
            (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
}
