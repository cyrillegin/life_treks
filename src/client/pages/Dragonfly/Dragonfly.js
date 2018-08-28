import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
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

const styles = theme => ({
  root: {
    width: '80%',
    margin: 'auto',
  },
  descriptionContainer: {
    width: '36%',
    height: '300px',
    display: 'inline-block',
    padding: '10px',
  },
  imageContainer: {
    width: '60%',
    height: '300px',
    float: 'right',
    padding: '10px',
  },
  image: {
    width: '100%',
  },
  demoContainer: {
    flexGrow: 1,
    display: 'flex',
  },
  fullPaper: {
    width: '100%',
    margin: '32px 64px',
    padding: '16px',
    transition: '500ms',
  },
  leftPaper: {
    width: '33%',
    margin: '32px 0 32px 32px',
    padding: '16px',
    transition: '500ms',
  },
  rightPaper: {
    width: '100%',
    margin: '32px 32px',
    padding: '16px',
    transition: '500ms',
  },
  textField: {
    width: '100%',
  },
  title: {},
  selectedPlugin: {
    background: '#dcffdc',
  },
});

export class DragonflyPage extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    testPlugin: PropTypes.func.isRequired,
    plugins: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }

  state = {
    loading: true,
    plugins: null,
    dialogIsOpen: false,
    dialogMessage: '',
    dialogTitle: '',
    selectedPlugin: '',
    pollRate: '',
    name: '',
    description: '',
    coefficients: '',
    station: '',
    poller: '',
    pin: '',
    units: '',
    endpoint: '',
    meta: '',
  }

  handlePluginSelect(name) {
    this.setState({
      selectedPlugin: name,
      testResult: {},
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      testResult: {},
    });
  };


  render() {
    const testSensor = () => {
      this.props.testPlugin(
        this.state.selectedPlugin,
        {
          name: this.state.name,
          description: this.state.description,
          coefficients: this.state.coefficients,
          station: this.state.station,
          pollRate: this.state.pollRate,
          pin: this.state.pin,
          units: this.state.units,
          endpoint: this.state.endpoint,
          meta: this.state.meta,
        },
      ).then((data) => {
        const newState = {
          dialogIsOpen: true,
        };
        if (data.sensor) {
          this.setState({
            dialogMessage: `${this.state.name} returned a value of ${data.reading.value} and can be added.`,
            dialogTitle: 'Test successful.',
            testResult: data,
          });
        } else {
          newState.dialogMessage = `Sensor couldn't be added: ${data.error}`;
          newState.dialogTitle = 'Test Failed.';
        }
        this.setState(newState);
      });
    };

    const closeDialog = () => {
      this.setState({
        dialogIsOpen: false,
      });
    };

    const pollerIcon = (icon) => {
      switch (icon) {
        case 'cryptoPoller':
          return (
            <MonetizationOnIcon />
          );
        case 'gpioPoller':
          return (
            <ACUnitIcon />
          );
        default:
          return (
            <ShowChartIcon />
          );
      }
    };
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.demoContainer}>


          <Dialog
            open={this.state.dialogIsOpen}
            onClose={closeDialog}
            onClick={event => {
              event.nativeEvent.stopImmediatePropagation();
            }}
          >
            <DialogTitle>{this.state.dialogTitle}</DialogTitle>
            <DialogContent>
              <DialogContentText>{this.state.dialogMessage}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog} color="primary">
                Okay
              </Button>

            </DialogActions>
          </Dialog>


          <Paper className={
            this.state.selectedPlugin === '' ?
              this.props.classes.fullPaper :
              this.props.classes.leftPaper
          } elevation={4}>
            <Typography variant="headline" component="h3" className={this.props.classes.title}>
          Plugins
            </Typography>

            <List component="nav" className={this.props.classes.pluginsList}>
              {this.props.plugins.map((plugin, index) => {
                return (
                  <ListItem
                    className={plugin === this.state.selectedPlugin ?
                      this.props.classes.selectedPlugin : null
                    }
                    key={index}
                    button
                    onClick={() => {
                      this.handlePluginSelect(plugin);
                    }}>
                    <ListItemIcon>
                      {pollerIcon(plugin)}
                    </ListItemIcon>
                    <ListItemText primary={plugin} />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
          {this.state.selectedPlugin !== '' &&
            <Paper className={this.props.classes.rightPaper}>
              <Typography variant="headline" component="h3" className={this.props.classes.title}>
                Details
              </Typography>
              <form className={this.props.classes.container} noValidate autoComplete="off">
                <TextField
                  id="name"
                  label="Name"
                  onChange={this.handleChange('name')}
                  className={this.props.classes.textField}
                  value={this.state.name}
                  margin="normal"
                />
                <TextField
                  id="description"
                  label="Description"
                  onChange={this.handleChange('description')}
                  className={this.props.classes.textField}
                  value={this.state.description}
                  margin="normal"
                />
                <TextField
                  id="coefficients"
                  label="Coefficients"
                  onChange={this.handleChange('coefficients')}
                  className={this.props.classes.textField}
                  value={this.state.coefficients}
                  margin="normal"
                />
                <TextField
                  id="station"
                  label="Station"
                  onChange={this.handleChange('station')}
                  className={this.props.classes.textField}
                  value={this.state.station}
                  margin="normal"
                />
                <TextField
                  id="pollRate"
                  label="Poll Rate"
                  onChange={this.handleChange('pollRate')}
                  className={this.props.classes.textField}
                  value={this.state.pollRate}
                  margin="normal"
                />
                <TextField
                  id="pin"
                  label="Pin"
                  onChange={this.handleChange('pin')}
                  className={this.props.classes.textField}
                  value={this.state.pin}
                  margin="normal"
                />
                <TextField
                  id="units"
                  label="Units"
                  onChange={this.handleChange('units')}
                  className={this.props.classes.textField}
                  value={this.state.units}
                  margin="normal"
                />
                <TextField
                  id="endpoint"
                  label={'Endpoint'}
                  onChange={this.handleChange('endpoint')}
                  className={this.props.classes.textField}
                  value={this.state.endpoint}
                  margin="normal"
                />
                <TextField
                  id="meta"
                  label={'Meta'}
                  onChange={this.handleChange('meta')}
                  className={this.props.classes.textField}
                  value={this.state.meta}
                  margin="normal"
                />
                <Button className={this.props.classes.button} onClick={testSensor}>Test Sensor</Button>
                <Button
                  disabled={true}
                  className={this.props.classes.button}
                >
                  Submit Sensor
                </Button>
              </form>
            </Paper>
          }
        </div>

        <div className={this.props.classes.descriptionContainer}>
          We can have a description here and there will be a bunch of text and blah blah blah blah blahb labh
        </div>
        <div className={this.props.classes.imageContainer}>
          <img className={this.props.classes.image} src="/screenshots/home.png" />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DragonflyPage);
