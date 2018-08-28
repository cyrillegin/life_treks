import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
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
});

export class BoatPage extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    getBoat: PropTypes.func.isRequired,
  }

  state = {
    loaded: false,
    shaded: false,
    wireframe: false,
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
          this.meshController.showMesh(this.state[e.target.value]);
        }
        if (e.target.value === 'verticies') {
          this.app.displayVerticies = !this.app.displayVerticies;
          this.props.getBoat()
            .then((res) => res.json())
            .then((data) => {
              Object.keys(data).forEach((key) => {
                if (key === 'width' || key === 'height' || key === 'length' || key === 'frames') {
                  return;
                }
                this.app = this.curveController.deleteCurve(this.app, {key});
              });
              this.curveController.initCurves(this.app, data);
            });
        }
        if (e.target.value === 'wireframe') {
          this.app.displayWireFrame = !this.app.displayWireFrame;
          this.curveController.showCurves(this.app.displayWireFrame);
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
      </div>
    );
  }
}

export default withStyles(styles)(BoatPage);
