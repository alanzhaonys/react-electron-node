import React from "react";
import { Route, Redirect } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Page } from "./base/Page";

import { Home } from "./Home";
import { News } from "./News";
import { Guidelines } from "./Guidelines";
import { Documentation } from "./Documentation";

// Main database class
const Database = require("alanzhao-mysql-orm-async/Database");

// Parse your enviornment variables saved in .env file
const envConfigsResult = require("dotenv").config();
if (envConfigsResult.error) {
  throw envConfigsResult.error;
}
const envConfigs = envConfigsResult.parsed;

export class Main extends Page {
  constructor() {
    super();
  }

  componentDidMount() {
    // Construct database envConfigs
    const dbConfigs = {
      dbHost: envConfigs.DB_ENDPOINT,
      dbUser: envConfigs.DB_USER,
      dbPassword: envConfigs.DB_PASSWORD,
      dbName: envConfigs.DB_NAME,
      dbPort: envConfigs.DB_PORT,
      dbConnectTimeout: envConfigs.DB_CONNECT_TIMEOUT
    };

    //console.log(dbConfigs);

    // Instantiate database
    const database = new Database(dbConfigs);

    // Connect to database
    database.connect();
  }

  render() {
    return (
      <main>
        <Container>
          <Row>
            <Col md={12}>
              <Redirect exact from="/" to="/home" />
              <Route path="/home" component={Home} />
              <Route path="/news" component={News} />
              <Route path="/guidelines" component={Guidelines} />
              <Route path="/documentation" component={Documentation} />
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}
