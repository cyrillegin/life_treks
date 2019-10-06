import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';

describe('Nav bar', () => {
  it('should render snapshots', () => {
    const tree = renderer
      .create(
        <Router>
          <NavBar />
        </Router>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
