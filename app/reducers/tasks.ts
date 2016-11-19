import * as _ from 'lodash'
import {ITask} from '../IState'

import {ADD_TASK, SET_TASK_COMPLETION, DELETE_TASK} from '../sagas/mainLoop'

export function tasks(state: ITask[] = [], action: {type: string}) {
	if (action.type === ADD_TASK) {
		const {task} = <{task: {text: string, taskId: string, isDone: boolean}}><any>action
		return [...state, <ITask>task]
	}
	if (action.type === SET_TASK_COMPLETION) {
		const {id, isDone} = <{id: string, isDone: boolean}><any>action
		return [...state.map(x => x.taskId === id ? Object.assign({}, x, {isDone}) : x)]
	}

	if (action.type === DELETE_TASK) {
		const {id} = <{id: string}><any>action
		return [...state.filter(x => x.taskId != id)]
	}
	
	return state
}