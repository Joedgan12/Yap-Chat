import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Yap from './components/Yap';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/yap" component={Yap} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
