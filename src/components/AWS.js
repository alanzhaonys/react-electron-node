import React from 'react';

// Import individual service
import EC2 from 'aws-sdk/clients/ec2';
import Organizations from 'aws-sdk/clients/organizations';

import {
  Page
} from './base/Page';

export class AWS extends Page {
  componentDidMount() {

    var organizations = new Organizations();

    var organizationsParams = {};

    organizations.listAccounts(organizationsParams, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
      }
    });

    var ec2 = new EC2();
    var ec2Params = {};
    ec2.describeInstances(ec2Params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
      }
    });
  }

  render() {
    return ( < div className = "page" >
      AWS <
      /div>);
    }
  }
