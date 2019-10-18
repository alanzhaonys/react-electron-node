import React from 'react';

import { Page } from './base/Page';

import * as tf from '@tensorflow/tfjs';

export class Train extends Page {
  constructor(props) {
    super(props);

    this.state = {
      mobilenetModel: null,
    }
  }

  async componentDidMount() {
    let mobilenetModel = await tf.loadLayersModel('http://localhost:5000/models/mobilenet/model.json');
    this.setState({
      mobilenetModel: mobilenetModel
    });

    //await mobilenetModel.save('file://./path/to/my-model')
  }

  render() {
    return (
      <div className="page">
        Train
      </div>
    );
  }
}
