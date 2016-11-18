
export interface ITask {
	taskId: string
	text: string
	isDone: boolean
}

export interface ILoginData {
	idToken?: string
}

export interface IState {
	tasks: ITask[]
	loginData: ILoginData
}
