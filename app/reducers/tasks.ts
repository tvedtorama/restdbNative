
import {ITask} from '../IState'

import {ADD_TASK} from '../sagas/mainLoop'

export function tasks(state: ITask[] = [], action: {type: string}) {
	if (action.type === ADD_TASK) {
		const a = <{text: string}><any>action
		return [...state, <ITask>{text: a.text, completed: false}]
	}
	return state
}