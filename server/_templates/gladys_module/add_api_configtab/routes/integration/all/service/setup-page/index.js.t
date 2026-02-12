---
to: ../front/src/routes/integration/all/<%= module %>/setup-page/index.js
---
import { Component } from 'preact';
import { connect } from 'unistore/preact';
import <%= className %>Page from '../<%= className %>Page';
import SetupTab from './SetupTab';

class <%= className %>SetupPage extends Component {
  render(props, {}) {
    return (
      <<%= className %>Page user={props.user}>
        <SetupTab {...props} />
      </<%= className %>Page>
    );
  }
}

export default connect('user', {})(<%= className %>SetupPage);