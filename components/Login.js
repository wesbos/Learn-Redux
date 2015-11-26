import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
  }
  render() {
    var url = "https://instagram.com/oauth/authorize/?client_id=c7a5a3eef2e2487285f37e10619615b2&redirect_uri=http://localhost/demos/simple-redux/&response_type=token&scope=public_content";
    // ACCESS TOKEN - Read only: 519208.c7a5a3e.85b261d32c4840d195af64f041a8f67b
    return  (
      <a href={url}>Log In</a>
    );
    
  }
}

export default Login;
