
export interface ITask {
	text: string
	completed: boolean
}

export interface ILoginData {
	idToken?: string
}

export interface IState {
	tasks: ITask[]
	loginData: ILoginData
}
