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

var store = createReduxStore()

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

  render() {
    return (
      <View style={styles.container}>
        <Root store={store} />
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
});

AppRegistry.registerComponent('restdbNative', () => restdbNative);
