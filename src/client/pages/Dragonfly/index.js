import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ACUnitIcon from '@material-ui/icons/AcUnit';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import './styles.scss';

const PLUGINS = ['cryptoPoller', 'customEntry', 'gpioPoller', 'BMP180Poller', 'DHT11Poller'];

export default class Dragonfly extends Component {
  // static propTypes = {
  //   testPlugin: PropTypes.func.isRequired,
  // };

  constructor(props) {
    super(props);
    this.state = {
      dialogIsOpen: false,
      dialogMessage: '',
      dialogTitle: '',
      selectedPlugin: '',
      pollRate: '',
      name: '',
      description: '',
      coefficients: '',
      station: '',
      pin: '',
      units: '',
      endpoint: '',
      meta: '',
    };
  }

  handlePluginSelect(name) {
    this.setState({
      selectedPlugin: name,
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  testSensor = () => {
    this.testPlugin(this.state.selectedPlugin, {
      name: this.state.name,
      description: this.state.description,
      coefficients: this.state.coefficients,
      station: this.state.station,
      pollRate: this.state.pollRate,
      pin: this.state.pin,
      units: this.state.units,
      endpoint: this.state.endpoint,
      meta: this.state.meta,
    }).then(data => {
      this.setState({
        dialogIsOpen: true,
        dialogMessage: data,
        dialogTitle: 'Test Result',
      });
    });
  };

  closeDialog = () => {
    this.setState({
      dialogIsOpen: false,
    });
  };

  pollerIcon = icon => {
    switch (icon) {
      case 'cryptoPoller':
        return <MonetizationOnIcon />;
      case 'gpioPoller':
        return <ACUnitIcon />;
      default:
        return <ShowChartIcon />;
    }
  };

  fullscreen = e => {
    const image = document.getElementById('dragonfly-image');
    if (image.requestFullscreen) {
      image.requestFullscreen();
    } else if (image.webkitRequestFullscreen) {
      image.webkitRequestFullscreen();
    } else if (image.mozRequestFullScreen) {
      image.mozRequestFullScreen();
    } else if (image.msRequestFullscreen) {
      image.msRequestFullscreen();
    } else {
      console.error('Fullscreen API is not supported.');
    }
  };

  testPlugin = (plugin, details) =>
    new Promise((res, rej) => {
      if (plugin === 'cryptoPoller') {
        fetch('/crypto', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ plugin, details }),
        })
          .then(response => response.json())
          .then(data => {
            res(data);
          });
      } else {
        res({});
      }
    });

  render() {
    return (
      <div className="dragonfly-root">
        <div className="demo-container">
          <Dialog
            open={this.state.dialogIsOpen}
            onClose={this.closeDialog}
            onClick={event => {
              event.nativeEvent.stopImmediatePropagation();
            }}
          >
            <DialogTitle>{this.state.dialogTitle}</DialogTitle>
            <DialogContent>
              <DialogContentText>{this.state.dialogMessage}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closeDialog} color="primary">
                Okay
              </Button>
            </DialogActions>
          </Dialog>

          <Paper
            className={this.state.selectedPlugin === '' ? 'full-paper' : 'left-paper'}
            elevation={4}
          >
            <Typography variant="headline" component="h3">
              Plugins
            </Typography>

            <List component="nav" className="plugins-list">
              {PLUGINS.map((plugin, index) => (
                <ListItem
                  className={plugin === this.state.selectedPlugin ? 'selected-plugin' : null}
                  key={plugin}
                  button
                  onClick={() => {
                    this.handlePluginSelect(plugin);
                  }}
                >
                  <ListItemIcon>{this.pollerIcon(plugin)}</ListItemIcon>
                  <ListItemText primary={plugin} />
                </ListItem>
              ))}
            </List>
          </Paper>
          {this.state.selectedPlugin !== '' && (
            <Paper className="right-paper">
              <Typography variant="headline" component="h3" className="title">
                Details
              </Typography>
              <form className="container" noValidate autoComplete="off">
                <TextField
                  id="name"
                  label="Name"
                  onChange={this.handleChange('name')}
                  className="text-field"
                  value={this.state.name}
                  margin="normal"
                />
                <TextField
                  id="description"
                  label="Description"
                  onChange={this.handleChange('description')}
                  className="text-field"
                  value={this.state.description}
                  margin="normal"
                />
                <TextField
                  id="coefficients"
                  label="Coefficients"
                  onChange={this.handleChange('coefficients')}
                  className="text-field"
                  value={this.state.coefficients}
                  margin="normal"
                />
                <TextField
                  id="station"
                  label="Station"
                  onChange={this.handleChange('station')}
                  className="text-field"
                  value={this.state.station}
                  margin="normal"
                />
                <TextField
                  id="pollRate"
                  label="Poll Rate"
                  onChange={this.handleChange('pollRate')}
                  className="text-field"
                  value={this.state.pollRate}
                  margin="normal"
                />
                <TextField
                  id="pin"
                  label="Pin"
                  onChange={this.handleChange('pin')}
                  className="text-field"
                  value={this.state.pin}
                  margin="normal"
                />
                <TextField
                  id="units"
                  label="Units"
                  onChange={this.handleChange('units')}
                  className="text-field"
                  value={this.state.units}
                  margin="normal"
                />
                <TextField
                  id="endpoint"
                  label="Endpoint"
                  onChange={this.handleChange('endpoint')}
                  className="text-field"
                  value={this.state.endpoint}
                  margin="normal"
                />
                <TextField
                  id="meta"
                  label="Meta"
                  onChange={this.handleChange('meta')}
                  className="text-field"
                  value={this.state.meta}
                  margin="normal"
                />
                <Button className="button" onClick={this.testSensor}>
                  Test Sensor
                </Button>
                <Button disabled className="button">
                  Submit Sensor
                </Button>
              </form>
            </Paper>
          )}
        </div>
        <div role="button" onClick={this.fullscreen} onKeyPress={this.fullscreen} tabIndex={0}>
          <img
            className="image"
            src="/screenshots/home.webp"
            id="dragonfly-image"
            alt="Home screen of Dragonfly"
          />
        </div>
        <p className="description-container">
          Dragonfly is all purpose sensor poller designed to be an easy interface for using
          raspberry pis. You can see in the picture on the right an example of what dragonfly would
          look like with multiple sensors hooked up. Upon hooking up a sensor to a raspberry pi, the
          user can then link a poller to it and add polling details like poll rate, coefficients, a
          station name and description. If the user has many pis running at the same time, multiple
          dragonfly instances can be linked to each other or forward all of their data to a central
          server. Once a sensor has been hooked up, actions can then be added to to the poller like
          sending an email or slack or turning on another sensor
          <br />
          The example above allows you to see some of the plugins available. The only one
          functioning is the cryptopoller. In the metadata field, you can add the name of your
          favorite cryptocurrency and it will respond with its current price in US dollars.
        </p>
      </div>
    );
  }
}
