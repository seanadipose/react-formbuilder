import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { default as thunk } from "redux-thunk";
export interface RootState {}

const reducers = {};

const rootReducer = combineReducers(reducers);

let thisWindow: any = window;

const composeEnhancers =
  thisWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(
  applyMiddleware(thunk.withExtraArgument({}))
);

const store = createStore(rootReducer, enhancers);
export default store;
