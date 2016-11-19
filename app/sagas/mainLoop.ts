import * as _ from 'lodash'
import {takeEvery} from 'redux-saga'
import {put, take, select, call} from 'redux-saga/effects'

import {IState, ITask} from '../IState'

import {loadTasks, storeDbItem} from '../database'

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

export function* requestAddTask(idToken, action: {text: string}): Iterator<any> {
	console.log("reqAddTask", action)
	const task = {text: action.text, taskId: Date.now().toString(), isDone: false}
	const dbTask = (yield call(storeDbItem, task, idToken))
	yield put({type: ADD_TASK, task: dbTask})
}

export function* requestSetTaskCompletion(idToken, action: {id: string, isDone?: boolean}) : Iterator<any> {
	const oldTask = _((<IState>(yield select())).tasks).filter(x => x.taskId === action.id).head()
	const isDone = _.isUndefined(action.isDone) ? 
		!oldTask.isDone : 
		action.isDone

	const newTask = Object.assign({}, oldTask, {isDone})
	yield call(storeDbItem, newTask, idToken)

	yield put({type: SET_TASK_COMPLETION, id: action.id, isDone})
}

export function* requestSetAllTasksCompletion(idToken, action: {isDone?: boolean}) : Iterator<any> {
	const {isDone} = action

	const wrongStateItems = _((<IState>(yield select())).tasks).filter(x => x.isDone !== isDone)

	yield wrongStateItems.map(x => call(requestSetTaskCompletion, {id: x.taskId, isDone})).value()
}

export function* requestDeleteTask(idToken, action: {id: string}) : Iterator<any> {
	yield put({type: DELETE_TASK, id: action.id})
}

export function* requestClearCompleted(idToken, action: {}): Iterator<any> {
	const wrongStateItems = _((<IState>(yield select())).tasks).filter(x => x.isDone)

	yield wrongStateItems.map(x => call(requestDeleteTask, {id: x.taskId})).value()	
}

export function* mainLoop() : any {
	const action = yield take(LOGIN_OK) // Waits for login to complete
	
	const idToken = action.idToken
	yield put({type: SET_LOGIN_DATA, idToken})

	const loadedTasks = <ITask[]>(yield call(loadTasks, {}, idToken))
	yield loadedTasks.map(task => put({type: ADD_TASK, task}))

	yield takeEvery(REQUEST_ADD_TAKS, requestAddTask, idToken)
	yield takeEvery(REQUEST_SET_TASK_COMPLETION, requestSetTaskCompletion, idToken)
	yield takeEvery(REQUEST_SET_ALL_TASKS_COMPLETION, requestSetAllTasksCompletion, idToken)
	yield takeEvery(REQUEST_DELETE_TASK, requestDeleteTask, idToken)
	yield takeEvery(REQUEST_CLEAR_COMPLETED, requestClearCompleted, idToken)
	
//	yield put({type: REQUEST_ADD_TAKS, text: "Hei"})

/*	while (true) {
		const task = <{text: string}>(yield take(REQUEST_ADD_TAKS))

	} */
}
