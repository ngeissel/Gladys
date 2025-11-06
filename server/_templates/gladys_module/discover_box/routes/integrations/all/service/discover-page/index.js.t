---
to: ../front/src/routes/integration/all/<%= module %>/discover-page/index.js
---
import { Component } from 'preact';
import { connect } from 'unistore/preact';
import <%= className %>Page from '../<%= className %>Page';
import DiscoverTab from './DiscoverTab';

class <%= className %>DiscoverPage extends Component {
  render(props) {
    return (
      <<%= className %>Page user={props.user}>
        <DiscoverTab {...props} />
      </<%= className %>Page>
    );
  }
}

export default connect('user', {})(<%= className %>DiscoverPage);