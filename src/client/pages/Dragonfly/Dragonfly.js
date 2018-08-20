import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({

});

export class DragonflyPage extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        Hello dragon
      </div>
    );
  }
}

export default withStyles(styles)(DragonflyPage);
