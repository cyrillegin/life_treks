import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';

ReactDOM.render(<App />, document.getElementById('root'));

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js')
      .then(() => {
        console.info('Service worker registered');
      })
      .catch(e => {
        console.info('Error registering service worker');
        console.info(e);
      });
  }
});
