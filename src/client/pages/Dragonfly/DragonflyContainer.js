import { compose, mapProps } from 'recompose';
import Dragonfly from './Dragonfly';

export default compose(
  mapProps(ownProps => ({
    ...ownProps,
    testPlugin: (plugin, details) => new Promise((res, rej) => {
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
    }),
    plugins: ['cryptoPoller', 'customEntry', 'gpioPoller', 'BMP180Poller', 'DHT11Poller'],
  })),
)(Dragonfly);
