// external modules
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger'
import ReduxPromise from 'redux-promise';

//internal modules
import Home from './containers/Home'
import Upload from './pages/Upload'
import './App.css'

// State and reducers
import postsReducer from './reducers/posts_reducer'
import commentsReducer from './reducers/comments_reducer'
import likesReducer from './reducers/likes_reducer'
import userLoggedReducer from './reducers/userLogged_reducer'

const initialState = {
  // users: [],
  posts: [],
  comments: [],
  likes: [],
  user_logged: {}
};

const middlewares = applyMiddleware(logger, ReduxPromise);

const reducers = combineReducers({
  // users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
  likes: likesReducer,
  user_logged: userLoggedReducer
});

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home}/>
        <Route path="/upload" component={Upload}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App

ReactDOM.render(
  <Provider store={createStore(reducers, initialState, middlewares)}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('react-app')
);