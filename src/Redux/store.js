import {legacy_createStore, applyMiddleware} from 'redux'
import {reducer} from './reducer'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


const persistConfig = {
    key: 'root',
    storage,
  }
  

const persistedReducer = persistReducer(persistConfig, reducer)

let store=legacy_createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);
export {store, persistor}
