import * as React from 'react'
import {connect} from 'react-redux'

import {View, Text, TouchableHighlight} from 'react-native'
import {LOGIN_OK} from '../sagas/mainLoop'
import {styles} from '../styles'

var Auth0Lock = require('react-native-lock')

var lock = new Auth0Lock({clientId: "zoLMrrJUrcyp7iPkcpg6omSdakv5hZrS", domain: "digitalvaluenetwork.eu.auth0.com"});

function loginOk(idToken: string) {
	return { type: LOGIN_OK, idToken: idToken }
}

interface IMangledProps {
	loginOk: (idToken: string) => void
}

export class LoginRaw extends React.Component<IMangledProps, any> {

	componentDidMount() {
		this.onLogin()
	}

	onLogin() {
		lock.show({}, (err, profile, token) => {
			console.log('Logged in! : ', token);
			this.props.loginOk(token.idToken)
		});
	}

	render() {
		return <View style={styles.container}>
			<Text style={styles.welcome}>{"Please log in"}</Text>
			<TouchableHighlight onPress={() => this.onLogin()}>
				<Text>{"Touch to retry"}</Text>
			</TouchableHighlight>
		</View>
	}
}

const Login = connect(null, {loginOk})(LoginRaw) as React.ComponentClass<{}>
export {Login}
