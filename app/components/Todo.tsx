import * as React from 'react'
import {connect} from 'react-redux'
import {spring, presets, TransitionMotion} from 'react-motion' 
import {View, ScrollView, Text, TextInput, Switch, TouchableHighlight, Button} from 'react-native'

import {IState} from '../IState' 
import {REQUEST_ADD_TAKS, REQUEST_SET_TASK_COMPLETION} from '../sagas/mainLoop'

import {styles} from '../styles'

interface ITodoRecord {
	key: string
	data: {text: string, isDone: boolean}	
}

interface ICompState {
	todos?: ITodoRecord[]
	value?: string
	selected?: string
}

interface IProps {

}

interface IMangledProps {
	todos?: ITodoRecord[]
	addTask?: (text:string) => void
	setCompletion?: (id, isDone?) => void
}

export class TodoRaw extends React.Component<IProps & IMangledProps, ICompState> {
	constructor(props: IProps & IMangledProps) {
		super(props)

		this.state = {
			todos: props.todos,
			value: '',
			selected: 'all',
		}
	}

	// TEMP logic to update state
	componentWillReceiveProps(newProps){
		this.setState({todos: newProps.todos}) 
	}

	// logic from todo, unrelated to animation
	handleChange(value: string) {
		this.setState({ value });
	}

	handleSubmit() {
		this.props.addTask(this.state.value)
		this.setState({value: ''})
	}

	handleDone(doneKey) {
		this.props.setCompletion(doneKey)
	}

	handleToggleAll() {
		const allNotDone = this.state.todos.every(({data}) => data.isDone);
		this.setState({
			todos: this.state.todos.map(({key, data: {text, isDone}}) => (
				{ key: key, data: { text: text, isDone: !allNotDone } }
			)),
		});
	}

	handleSelect(selected) {
		this.setState({ selected });
	}

	handleClearCompleted() {
		this.setState({ todos: this.state.todos.filter(({data}) => !data.isDone) });
	}

	handleDestroy(date) {
		this.setState({ todos: this.state.todos.filter(({key}) => key !== date) });
	}

	// actual animation-related logic
	getDefaultStyles() {
		return this.state.todos.map(todo => Object.assign({}, todo, { style: { height: 0, opacity: 1 } }))
	}

	getStyles() {
		const {todos, value, selected} = this.state;
		return todos.filter(({data: {isDone, text}}) => {
			return text.toUpperCase().indexOf(value.toUpperCase()) >= 0 &&
				(selected === 'completed' && isDone ||
					selected === 'active' && !isDone ||
					selected === 'all');
		})
			.map((todo, i) => {
				return Object.assign({}, todo,
					{
						style: {
							height: spring(50, presets.gentle),
							opacity: spring(1, presets.gentle),
						}
					})
			});
	}

	willEnter() {
		return {
			height: 0,
			opacity: 1,
		};
	}

	willLeave() {
		return {
			height: spring(0),
			opacity: spring(0),
		};
	}

	render() {
		const {todos, value, selected} = this.state;
		const itemsLeft = todos.filter(({data: {isDone}}) => !isDone).length;
// 		console.log("todorow", styles.todoRow)
		return (
			<View style={styles.main}>
				<Text>todos</Text>
				<View style={styles.newItemRow}>
					<Switch
						value={itemsLeft === 0} // style={{ display: todos.length === 0 ? 'none' : 'inline' }}
						onValueChange={e => this.handleToggleAll()} />

					<TextInput
						autoFocus={true}
						placeholder="What needs to be done?"
						value={value}
						style={styles.newItemEdit}
						onChange={(e) => this.handleChange(e.nativeEvent.text)}
						/>
					<Button title="Go" style={styles.newItemRowButton} onPress={() => this.handleSubmit()} />
				</View>
				<View >
					<TransitionMotion
						defaultStyles={this.getDefaultStyles()}
						styles={this.getStyles()}
						willLeave={this.willLeave}
						willEnter={this.willEnter}>
						{calculatedStyles =>
							<ScrollView style={styles.todoScroll}>
								{calculatedStyles.map(({key, style, data: {isDone, text}}) =>
									<View key={key} style={[style, {alignSelf: 'stretch'}]} >
										<View style={[styles.todoRow, isDone ? styles.todoRowCompleted : {}]}>
											<Switch
												onValueChange={() => this.handleDone(key)}
												value={isDone}
												/>
											<Text style={[styles.todoRowText, isDone ? styles.todoRowTextCompleted : {}]}>{text}</Text>
											<Button
													title="X"
													style={styles.todoDeleteButton} onPress={() => this.handleDestroy(key)}
												/>
										</View>
									</View>
								)}
							</ScrollView>
						}
					</TransitionMotion>
				</View>
				<View style={styles.footer}>
					<Text >
						<Text style={{fontWeight: 'bold'}}>
							{itemsLeft}
						</Text> {itemsLeft === 1 ? 'item' : 'items'} left
          			</Text>
					<View style={{flexDirection:'row'}}> 
						<TouchableHighlight
							style={[styles.selectButton, selected === 'all' ? styles.selectedSelectButton : {}]}
							onPress={() => this.handleSelect('all')}>
							<Text>All</Text>
						</TouchableHighlight>
						<TouchableHighlight
							style={[styles.selectButton, selected === 'active' ? styles.selectedSelectButton : {}]}
							onPress={() => this.handleSelect('active')}>
							<Text>Active</Text>
						</TouchableHighlight>
						<TouchableHighlight
							style={[styles.selectButton, selected === 'completed' ? styles.selectedSelectButton : {}]}
							onPress={() => this.handleSelect('completed')}>
							<Text>Completed</Text>
						</TouchableHighlight>
					</View>
					<TouchableHighlight  onPress={() => this.handleClearCompleted()}>
						<Text>Clear completed</Text>
          			</TouchableHighlight>
				</View>
			</View>
		);
	}
}

function mapStateToProps(state: IState, ownProps: any) : IMangledProps {
	return {todos: state.tasks.map(({taskId, text, isDone}) => ({key: taskId, data: {text, isDone}}))}
}


const Todo = connect(mapStateToProps, {
	addTask: (text) => ({type: REQUEST_ADD_TAKS, text}),
	setCompletion: (id, isDone?) => ({type: REQUEST_SET_TASK_COMPLETION, id, isDone}),
})(TodoRaw)

export {Todo}
