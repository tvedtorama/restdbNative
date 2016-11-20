import { createStore, applyMiddleware, compose } from 'redux'
import {default as createSagaMiddleware} from 'redux-saga'
import {default as mainReducer} from './reducers'
import {mainLoop, LOGIN_OK} from './sagas/mainLoop'

export {LOGIN_OK} 

const RemoteDevTools = require('remote-redux-devtools')
const {composeWithDevTools} = RemoteDevTools
const devToolsEnhancer = RemoteDevTools.default

export function createReduxStore() {
	// This causes the remote dev tool to use remotedev.io, which can be accessed at remotedev.io/local
	const composeEnhancers = composeWithDevTools({ realtime: true }) 
	
	const middleware = createSagaMiddleware()
	const store = createStore(mainReducer, applyMiddleware(middleware)) // composeEnhancers(applyMiddleware(middleware)))

	middleware.run(mainLoop)

	// store.dispatch({type: LOGIN_OK, idToken: "XXXXXXXXXXX"}) // Insert a valid idToken and uncomment to skip the login process

	return store
}
