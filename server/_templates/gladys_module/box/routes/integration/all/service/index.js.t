---
to: ../front/src/routes/integration/all/<%= module %>/index.js
---
import { Component } from 'preact';
import { connect } from 'unistore/preact';
import <%= className %>Page from './<%= className %>Page';

class <%= className %>Integration extends Component {
  render(props, {}) {
    return (
      <<%= className %>Page user={props.user}>
        <div>Hey</div>
      </<%= className %>Page>
    );
  }
}

export default connect('user', {})(<%= className %>Integration);