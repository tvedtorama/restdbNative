import * as _ from 'lodash'
import {takeEvery} from 'redux-saga'
import {put, take, select, call} from 'redux-saga/effects'

import {IState} from '../IState'

// Actions from saga to reducer 
export const ADD_TASK = "ADD_TASK"
export const SET_TASK_COMPLETION = "SET_TASK_COMPLETION"
export const LOGIN_OK = "LOGIN_OK"
export const SET_LOGIN_DATA = "SET_LOGIN_DATA"
export const DELETE_TASK = "DELETE_TASK"

// Actions from GUI to saga
export const REQUEST_ADD_TAKS = "REQUEST_ADD_TAKS"
export const REQUEST_SET_TASK_COMPLETION = "REQUEST_SET_TASK_COMPLETION"
export const REQUEST_SET_ALL_TASKS_COMPLETION = "REQUEST_SET_ALL_TASKS_COMPLETION"
export const REQUEST_DELETE_TASK = "REQUEST_DELETE_TASK"
export const REQUEST_CLEAR_COMPLETED = "REQUEST_CLEAR_COMPLETED"

export function* requestAddTask(action: {text: string}) {
	yield put({type: ADD_TASK, text: action.text, taskId: Date.now().toString(), isDone: false})
}

export function* requestSetTaskCompletion(action: {id: string, isDone?: boolean}) : Iterator<any> {
	const isDone = _.isUndefined(action.isDone) ? 
		!_((<IState>(yield select())).tasks).filter(x => x.taskId === action.id).head().isDone : 
		action.isDone

	yield put({type: SET_TASK_COMPLETION, id: action.id, isDone})
}

export function* requestSetAllTasksCompletion(action: {isDone?: boolean}) : Iterator<any> {
	const {isDone} = action

	const wrongStateItems = _((<IState>(yield select())).tasks).filter(x => x.isDone !== isDone)

	yield wrongStateItems.map(x => call(requestSetTaskCompletion, {id: x.taskId, isDone})).value()
}

export function* requestDeleteTask(action: {id: string}) : Iterator<any> {
	yield put({type: DELETE_TASK, id: action.id})
}

export function* requestClearCompleted(action: {}): Iterator<any> {
	const wrongStateItems = _((<IState>(yield select())).tasks).filter(x => x.isDone)

	yield wrongStateItems.map(x => call(requestDeleteTask, {id: x.taskId})).value()	
}

export function* mainLoop() : any {
	const action = yield take(LOGIN_OK)
	
	console.log("all is OK! ", action)

	yield put({type: SET_LOGIN_DATA, idToken: action.idToken})

	yield takeEvery(REQUEST_ADD_TAKS, requestAddTask)
	yield takeEvery(REQUEST_SET_TASK_COMPLETION, requestSetTaskCompletion)
	yield takeEvery(REQUEST_SET_ALL_TASKS_COMPLETION, requestSetAllTasksCompletion)
	yield takeEvery(REQUEST_DELETE_TASK, requestDeleteTask)
	yield takeEvery(REQUEST_CLEAR_COMPLETED, requestClearCompleted)
	
	yield put({type: REQUEST_ADD_TAKS, text: "Hei"})

/*	while (true) {
		const task = <{text: string}>(yield take(REQUEST_ADD_TAKS))

	} */
}
