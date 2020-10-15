import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';

export default class NavbarComponent extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <h1>navbar</h1>
      </Navbar>
    );
  }
}
