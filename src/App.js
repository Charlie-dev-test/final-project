import React, { Component } from "react";
import './normalize.css'
import './style.css'
import { Route, Switch } from "react-router-dom";
import Layout from './hoc/Layout/Layout.jsx'
import ErrorBoundary from './containers/ErrorBoundary/ErrorBoundary.jsx'
import Home from './containers/Home/Home.jsx'
import Caught from "./containers/Caught/Caught.jsx";
import Profile from "./containers/Profile/Profile";
import NotFound from "./components/NotFound/NotFound.jsx";


class App extends Component {
  render() {
    return (
      <Layout>
        <ErrorBoundary>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/caught" exact>
            <Caught />
          </Route>
          <Route path='/pokemons/:id' component={Profile} />
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
        </ErrorBoundary>
      </Layout>
    )
  }
}

export default App;