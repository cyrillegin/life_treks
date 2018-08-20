import {compose, mapProps} from 'recompose';
import Home from './Home';

export default compose(
  mapProps((ownProps) => {
    return {
      ...ownProps,
    };
  }),
)(Home);
