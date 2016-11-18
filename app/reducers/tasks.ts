
import {ITask} from '../IState'

import {ADD_TASK} from '../sagas/mainLoop'

export function tasks(state: ITask[] = [], action: {type: string}) {
	if (action.type === ADD_TASK) {
		const a = <{text: string, messageId: string, isDone: boolean}><any>action
		return [...state, <ITask>(a as any)]
	}
	return state
}