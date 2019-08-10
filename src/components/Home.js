import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { Page } from './base/Page';

const Gpio = require('onoff').Gpio;

export class Home extends Page {
  constructor(props) {
    super(props);

    this.HIGH = 1;
    this.LOW = 0;

    // run `raspi-gpio get` to get initial gpio state
    try {
      this.relays = [
        new Gpio(2, 'high'),
        new Gpio(3, 'high'),
        new Gpio(4, 'high'),
        new Gpio(5, 'high')
      ];
    } catch (error) {
      console.log(error);
    }

    this.state = {
      switch1: false,
      switch2: false,
      switch3: false,
      switch4: false,
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillUnmount() {
    this.relays.forEach(relay => {
      relay.writeSync(this.HIGH);
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const switchName = target.name;

    var relayNumber = switchName.match(/\d+/)[0];
    this.driveRelay(relayNumber - 1, value, switchName);
  }

  driveRelay(relayNumber, value, switchName) {
    try {
      var relay = this.relays[relayNumber];
      if (!relay) {
        return false;
      }

      if (relay.readSync() === this.HIGH && value === true) {
	// Turn it on
        relay.writeSync(this.LOW);
      } else {
	// Turn it off
        relay.writeSync(this.HIGH);
      }

      console.log(switchName + ': ' + value);

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
