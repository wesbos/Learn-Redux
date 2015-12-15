import React from 'react';
import PhotoGrid from './PhotoGrid';
import { mediaEndpoint } from '../data/endpoints';
import jsonp from 'jsonp';
import { Link } from 'react-router';

const Main = React.createClass({
  displayName : 'Main',

  componentWillMount() {
    jsonp(mediaEndpoint(),null, (err,response)=> {
      if(err) {
        console.error(err);
        return;
      }
      console.log(response);
      this.props.load(response.data);
    });
    
  },

  render() {
    // Then we go ahead and return some JSX
    return (
      <div>
        <h1>
          <Link to="/">Reduxstagram</Link>
        </h1>
        {/* We use cloneElement here so we can auto pass down props */}
        { React.cloneElement(this.props.children, this.props) }
      </div>
    );
  }
});

export default Main;
