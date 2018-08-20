import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';

const styles = theme => ({

});

export class HomePage extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    devices: [],
  }

  render() {
    // const {classes} = this.props;

    return (
      <div className={this.props.classes.appOffset}>
        Hello world
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
