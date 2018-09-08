import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import BoatContainer from './../pages/Boat/BoatContainer';
import DragonflyContainer from './../pages/Dragonfly/DragonflyContainer';
import VisualizationContainer from './../pages/Visualization/VisualizationContainer';
// Nav
import NavBar from './../components/NavBar/NavBar';

export default class App extends Component {
  static propTypes = {};

  componentDidMount() {
    // hide the preloader.
    document.querySelector('.loader').style.visibility = 'hidden';
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/boat" component={BoatContainer} />
          <Route exact path="/dragonfly" component={DragonflyContainer} />
          <Route exact path="/visualization" component={VisualizationContainer} />
        </div>
      </Router>
    );
  }
}
