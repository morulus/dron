import React, { Component } from 'react';
import styles from './style.css';
import _ from 'underscore';

const packageNameRegExpr = /^[a-z0-9\-_]+$/;

function filterItem(filterStr, item) {
  return filterStr===''||~item.name[0].indexOf(filterStr)||~item.keywords.indexOf(filterStr);
}

export default class PackageManager extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      items: [],
      filter: ''
    }

    this.updateDrons();

    this.search = _.debounce((queryString) => {
      this.setState({
        filter: queryString
      });
    }, 250);
  }

  searchQuery(e) {
    let query = e.target.value;
    if (packageNameRegExpr.test(query)) this.search(query);
  }

  updateDrons() {
    return this.props.getDrons()
    .then((items) => {
      this.setState({
        items: items
      });
    });
  }

  focusInput() {
    this.refs.searchInput.focus();
  }

  render() {
    var items = this.state.items
    .filter(filterItem.bind(this, this.state.filter))
    .map(function(item) {
      return <li key={item.name}>
        <h3>
          <a href={"https://www.npmjs.com/package/dron-"+item.name} className="title">{item.name}</a>
          <a href={"https://www.npmjs.com/~"+item.author} className="author">{item.author}</a>
        </h3>
        <div className="version">v.{item.version}</div>
        <descript>{item.description}</descript>
        <div className="tags">{item.keywords?item.keywords.join(', '):''}</div>
      </li>
    })
    return <div>
      <div className={styles.search}>
        <input ref="searchInput" type="text" onChange={this.searchQuery.bind(this)}/> <button onClick={this.focusInput.bind(this)}><i className="fa fa-search"></i></button>
      </div>
      <ul className={styles.packageList}>
        {items}
      </ul>
    </div>
  }
}
