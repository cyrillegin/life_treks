import React from 'react';
import renderer from 'react-test-renderer';
import Boat from './index';

describe.skip('Boat', () => {
  it('should render snapshots', () => {
    const tree = renderer.create(<Boat />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
