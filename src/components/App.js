import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class App extends Component {

	static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static propTypes = {
    children: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor (props, context) {
    super(props, context);
  }

  componentWillReceiveProps (nextProps) {
    const { router } = this.context;
  }

  render () {
    return (
      <div>
        <div>Redux demo</div>
        <main className="main">{this.props.children}</main>
      </div>
    );
  }
}

export default connect()(App);