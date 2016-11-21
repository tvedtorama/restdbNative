"use strict"

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import {Root} from './build/app/root' // See: ./app/root.tsx
import {createReduxStore} from './build/app/init'

var store = createReduxStore()

export default class restdbNative extends Component {

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
