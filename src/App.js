import React from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        This is Homepage.  
      </Route>

      <Route exact path="/test">
        This is of Test.  
      </Route>

      <Route>
        404|Not Found
      </Route>
    </Switch>
  );
}

export default App;
