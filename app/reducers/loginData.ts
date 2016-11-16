
import {ILoginData} from '../IState'

import {SET_LOGIN_DATA} from '../sagas/mainLoop'

export function loginData(state: ILoginData = {}, action: {type: string}) {

	if (action.type === SET_LOGIN_DATA) {
		const a = action as any as {idToken: string}
		const {idToken} = a 
		return <ILoginData>{idToken}
	}
	return state
}