import React from 'react';
import PhotoGrid from './PhotoGrid';

const Main = React.createClass({
  displayName : 'Main',
  render() {
    // Then we go ahead and return some JSX
    return (
      <div>
        {/* We use cloneElement here so we can auto pass down props */}
        { React.cloneElement(this.props.children, this.props) }
      </div>
    );
  }
});

export default Main;
