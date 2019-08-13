import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { Page } from './base/Page';

export class Home extends Page {
  constructor(props) {
    super(props);

    this.mqtt = require('mqtt');
    this.brokerServer = '192.168.0.154:2000';
    this.client = null;

    this.state = {
      switch1: false,
      switch2: false,
      switch3: false,
      switch4: false,
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.client  = this.mqtt.connect('mqtt://' + this.brokerServer);

    this.client.on('connect', function() {
      console.log('Connected to broker');
    });
  }

  componentWillUnmount() {
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const switchName = target.name;

    var relayNumber = switchName.match(/\d+/)[0];
    this.driveRelay(relayNumber, value, switchName);
  }

  driveRelay(relayNumber, value, switchName) {
    try {

      console.log(switchName + ': ' + value);
      var topic = 'driveRelay';
      var message = (value === true ? 'turnOn' : 'turnOff') + '-' + relayNumber;

      this.client.publish(topic, message, { qos: 1 }, error => {
	if (error) {
          console.log(error);
        } else {
          console.log('Sent - ' + topic + ': ' + message);
        }
      });

      this.setState({
        [switchName]: value
      });

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="page home">
          <Container>
            <Row>
              <Col md={12}>
                <label>
                  <input type="checkbox" name="switch1" checked={this.state.switch1} onChange={this.handleInputChange} />
                  <div>
                    <span className="on">On</span>
                    <span className="off">Off</span>
                  </div>  
                  <i></i>
                </label>
                <label>
                  <input type="checkbox" name="switch2" checked={this.state.switch2} onChange={this.handleInputChange} />
                  <div>
                    <span className="on">On</span>
                    <span className="off">Off</span>
                  </div>  
                  <i></i>
                </label>
                <label>
                  <input type="checkbox" name="switch3" checked={this.state.switch3} onChange={this.handleInputChange} />
                  <div>
                    <span className="on">On</span>
                    <span className="off">Off</span>
                  </div>  
                  <i></i>
                </label>
                <label>
                  <input type="checkbox" name="switch4" checked={this.state.switch4} onChange={this.handleInputChange} />
                  <div>
                    <span className="on">On</span>
                    <span className="off">Off</span>
                  </div>  
                  <i></i>
                </label>
              </Col>
            </Row>
          </Container>
      </div>
    );
  }
}
