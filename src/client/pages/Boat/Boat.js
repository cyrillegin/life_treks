import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import initScene from './controllers/scene.controller';
import initLights from './controllers/lights.controller';
import CameraController from './controllers/camera.controller';
import MeshController from './controllers/mesh.controller';
import CurvesController from './controllers/curves.controller';


const styles = theme => ({
  canvas: {
    height: '600px',
    width: '70%',
    background: '#e0e0e0',
    margin: '72px auto',
  },
  cameraControls: {
    position: 'absolute',
    top: '202px',
    left: '15%',
    padding: '10px',
  },
  cameraControl: {
    color: 'dark-grey',
    cursor: 'pointer',
    display: 'inline-block',
    font: '0.875rem "Roboto", "Helvetica", "Arial", sans-serif',
    marginLeft: '14px',
    marginRight: '14px',
    fontWeight: '400',
  },
  cameraControlDivider: {
    background: 'linear-gradient(90deg, grey 0, black 50%, grey 90%)',
    display: 'inline-block',
    height: '25px',
    position: 'absolute',
    top: '8px',
    width: '1px',
  },
  togglesContainer: {
    position: 'absolute',
    top: '190px',
    right: '15%',
    padding: '10px',
  },
  controlsContainer: {
    margin: '0 auto',
    width: '70%',
    padding: '10px',
  },
});

export class BoatPage extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    getBoat: PropTypes.func.isRequired,
  }

  state = {
    loaded: false,
    shaded: true,
    wireframe: true,
    verticies: false,
  }

  componentDidMount() {
    this.app = initScene(document.querySelector('#canvas'));
    this.app = initLights(this.app);
    this.cameraController = new CameraController();
    this.app = this.cameraController.initCamera(this.app);

    this.meshController = new MeshController();
    this.curveController = new CurvesController();
    this.props.getBoat('default')
      .then((res) => res.json())
      .then((data) => {
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
    const handleDisplayChange = (e) => {
      if (this.state.loaded) {
        this.setState({
          [e.target.value]: !this.state[e.target.value],
        });
        if (e.target.value === 'shaded') {
          this.meshController.showMesh(!this.state[e.target.value]);
        }
        if (e.target.value === 'verticies') {
          this.app.displayVerticies = !this.app.displayVerticies;

          Object.keys(this.state.boat).forEach((key) => {
            if (key === 'width' || key === 'height' || key === 'length' || key === 'frames') {
              return;
            }
            this.app = this.curveController.deleteCurve(this.app, {key});
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

        <div className={this.props.classes.cameraControls}>
          <div className={this.props.classes.cameraControl} id={'camera-front-button'}>front</div>
          <div className={this.props.classes.cameraControlDivider}></div>
          <div className={this.props.classes.cameraControl} id={'camera-side-button'}>side</div>
          <div className={this.props.classes.cameraControlDivider}></div>
          <div className={this.props.classes.cameraControl} id={'camera-top-button'}>top</div>
          <div className={this.props.classes.cameraControlDivider}></div>
          <div className={this.props.classes.cameraControl} id={'camera-45-button'}>45</div>
        </div>

        <div className={this.props.classes.togglesContainer}>

          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.shaded}
                  onChange={handleDisplayChange}
                  value="shaded"
                />
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

        <Paper className={this.props.classes.controlsContainer}>
          This was a project done for my senior project at New Mexico State University.
          The goal was to be able to construct a boat in 3D and output
          the blueprints so that an amatur boat maker could build it.
          The user would also be able to save and load their projects via json files as
          well as be able to export in obj or stl formats for 3D printing.
          <br />
          This demo allows you to view the demo boat and trigger some different
          rendering methods. You can also pan, zoom, and orbit around the boat.
        </Paper>

      </div>
    );
  }
}

export default withStyles(styles)(BoatPage);
