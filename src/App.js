// Import React stuff
import React from 'react';
import {HashRouter} from 'react-router-dom';

// Import AWS object without services
import AWS from 'aws-sdk/global';

// Import components
import {Page} from './components/base/Page';
import {Header} from './components/Header';
import {Main} from './components/Main';
import {Footer} from './components/Footer';

// Import styles and assets
import './scss/app.scss';

class App extends Page {
  componentDidMount() {
    const loadJsonFile = require('load-json-file');

    // Load AWS configs
    (async () => {
      const awsConfig = await loadJsonFile('aws.json');

      AWS.config = new AWS.Config();
      AWS.config.accessKeyId = awsConfig.accessKeyId;
      AWS.config.secretAccessKey = awsConfig.secretAccessKey;
      AWS.config.region = awsConfig.region;
    })();
  }

  render() {
    return (<HashRouter>
      <Header/>
      <Main/>
      <Footer/>
    </HashRouter>);
  }
}

export default App;
