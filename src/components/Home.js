import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { Page } from './base/Page';

const Gpio = require('onoff').Gpio;

export class Home extends Page {
  constructor(props) {
    super(props);

    try {
      this.relays = [
        new Gpio(17, 'out'),
        new Gpio(18, 'out'),
        new Gpio(19, 'out'),
        new Gpio(20, 'out')
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
      // Free up resource
      relay.unexport();
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log(name + ': ' + value);
    var relayNumber = name.match(/\d+/)[0];
    this.driveRelay(relayNumber, value);

    this.setState({
      [name]: value
    });
  }

  driveRelay(relayNumber, value) {
    try {
      var relay = this.relays[relayNumber];
      if (relay.readSync() === 0 && value === true) {
        relay.writeSync(1);
      } else {
        relay.writeSync(0);
      }
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
