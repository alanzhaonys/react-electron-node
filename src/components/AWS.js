import React from 'react';

// Import individual service
import EC2 from 'aws-sdk/clients/ec2';

import {Page} from './base/Page';

export class AWS extends Page {
  componentDidMount() {
    var ec2 = new EC2();

    var params = {};
    ec2.describeInstances(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        console.log(data); // successful response
      }
    });
  }

  render() {
    return (<div className="page">
      AWS
    </div>);
  }
}
