import * as _ from 'lodash'
import {ITask} from '../IState'

import {ADD_TASK, SET_TASK_COMPLETION} from '../sagas/mainLoop'

export function tasks(state: ITask[] = [], action: {type: string}) {
	if (action.type === ADD_TASK) {
		const a = <{text: string, messageId: string, isDone: boolean}><any>action
		return [...state, <ITask>(a as any)]
	}
	if (action.type === SET_TASK_COMPLETION) {
		const {id, isDone} = <{id: string, isDone: boolean}><any>action
		return [...state.map(x => x.taskId === id ? Object.assign({}, x, {isDone}) : x)]
	}
	return state
}