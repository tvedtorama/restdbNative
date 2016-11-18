import {takeEvery} from 'redux-saga'
import {put, take} from 'redux-saga/effects'

export const ADD_TASK = "ADD_TASK"
export const LOGIN_OK = "LOGIN_OK"
export const SET_LOGIN_DATA = "SET_LOGIN_DATA"
export const REQUEST_ADD_TAKS = "REQUEST_ADD_TAKS"

export function* requestAddTask(action: {text: string}) {
	yield put({type: ADD_TASK, text: action.text, taskId: Date.now().toString(), isDone: false})
}

export function* mainLoop() : any {
	const action = yield take(LOGIN_OK)
	
	console.log("all is OK! ", action)

	yield put({type: SET_LOGIN_DATA, idToken: action.idToken})

	yield takeEvery(REQUEST_ADD_TAKS, requestAddTask)

	yield put({type: REQUEST_ADD_TAKS, text: "Hei"})

/*	while (true) {
		const task = <{text: string}>(yield take(REQUEST_ADD_TAKS))

	} */
}
