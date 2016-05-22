require('normalize.css/normalize.css');
require('flexboxgrid');
require('styles/App.css');

import React from 'react';
import Posts from './Posts';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <Posts />
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
