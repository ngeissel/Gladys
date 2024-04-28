---
to: ../front/src/routes/integration/all/<%= module %>/index.js
---
import { Component } from 'preact';
import { connect } from 'unistore/preact';
import actions from './actions';
import <%= className %>Page from './<%= className %>Page';
import DeviceTab from './device-page/DeviceTab';

class <%= className %>Integration extends Component {
  componentWillMount() {
    this.props.getIntegrationByName('<%= module %>');
    this.props.getHouses();
    this.props.get<%= className %>Devices();
    this.props.loadProps();
  }

  componentWillUnmount() {
    // TODO or REMOVE
  }

  render(props, {}) {
    return (
      <<%= className %>Page>
        <DeviceTab {...props} />
      </<%= className %>Page>
    );
  }
}

export default connect(
  'user,session,<%= attributeName %>Username,<%= attributeName %>Password,<%= attributeName %>ConnectionStatus,<%= attributeName %>Connected,<%= attributeName %>ConnectionError,<%= attributeName %>Devices,housesWithRooms,<%= attributeName %>Search,get<%= className %>OrderDir',
  actions
)(<%= className %>Integration);