import {legacy_createStore, applyMiddleware} from 'redux'
import {reducer} from './reducer'


let store=legacy_createStore(reducer);

export {store}