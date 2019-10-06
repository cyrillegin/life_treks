import React, { Component } from 'react';
import initScene from './controllers/scene.controller';
import initLights from './controllers/lights.controller';
import CameraController from './controllers/camera.controller';
import MeshController from './controllers/mesh.controller';
import CurvesController from './controllers/curves.controller';
import './styles.scss';

export default class Boat extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      shaded: true,
      wireframe: true,
      verticies: false,
    };
  }

  componentDidMount() {
    this.app = initScene(document.querySelector('#canvas'));
    this.app = initLights(this.app);
    this.cameraController = new CameraController();
    this.app = this.cameraController.initCamera(this.app);

    this.meshController = new MeshController();
    this.curveController = new CurvesController();

    fetch('/models/testBoat.json')
      .then(res => res.json())
      .then(data => {
        this.app = this.curveController.initCurves(this.app, data);
        this.curveController.updateFrames(this.app, data);
        this.meshController.initMesh(this.app, data);
        this.meshController.showMesh(this.app.displayShaded);
        // this.oldValues=JSON.parse(JSON.stringify(this.boatParametersService.updatePoint(data)));
        this.app.render();
        this.setState({
          loaded: true,
          boat: data,
        });
      });
  }

  handleDisplayChange = e => {
    if (this.state.loaded) {
      const { value } = e.target;
      const currentState = this.state[value];
      this.setState({
        [value]: !currentState,
      });
      if (value === 'shaded') {
        this.meshController.showMesh(!currentState);
      }
      if (value === 'verticies') {
        this.app.displayVerticies = !this.app.displayVerticies;

        Object.keys(this.state.boat).forEach(key => {
          if (key === 'width' || key === 'height' || key === 'length' || key === 'frames') {
            return;
          }
          this.app = this.curveController.deleteCurve(this.app, { key });
        });
        this.curveController.initCurves(this.app, this.state.boat);
      }
      if (value === 'wireframe') {
        this.app.displayWireFrame = !this.app.displayWireFrame;
        this.curveController.showCurves(!this.app.displayWireFrame);
      }
    }
  };

  render() {
    return (
      <div>
        <div id="canvas" className="canvas" />
        hei
        <div className="cube">
          <div className="camera-top" id="camera-top-button">
            Top
          </div>

          <div className="camera-side" id="camera-side-button">
            Side
          </div>

          <div className="camera-front" id="camera-front-button">
            Front
          </div>
        </div>
        <div className="camera-perspective" id="camera-45-button">
          45°
        </div>
        <div className="toggles-container">
          Toggle Shaded
          <input type="checkbox" value={this.state.shaded} onChange={this.handleDisplayChange} />
          Toggle Vertices
          <input type="checkbox" value={this.state.verticies} onChange={this.handleDisplayChange} />
          Toggle Wireframe
          <input type="checkbox" value={this.state.wireframe} onChange={this.handleDisplayChange} />
        </div>
        <div className="description">
          This was a project done for my senior project at New Mexico State University. The goal was
          to be able to construct a boat in 3D and output the blueprints so that an amateur boat
          maker could build it. The user would also be able to save and load their projects via json
          files as well as be able to export in obj or stl formats for 3D printing.
          <br />
          This demo allows you to view the demo boat and trigger some different rendering methods.
          You can also pan, zoom, and orbit around the boat.
        </div>
      </div>
    );
  }
}
