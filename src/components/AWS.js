import React from 'react';

// Import AWS object without services
import AWS from 'aws-sdk/global';

// Import individual service
import EC2 from 'aws-sdk/clients/ec2';
import Organizations from 'aws-sdk/clients/organizations';
import CostExplorer from 'aws-sdk/clients/costexplorer';

import {
  Page
} from './base/Page';

export class AWSPage extends Page {
  componentDidMount() {

    const loadJsonFile = require('load-json-file');

    // Load AWS configs
    (async () => {
      const awsConfig = await loadJsonFile('aws.json');

      AWS.config = new AWS.Config();
      AWS.config.accessKeyId = awsConfig.accessKeyId;
      AWS.config.secretAccessKey = awsConfig.secretAccessKey;
      AWS.config.region = awsConfig.region;
      AWS.config.apiVersions = {
        organizations: '2016-11-28',
        ec2: '2016-11-15',
        costexplorer: '2017-10-25'
      }

      // Organizations
      /* Policy
       {
   "Version": "2012-10-17",
   "Statement": [{
      "Effect": "Allow",
      "Action": [
         "organizations:ListAccounts",
         "organizations:DescribeAccount"
      ],
      "Resource": "*"
   }
   ]
}*/
      var organizations = new Organizations();
      var organizationsParams = {};

      organizations.listAccounts(organizationsParams, function(err, data) {
        if (err) {
          console.log(err, err.stack);
        } else {
          console.log(data);
        }
      });

      // Cost explorer
      /* Policy
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ce:*"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
*/
      var costExplorer = new CostExplorer();
      var costExplorerParams = {
        TimePeriod: {
          Start: '2019-01-01',
          End: '2019-09-01'
        },
        Granularity: 'DAILY',
        Metrics: [
          'UsageQuantity',
          'NetAmortizedCost',
        ],
        GroupBy: [{
            Type: 'DIMENSION',
            Key: 'SERVICE'
          },
          {
            Type: 'TAG',
            Key: 'Environment'
          }
        ]
      };

      costExplorer.getCostAndUsage(costExplorerParams, function(err, data) {
        if (err) {
          console.log(err, err.stack);
        } else {
          console.log(data);
        }
      });

      // EC2
      
    /* Policy
{
   "Version": "2012-10-17",
   "Statement": [{
      "Effect": "Allow",
      "Action": [
         "ec2:DescribeInstances", "ec2:DescribeImages",
         "ec2:DescribeTags", "ec2:DescribeSnapshots"
      ],
      "Resource": "*"
   }
   ]
}
    */
      
      var ec2 = new EC2();
      var ec2Params = {};
      ec2.describeInstances(ec2Params, function(err, data) {
        if (err) {
          console.log(err, err.stack);
        } else {
          console.log(data);
        }
      });

    })();
  }

  render() {
    return ( < div className = "page" >
      AWS <
      /div>);
    }
  }
