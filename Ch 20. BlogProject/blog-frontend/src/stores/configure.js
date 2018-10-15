import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import penderMiddleware from "redux-pender";
import * as modules from "./modules";

// 이 combineReducers 덕분에 파일 전체에서 state.~~로 각 액션들의 initialState에 접근 가능.
const reducers = combineReducers(modules);
const middlewares = [penderMiddleware()];

// 개발 모드일 때만 Redux Devtools 적용.
const isDev = process.env.NODE_ENV === "development";
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE;
const composeEnhancers = devtools || compose;

const configure = preloadedState =>
  createStore(
    reducers,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

export default configure;
