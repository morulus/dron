import './style.css';
import PackageManager from './components/PackageManager/index.jsx';
import Nav from './components/Nav/index.jsx';

import { getDrons } from './lib/npmApi';

import React from 'react';
import ReactDOM from 'react-dom';

export function renderPackageManager(root) {
  ReactDOM.render(React.createElement(PackageManager, {
    getDrons: getDrons
  }), root);
}

export function renderNav(root) {
  ReactDOM.render(React.createElement(Nav), root);
}

export followUserMouse from './lib/followMouse';
export randomizeContent from './lib/randomizeContent';
