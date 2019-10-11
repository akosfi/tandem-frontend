import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import socketMiddleware from "./middlewares";
export default function configureStore(initialState={}) {
    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(thunk, socketMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    );
}
