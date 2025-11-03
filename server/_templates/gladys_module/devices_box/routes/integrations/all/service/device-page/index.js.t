---
to: ../front/src/routes/integration/all/<%= module %>/device-page/index.js
---
import { Component } from 'preact';
import { connect } from 'unistore/preact';
import <%= className %>Page from '../<%= className %>Page';
import DeviceTab from './DeviceTab';

class <%= className %>DevicePage extends Component {
  render(props) {
    return (
      <<%= className %>Page user={props.user}>
        <DeviceTab {...props} />
      </<%= className %>Page>
    );
  }
}

export default connect('user', {})(<%= className %>DevicePage);