import React from 'react';
import PhotoGrid from './PhotoGrid';

const Main = React.createClass({
  displayName : 'Main',
  render() {
    // Then we go ahead and return some JSX
    return (
      <div>
        <PhotoGrid {...this.props} />
      </div>
    );
  }
});

export default Main;
