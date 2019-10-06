import React from 'react';
import renderer from 'react-test-renderer';
import Dragonfly from './Dragonfly';

describe('Dragonfly', () => {
  it('should render snapshots', () => {
    const tree = renderer
      .create(<Dragonfly classes={{}} testPlugin={() => {}} plugins={[]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
