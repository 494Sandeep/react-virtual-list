import { createStore, combineReducers, compose } from 'redux';
import { employeeReducer } from './employee/reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage

// Combine reducers
const rootReducer = combineReducers({
  employee: employeeReducer,
});

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['employee'], // only persist employee reducer
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create store with devtools + persist support
export const store = createStore(
    persistedReducer,
    composeEnhancers()
  );

export const persistor = persistStore(store);

// Root types
export type RootState = ReturnType<typeof rootReducer>;



