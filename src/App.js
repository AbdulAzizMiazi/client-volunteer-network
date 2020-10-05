import React, { createContext, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Components/HomePage/HomePage';
import LoginPage from './Components/LoginPage/LoginPage';
import RegistrationPage from './Components/RegistrationPage/RegistrationPage';
import EventTasks from './Components/EventTasks/EventTasks';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Admin from './Components/Admin/Admin';

export const UserContext = createContext(); 

function App() {
  const[userState, setUserState] = useState({ isAuthorizedUser: false, });
  return (
    <div className="app">
    <UserContext.Provider value={[userState, setUserState]}>
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/register/:title">
          <RegistrationPage />
        </PrivateRoute>
        <PrivateRoute exact path="/events">
          <EventTasks />
        </PrivateRoute>
        <Route exact path="/admin" component={Admin} />
      </Switch>
    </Router>
    </UserContext.Provider>
    </div>
  );
}

export default App;