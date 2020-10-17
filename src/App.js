import React from 'react'
import{
  BrowserRouter as Router,
  Switch,
  Route, Link
} from 'react-router-dom'
import Home from './Views/Home'



function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
    
  )
}

export default App;

