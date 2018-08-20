import {compose, mapProps} from 'recompose';
import Dragonfly from './Dragonfly';

export default compose(
  mapProps((ownProps) => {
    return {
      ...ownProps,
    };
  }),
)(Dragonfly);
