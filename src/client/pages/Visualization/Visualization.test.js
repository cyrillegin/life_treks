import React from 'react';
import renderer from 'react-test-renderer';
import Visualization from './Visualization';

describe('Visualization', () => {
  it('should render snapshots', () => {
    global.document.body.innerHTML = '<div id="graph-container"></div>';
    const tree = renderer.create(<Visualization classes={{}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
