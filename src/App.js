// Import React stuff
import React from "react";
import { HashRouter } from "react-router-dom";

// Import components
import { Page } from "./components/base/Page";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";

// Import styles and assets
import "./scss/app.scss";

const path = require("path");

// Main database class
const Database = require("alanzhao-mysql-orm-async/Database");

class App extends Page {
  constructor(props) {
    super(props);

    console.log(process.env.NODE_ENV);

    const env = process.env.NODE_ENV;

    // Load config variables
    const loadJsonFile = require("load-json-file");
    const configFileName = "configs.json";
    const configFile =
      env === "development"
        ? path.join(process.cwd(), "configs", configFileName)
        : path.join(process.resourcesPath, "configs", configFileName);
    this.configs = loadJsonFile.sync(configFile);

    // Database connection statuses
    this.dbStatuses = {
      CONNECTING: "db-connecting",
      FAILED_TO_CONNECT: "db-failed-to-connect",
      CONNECTED: "db-connected"
    };

    // Instantiate database
    this.database = new Database(this.configs.database);

    // Initial states
    this.state = {
      dbStatus: this.dbStatuses.CONNECTING
    };
  }

  setDbStatus(status) {
    this.setState({
      dbStatus: status
    });
  }

  async componentDidMount() {
    try {
      // Connect to database
      let dbConnectResult = await this.database.connect();

      if (dbConnectResult) {
        // Add delay for UX
        setTimeout(() => {
          // Update db status
          this.setDbStatus(this.dbStatuses.CONNECTED);

          // Change color <body>
          document.body.classList.add("body-no-gradient");
        }, 2000);
      } else {
        // Add delay for UX
        setTimeout(() => {
          // Update db status
          this.setDbStatus(this.dbStatuses.FAILED_TO_CONNECT);
        }, 2000);
      }
    } catch (exception) {
      // Add delay for UX
      setTimeout(() => {
        // Update db status
        this.setDbStatus(this.dbStatuses.FAILED_TO_CONNECT);
      }, 2000);
    }
  }

  render() {
    const dbStatus = this.state.dbStatus;

    if (dbStatus === this.dbStatuses.CONNECTING) {
      return (
        <div className={dbStatus}>
          <i className="fas fa-spin fa-sync" />
        </div>
      );
    } else if (dbStatus === this.dbStatuses.FAILED_TO_CONNECT) {
      return (
        <div className={dbStatus}>
          <i className="fas fa-exclamation-triangle" /> Unable to connect to
          database,
          <br />
          close the application and try again.
        </div>
      );
    } else if (dbStatus === this.dbStatuses.CONNECTED) {
      return (
        <HashRouter>
          <Header />
          <Main />
          <Footer />
        </HashRouter>
      );
    }
  }
}

export default App;
