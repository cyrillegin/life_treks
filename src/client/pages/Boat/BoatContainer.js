import { compose, mapProps } from 'recompose';
import Boat from './Boat';

export default compose(
  mapProps(ownProps => ({
    ...ownProps,
    getBoat: model => fetch('/models/testBoat.json'),
  })),
)(Boat);
