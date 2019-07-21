import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './index.css'

import reducers from './reducers'
import middleWare from './middlewares'

import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(reducers, middleWare)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'))