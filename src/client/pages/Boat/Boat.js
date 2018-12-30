import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import initScene from './controllers/scene.controller';
import initLights from './controllers/lights.controller';
import CameraController from './controllers/camera.controller';
import MeshController from './controllers/mesh.controller';
import CurvesController from './controllers/curves.controller';

const baseButton = {
  position: 'absolute',
  width: '50px',
  height: '50px',
  border: '1px solid black',
  lineHeight: '50px',
  fontSize: '20px',
  fontWeight: 'bold',
  color: 'white',
  textAlign: 'center',
  background: 'hsla(0, 100%, 50%, 0.7)',
};
const styles = theme => ({
  canvas: {
    height: `${screen.height > 600 ? '600' : screen.height - 20}px`,
    width: screen.height > 600 ? '70%' : '90%',
    background: '#e0e0e0',
    margin: '16px auto',
  },
  cube: {
    width: '50px',
    height: '50px',
    position: 'absolute',
    top: '176px',
    right: '66px',
    transformStyle: 'preserve-3d',
    transform: 'rotateX(55deg) rotateY(0deg) rotateZ(45deg)',
    transition: 'transform 1s',
  },
  cameraTop: {
    ...baseButton,
    transform: 'rotateY(0deg) translateZ(25px)',
  },
  cameraSide: {
    ...baseButton,
    transform: 'rotateY(90deg) translateZ(25px)',
  },
  cameraFront: {
    ...baseButton,
    transform: 'rotateX(-90deg) translateZ(25px)',
  },
  cameraPerspective: {
    position: 'absolute',
    border: '1px solid black',
    right: '70px',
    color: 'white',
    top: '254px',
    fontSize: '21px',
    fontWeight: 'bold',
    padding: '3px',
    textAlign: 'center',
    background: 'hsla(0, 100%, 50%, 0.7)',
  },
  description: {
    width: screen.height > 600 ? '70%' : 'calc(90% - 24px)',
    padding: '12px',
    margin: '16px auto',
  },
});

export class BoatPage extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    getBoat: PropTypes.func.isRequired,
  };

  state = {
    loaded: false,
    shaded: true,
    wireframe: true,
    verticies: false,
  };

  componentDidMount() {
    this.app = initScene(document.querySelector('#canvas'));
    this.app = initLights(this.app);
    this.cameraController = new CameraController();
    this.app = this.cameraController.initCamera(this.app);

    this.meshController = new MeshController();
    this.curveController = new CurvesController();
    this.props
      .getBoat('default')
      .then(res => res.json())
      .then(data => {
        this.app = this.curveController.initCurves(this.app, data);
        this.curveController.updateFrames(this.app, data);
        this.meshController.initMesh(this.app, data);
        this.meshController.showMesh(this.app.displayShaded);
        // this.oldValues = JSON.parse(JSON.stringify(this.boatParametersService.updatePoint(data)));
        this.app.render();
        this.setState({
          loaded: true,
          boat: data,
        });
      });
  }

  render() {
    const handleDisplayChange = e => {
      if (this.state.loaded) {
        this.setState({
          [e.target.value]: !this.state[e.target.value],
        });
        if (e.target.value === 'shaded') {
          this.meshController.showMesh(!this.state[e.target.value]);
        }
        if (e.target.value === 'verticies') {
          this.app.displayVerticies = !this.app.displayVerticies;

          Object.keys(this.state.boat).forEach(key => {
            if (key === 'width' || key === 'height' || key === 'length' || key === 'frames') {
              return;
            }
            this.app = this.curveController.deleteCurve(this.app, { key });
          });
          this.curveController.initCurves(this.app, this.state.boat);
        }
        if (e.target.value === 'wireframe') {
          this.app.displayWireFrame = !this.app.displayWireFrame;
          this.curveController.showCurves(!this.app.displayWireFrame);
        }
      }
    };

    return (
      <div>
        <div id={'canvas'} className={this.props.classes.canvas} />

        <div className={this.props.classes.cube}>
          <div className={this.props.classes.cameraTop} id={'camera-top-button'}>
            Top
          </div>

          <div className={this.props.classes.cameraSide} id={'camera-side-button'}>
            Side
          </div>

          <div className={this.props.classes.cameraFront} id={'camera-front-button'}>
            Front
          </div>
        </div>
        <div className={this.props.classes.cameraPerspective} id={'camera-45-button'}>
          45°
        </div>
        {/* }


        <div className={this.props.classes.togglesContainer}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch checked={this.state.shaded} onChange={handleDisplayChange} value="shaded" />
              }
              label="Toggle Shaded"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.verticies}
                  onChange={handleDisplayChange}
                  value="verticies"
                />
              }
              label="Toggle Verticies"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.wireframe}
                  onChange={handleDisplayChange}
                  value="wireframe"
                />
              }
              label="Toggle Wireframe"
            />
          </FormGroup>
        </div>
        */}
        <Paper className={this.props.classes.description}>
          This was a project done for my senior project at New Mexico State University. The goal was
          to be able to construct a boat in 3D and output the blueprints so that an amatur boat
          maker could build it. The user would also be able to save and load their projects via json
          files as well as be able to export in obj or stl formats for 3D printing.
          <br />
          This demo allows you to view the demo boat and trigger some different rendering methods.
          You can also pan, zoom, and orbit around the boat.
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(BoatPage);
