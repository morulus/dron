import React, { Component } from 'react';
import styles from './style.css';

export default class Nav extends Component {
  render() {
    return <nav className={styles.nav}>
      <a href="packages.html"><i className="fa fa-binoculars"></i> Discovering packages</a>
    </nav>
  }
}
