import * as React from 'react'
import {IState,ITask} from './IState'
import {connect, Provider} from 'react-redux'
import {Text} from 'react-native'
import {Login} from './components/Login'
import {Todo} from './components/Todo'


interface IProps {

}

interface IMangedProps {
	tasks: ITask[]
	loggedIn: boolean
}

export class MainRaw extends React.Component<IProps & IMangedProps, any> {
	render() {
		if (this.props.loggedIn)
			return <Todo />
		else 
			return <Login />
	}
}

function mapStateToProps(state: IState, ownProps: IProps) : IMangedProps {
	return {tasks: state.tasks, loggedIn: state.loginData.idToken ? true : false}
}

const Main = connect(mapStateToProps)(MainRaw) as React.ComponentClass<IProps>


export class Root extends React.Component<any, any> {
	render() {
		return <Provider store={this.props.store}><Main /></Provider>
		// return <Text>{"hei"}</Text>
	}
}