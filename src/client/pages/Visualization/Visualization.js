import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Graph from './graph';

const styles = theme => ({
  root: {
    margin: '16px',
  },
  paper: {
    padding: '20px',
    textAlign: 'center',
  },
  graphTitle: {
    marginLeft: '8px',
    textAlign: 'left',
  },
  spinner: {
    margin: 'auto',
  },
  timeControls: {
    textAlign: 'right',
    flexGrow: '1',
    display: 'inline-block',
    margin: '10px',
  },
  textField: {
    margin: '12px',
  },
  statsContianer: {
    flexGrow: 1,
  },
  inputContainer: {
    flexGrow: 1,
  },
  extras: {
    display: 'flex',
  },
  list: {
    listStyleType: 'none',
  },
});

export class VisualizationPage extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    readings: [],
    stats: {
      min: 0,
      max: 0,
      avg: 0,
      last: 0,
      count: 0,
    },
    equation: 'x ^ 2',
    points: [
      {x: 0, y: 0},
      {x: 1, y: 1},
      {x: 2, y: 2},
      {x: 3, y: 3},
      {x: 4, y: 4},
      {x: 5, y: 5},
      {x: 6, y: 4},
      {x: 7, y: 3},
      {x: 8, y: 2},
      {x: 9, y: 1},
      {x: 10, y: 0},
    ],
  }

  parseEquation() {
    const arr = this.state.equation.split(' ').join('');
    let tree = {
      left: null,
      right: null,
      value: null,
    };
    for (let i = 0; i < arr.length; i++) {
      let value = arr[i];
      switch (arr[i]) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '^':
          tree = {
            left: tree,
            value: value,
            right: null,
          };
          break;
        default:
          if (!isNaN(parseInt(value))) {
            let cursor = 1;
            while (!isNaN(parseInt(arr[i + cursor]))) {
              value = value + arr[i + cursor];
              cursor++;
            }
            i += cursor - 1;
          }
          if (tree.value === null) {
            tree.value = value;
          } else if (tree.left === null) {
            tree.left = {
              left: null,
              right: null,
              value: value,
            };
          } else if (tree.right === null) {
            tree.right = {
              left: null,
              right: null,
              value: value,
            };
          }
      }
    }
    console.log(tree);
    const newSet = [];
    for (let i = -5; i <= 5; i++) {
      newSet.push({
        x: i,
        y: this.getValue(tree, i),
      });
    }

    this.setState({
      points: newSet,
    });
    console.log(newSet);
  }

  getValue(tree, value) {
    // leaf node
    if (tree.left === null && tree.right === null) {
      if (isNaN(parseInt(tree.value))) {
        return value;
      }
      return parseInt(tree.value);
    }

    // operator
    switch (tree.value) {
      case '+':
        return this.getValue(tree.left, value) + this.getValue(tree.right, value);
      case '-':
        return this.getValue(tree.left, value) - this.getValue(tree.right, value);
      case '*':
        return this.getValue(tree.left, value) * this.getValue(tree.right, value);
      case '/':
        return this.getValue(tree.left, value) / this.getValue(tree.right, value);
      case '^':
        console.log(tree);
        return Math.pow(this.getValue(tree.left, value), this.getValue(tree.right, value));
    }
    console.log('nope');
    console.log(tree);
  }

  render() {
    const submitEquation = () => {
      this.parseEquation();
    };

    const handleInput = e => event => {
      this.setState({
        equation: event.target.value,
      });
    };

    return (
      <div className={this.props.classes.root}>
        <Paper className={this.props.classes.paper} elevation={4}>
          <Typography variant="headline" component="h3" className={this.props.classes.graphTitle}>
            graph
          </Typography>
          <Graph
            points={this.state.points}
          />
          <div className={this.props.classes.extras}>
            <div className={this.props.classes.statsContianer}>
              <table>
                <tbody>
                  <tr>
                    <td>Min: </td>
                    <td>{this.state.stats.min}</td>
                  </tr>
                  <tr>
                    <td>Max:</td>
                    <td>{this.state.stats.max}</td>
                  </tr>
                  <tr>
                    <td>Avg:</td>
                    <td>{this.state.stats.avg}</td>
                  </tr>
                  <tr>
                    <td>Last:</td>
                    <td> {this.state.stats.last}</td>
                  </tr>
                  <tr>
                    <td>Count:</td>
                    <td> {this.state.stats.count}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={this.props.classes.inputContainer}>
              Enter your equation:
              <input type="text" onChange={handleInput('name')} />
              <button onClick={submitEquation}>
                Submit
              </button>

            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(VisualizationPage);
