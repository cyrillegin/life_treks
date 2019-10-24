import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationMenu from './index';

describe('Navigation Menu', () => {
  it('should render snapshots', () => {
    global.window.location.pathname = '/';
    const tree = renderer
      .create(
        <Router>
          <NavigationMenu />
        </Router>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});