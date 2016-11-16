"use strict"

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import {Root} from './build/app/root'
import {createReduxStore, LOGIN_OK} from './build/app/init'

import {get, post} from 'axios'

import Auth0Lock from 'react-native-lock'

var store = createReduxStore()

var lock = new Auth0Lock({clientId: "zoLMrrJUrcyp7iPkcpg6omSdakv5hZrS", domain: "digitalvaluenetwork.eu.auth0.com"});

function getHeader(dbData, idToken) {
  const apiKey = idToken ? null : { "x-apikey": dbData.apiKey }
  const token = idToken ? {'Authorization': 'Bearer ' + idToken} : null
  return {headers: Object.assign({}, apiKey, token)}
}

const dbData = {url:"https://reactnative-ec9e.restdb.io", apiKey: "582aa43e178b07f36f7e5043"}

function loadShit(params, cb) {
  const path = "message"
  get(`${dbData.url}/rest/${path}`, Object.assign(getHeader(dbData), {
    params
  })).then(x => {
    cb(x.data)
  }).catch(err => {
    console.error("error in axios", err)
  })
}

export default class restdbNative extends Component {
  constructor(props) {
    super(props)

    this.state = {count: 0, message: 'N/A'}

    const updateCount = x => this.setState({count: x.length, message: x[0].message})

    setTimeout(() => {
      loadShit({}, x => {
        console.log("got " + x.length + " items")
        updateCount(x)
      })
    }, 5000)
  }

  postItem(idToken) {
    const collection = "message"
    const item = {message: "we post, ergo we live " + Math.round(Math.random() * 100)}
    return Promise.resolve(post(`${dbData.url}/rest/${collection}`, item, getHeader(dbData, idToken))).then(x => {
      return x.data
    })
  }

  onLogin() {
    lock.show({}, (err, profile, token) => {
      console.log('Logged in! : ', token);
      this.postItem(token.idToken)
      store.dispatch({type: LOGIN_OK, idToken: token.idToken})
    });
  }

  render() {
    const hell = x => 10 * x
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
        {
          "Welcome to React Native! " + hell(24)
        }
        </Text>
        <Text style={styles.info}>
          {"items loaded: " + this.state.count}
        </Text>
        <Text style={styles.info}>
          {"first message: " + this.state.message}
        </Text>
        <Root store={store}/>
        <TouchableHighlight onPress={x => this.onLogin()}>
          <Text>{"click here to log on"}</Text>
        </TouchableHighlight>        
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  info: {
    textAlign: 'center',
    marginBottom: 5,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('restdbNative', () => restdbNative);
