import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { createAsyncComp } from './createAsyncComp'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">首页</Link>
            </li>
            <li>
              <Link to="/page1">Page1</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path="/" component={createAsyncComp('Home')} />
            <Route path="/page1" component={createAsyncComp('Demo')} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default hot(module)(App)
