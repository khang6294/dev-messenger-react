import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "semantic-ui-css/semantic.min.css";
import {createStore ,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import AuthReducer from './store/reducers/auth'
import ChannelReducer from './store/reducers/channel'
import MessageReducer from './store/reducers/message'
import ColorReducer from './store/reducers/color'
import {BrowserRouter} from 'react-router-dom'

const rootReducer = combineReducers({
    auth: AuthReducer,
    channel: ChannelReducer,
    message: MessageReducer,
    color: ColorReducer
})


export const store = createStore(rootReducer,applyMiddleware(thunk));


ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
