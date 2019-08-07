import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { Page } from './base/Page';

export class Home extends Page {
  constructor(props) {
    super(props);

    this.state = {
      switch1: false,
      switch2: true,
      switch3: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log(name + ': ' + value);

    this.setState({
      [name]: value
    });
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
              </Col>
            </Row>
          </Container>
      </div>
    );
  }
}
