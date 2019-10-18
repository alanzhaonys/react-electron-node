import React from 'react';
import { NavLink } from 'react-router-dom';

import { Page } from './base/Page';

export class Header extends Page {
  render() {
    return (
      <header>
        <ul>
          <li>
            <NavLink to="/home" activeClassName="selected">Home</NavLink>
          </li>
          <li>
            <NavLink to="/train" activeClassName="selected">Train</NavLink>
          </li>
          <li>
            <NavLink to="/predict" activeClassName="selected">Predict</NavLink>
          </li>
        </ul>
      </header>
    );
  }
}
