import * as React from 'react'
import {connect} from 'react-redux'
import {spring, presets, TransitionMotion} from 'react-motion' 

import {View, ScrollView, Text, TextInput, Switch, TouchableHighlight, Button} from 'react-native'
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

export class TodoRaw extends React.Component<any, ICompState> {
	constructor(props) {
		super(props)

		this.state = {
			todos: [
				// key is creation date
				{ key: 't1', data: { text: 'Board the plane', isDone: false } },
				{ key: 't2', data: { text: 'Sleep', isDone: false } },
				{ key: 't3', data: { text: 'Try to finish conference slides', isDone: false } },
				{ key: 't4', data: { text: 'Eat cheese and drink wine', isDone: false } },
				{ key: 't5', data: { text: 'Go around in Uber', isDone: false } },
				{ key: 't6', data: { text: 'Talk with conf attendees', isDone: false } },
				{ key: 't7', data: { text: 'Show Demo 1', isDone: false } },
				{ key: 't8', data: { text: 'Show Demo 2', isDone: false } },
				{ key: 't9', data: { text: 'Lament about the state of animation', isDone: false } },
				{ key: 't10', data: { text: 'Show Secret Demo', isDone: false } },
				{ key: 't11', data: { text: 'Go home', isDone: false } },
			],
			value: '',
			selected: 'all',
		}
	}

	// logic from todo, unrelated to animation
	handleChange(value: string) {
		this.setState({ value });
	}

	handleSubmit() {
		const newItem = {
			key: 't' + Date.now(),
			data: { text: this.state.value, isDone: false },
		};
		// append at head
		this.setState({ todos: [newItem, ...this.state.todos] });
	}

	handleDone(doneKey) {
		this.setState({
			todos: this.state.todos.map(todo => {
				const {key, data: {text, isDone}} = todo;
				return key === doneKey
					? { key: key, data: { text: text, isDone: !isDone } }
					: todo;
			}),
		});
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

const Todo = TodoRaw

export {Todo}
