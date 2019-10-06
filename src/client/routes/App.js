import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import NavigationMenu from '../components/NavigationMenu';

const Boat = lazy(() => import('../pages/Boat'));
const Dragonfly = lazy(() => import('../pages/Dragonfly'));
const Visualization = lazy(() => import('../pages/Visualization'));

ReactGA.initialize('UA-107911028-1');

export default class App extends Component {
  static propTypes = {};

  componentDidMount() {
    // hide the preloader.
    document.querySelector('.loader').style.visibility = 'hidden';
  }

  fireTracking = () => {
    ReactGA.pageview(window.location.hash);
  };

  render() {
    return (
      <Router onUpdate={this.fireTracking}>
        <div>
          <NavigationMenu />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/dragonfly" component={Dragonfly} />
              <Route exact path="/visualization" component={Visualization} />
              <Route component={Boat} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    );
  }
}
