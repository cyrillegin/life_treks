import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Boat from './index';

jest.mock('./controllers/scene.controller', () => () => ({ initScene: () => {} }));
jest.mock('./controllers/lights.controller', () => () => ({ initLights: () => {} }));
jest.mock('./controllers/camera.controller', () => () => ({ initCamera: () => {} }));
jest.mock('./controllers/mesh.controller', () => () => ({
  initMesh: () => {},
  showMesh: () => {},
}));
jest.mock('./controllers/curves.controller', () => () => ({
  initCurves: app => ({ ...app, render: () => {} }),
  updateFrames: () => {},
  showCurves: () => {},
  deleteCurve: app => app,
}));

describe('Boat', () => {
  beforeAll(() => {
    global.document.body.innerHTML = '<div id="canvas"></div>';
    global.fetch = () =>
      new Promise(res =>
        res({
          json: () => new Promise(inner => inner()),
        }),
      );
  });

  it('should render snapshots', () => {
    const tree = renderer.create(<Boat />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should test different displays', () => {
    const wrapper = mount(<Boat />);
    const instance = wrapper.instance();
    const inputs = wrapper.find('input');
    instance.state.loaded = true;
    instance.state.boat = {
      width: '',
      height: '',
      length: '',
      frames: '',
      test: '',
    };
    instance.app = { displayWireFrame: jest.fn() };

    inputs.forEach(input => {
      input.simulate('change');
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
