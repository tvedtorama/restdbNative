import {put, take} from 'redux-saga/effects'

export const ADD_TASK = "ADD_TASK"
export const LOGIN_OK = "LOGIN_OK"
export const SET_LOGIN_DATA = "SET_LOGIN_DATA"

export function* mainLoop() : any {
	yield put({type: ADD_TASK, text: "HEI"})

	const action = yield take(LOGIN_OK)
	
	console.log("all is OK! ", action)

	yield put({type: SET_LOGIN_DATA, idToken: action.idToken})
}
