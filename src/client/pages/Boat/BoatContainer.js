import {compose, mapProps} from 'recompose';
import Boat from './Boat';

export default compose(
  mapProps((ownProps) => {
    return {
      ...ownProps,
    };
  }),
)(Boat);
