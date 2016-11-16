import {Action, combineReducers} from 'redux'
import {IState} from '../IState'
import {tasks} from './tasks'
import {loginData} from './loginData'

export default combineReducers<IState>({tasks, loginData})
