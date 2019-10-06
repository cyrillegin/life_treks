import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

jest.mock('react-ga');

describe('App', () => {
  it('should render snapshots', () => {
    global.document.body.innerHTML = '<div class="loader"></div>';
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
