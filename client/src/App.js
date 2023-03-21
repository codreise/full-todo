import React, {useState, useEffect} from 'react';
import {unstable_HistoryRouter as HistoryRouter, Routes, Route, redirect} from "react-router-dom";
import Home from './pages/Home/Home';
import TodoPage from './pages/TodoPage';
import './App.css';
import history from './BrowserHistory';
import { connect } from 'react-redux';
import { authUserRequest } from './actions/actionCreator';

function App(props) {
  useEffect(() => {
    if(!props.user) {
      props.authUserRequest();
    }
}, [])

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<Home />}/>
        {/* localhost:3000/ -> Home component */}
        <Route path="/tasks/" element={<TodoPage />}/>
        {/* localhost:3000/tasks/ -> TodoPage component */}
      </Routes>
    </HistoryRouter>
  );
}

const mapStateToProps = ({user}) => ({user});

const mapDispatchToProps = {
  authUserRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(App);