import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

jest.mock('react-ga');

describe.skip('App', () => {
  it('should render snapshots', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
