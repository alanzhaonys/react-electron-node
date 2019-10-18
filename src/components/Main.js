import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { Page } from './base/Page';

import { Home } from './Home';
import { Train } from './Train';
import { Predict } from './Predict';

export class Main extends Page {
  render() {
    return (
        <main>
          <Container>
            <Row>
              <Col md={12}>
                <Redirect exact from="/" to="/home" />
                <Route path="/home" component={Home} />
                <Route path="/train" component={Train} />
                <Route path="/predict" component={Predict} />
              </Col>
            </Row>
          </Container>
        </main>
    );
  }
}
