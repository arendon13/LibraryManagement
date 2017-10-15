import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Functional(dumb) Component

const Welcome = (props) =>{
  return(
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-3">Welcome!</h1>
        <p className="lead">
          This is an application that will allow an administrator to manage
          their library by keeping track of what is borrowed, who borrowed it,
          and when did they borrow it. Additionally it will keep track when
          the items are returned.
        </p>
        <hr className="my-4"/>
        <p>Navigate to the Library to get started.</p>
        <p className="lead">
          <Link className="btn btn-primary btn-lg" to="/library">Library List</Link>
        </p>
      </div>
    </div>
  );
};

export default Welcome;
