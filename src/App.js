import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navs from './components/Nav'
import Home from './pages/Home'
import Test from './pages/Test'

function App() {
  return (
    <div>

      <Navs />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/test">
          <Test /> 
        </Route>

        <Route>
          404|Not Found
        </Route>
      </Switch>
    </div>
  );
}

export default App;
