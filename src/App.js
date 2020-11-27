import React from 'react';
// Routes
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './config/routes';
// Providers
import AuthProvider from './providers/AuthProvider';

import './App.scss';

const RouterWithSubRoutes = ( route ) =>{
  const { path, exact, component: Component, routes }  = route;
  return (
    <Route 
      path = { path }
      exact = { exact }
      render = { props => <Component routes = { routes } {...props}/>}
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          { routes.map( (route, index)=> (
            <RouterWithSubRoutes 
               key = { index } 
               {...route}
             />
             )) }
        </Switch>
      </Router>
    </AuthProvider>
   
  );
}

export default App;
