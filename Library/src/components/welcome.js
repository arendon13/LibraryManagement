import React, { Component } from 'react';

export default class Welcome extends Component {
  render() {
    return (
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-3">Welcome!</h1>
          <p className="lead">
            This is an application that will allow an administrator to manage
            their library by keeping track of what is borrowed, who borrowed it,
            and when did they borrow it. Additionally it will keep track when
            the items are returned. <br></br>
            Navigate to the Library to get started.
          </p>
        </div>
      </div>
    );
  }
}
