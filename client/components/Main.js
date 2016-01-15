import React from 'react';
import PhotoGrid from './PhotoGrid';
import { mediaEndpoint } from '../data/endpoints';
import axios from 'axios';
import { Link } from 'react-router';

const Main = React.createClass({

  displayName : 'Main',

  componentWillMount() {

    axios.get(mediaEndpoint())
      .then((response)=> {
        this.props.load(response.data.user.media.nodes);
      })
      .catch((err)=>console.error(err));
    
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
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  
});

export default Main;
