import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({

});

export class VisualizationPage extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        Hello visual
      </div>
    );
  }
}

export default withStyles(styles)(VisualizationPage);
