import {configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import logger from 'redux-logger';
import {rootReducer} from './root-reducer';

// Configuration object for Redux-Persist, specifies root key, storage method, and blacklisted reducers
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
};

// // Creates a persisted version of the rootReducer using the provided persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Array containing middleware(s) to be used in the Redux store, filters out any falsy values
const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(
    Boolean
);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(middleWares) // adding the logger middleware to the array of default middleware which getDefaultMiddleware returns
});

// // Creates a persistor instance that can be used to manage the persisted state of the Redux store
export const persistor = persistStore(store);
