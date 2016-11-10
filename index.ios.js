import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {get} from 'axios'

function getHeader(dbData) {
  return {headers: { "x-apikey": dbData.apiKey }}
}

function loadShit(params, cb) {
  const dbData = {url:"https://dvntest-3ed6.restdb.io", apiKey: "581897a72ab460e916c6f598"}
  const path = "command"
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

    this.state = {count: 0, type: ''}

    const updateCount = x => this.setState({count: x.length, type: x[0].type})

    setTimeout(() => {
      loadShit({}, x => {
        console.log("got " + x.length + " items")
        updateCount(x)
      })
    }, 5000)
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
          {"first type: " + this.state.type}
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
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
