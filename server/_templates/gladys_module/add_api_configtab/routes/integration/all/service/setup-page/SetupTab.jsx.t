---
to: ../front/src/routes/integration/all/<%= module %>/setup-page/SetupTab.jsx
---
import { MarkupText, Text, Localizer } from 'preact-i18n';
import { Component } from 'preact';
import cx from 'classnames';
import { connect } from 'unistore/preact';
import { RequestStatus } from '../../../../../utils/consts';
import { WEBSOCKET_MESSAGE_TYPES } from '../../../../../../../server/utils/constants';

const HIDDEN_API_KEY = '*********';

class SetupTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      <%= attributeName %>ConnectionStatus: null,
      <%= attributeName %>ConnectionError: null,
      <%= attributeName %>Connected: null,
      apiKeyChanges: false,
      <%= attributeName %>ApiKey: null
    };
  }
  
  componentWillMount() {
    this.loadConfiguration();
    this.props.session.dispatcher.addListener(WEBSOCKET_MESSAGE_TYPES.<%= constName %>.CONNECTED, this.displayConnectedMessage);
    this.props.session.dispatcher.addListener(WEBSOCKET_MESSAGE_TYPES.<%= constName %>.ERROR, this.display<%= className %>Error);
  }

  componentWillUnmount() {
    this.props.session.dispatcher.removeListener(WEBSOCKET_MESSAGE_TYPES.<%= constName %>.CONNECTED, this.displayConnectedMessage);
    this.props.session.dispatcher.removeListener(WEBSOCKET_MESSAGE_TYPES.<%= constName %>.ERROR, this.display<%= className %>Error);
  }

  loadConfiguration = async () => {
    let configuration = {};
    try {
      configuration = await this.props.httpClient.get('/api/v1/service/<%= module %>/config');
    } finally {
      const key = configuration.apiKey;
      this.setState({
        <%= attributeName %>ApiKey: key && `${key.replace(key.substring(3, key.length - 3), HIDDEN_API_KEY)}`,
        // HYGEN : createActions field placeholder
        // HYGEN : end of placeholder
        apiKeyChanges: false
      });
    }
  };
  updateConfiguration = e => {
    const data = {};
    data[e.target.name] = e.target.value;
    if (e.target.name === '<%= attributeName %>ApiKey') {
      data.apiKeyChanges = true;
    }
    this.setState(data);
  };
  saveConfiguration = async () => {
    event.preventDefault();
    this.setState({
      <%= attributeName %>ConnectionStatus: RequestStatus.Getting,
      <%= attributeName %>Connected: false,
      <%= attributeName %>ConnectionError: undefined
    });
    try {
      const { <%= attributeName %>ApiKey, apiKeyChanges } = this.state;
      await this.props.httpClient.post('/api/v1/service/<%= module %>/config', {
        apiKey: (apiKeyChanges && <%= attributeName %>ApiKey) || undefined
      });
      // await this.props.httpClient.get(`/api/v1/service/<%= module %>/connect`);

      this.setState({
        <%= attributeName %>ConnectionStatus: RequestStatus.Success
      });

      setTimeout(() => this.setState({ <%= attributeName %>ConnectionStatus: undefined }), 3000);
    } catch (e) {
      this.setState({
        <%= attributeName %>ConnectionStatus: RequestStatus.Error,
        apiKeyChanges: false
      });
    }
  };

  displayConnectedMessage = () => {
    // display 3 seconds a message "<%= className %> connected"
    this.setState({
      <%= attributeName %>Connected: true,
      <%= attributeName %>ConnectionError: undefined
    });
    setTimeout(
      () =>
        this.setState({
          <%= attributeName %>Connected: false,
          <%= attributeName %>ConnectionStatus: undefined
        }),
      3000
    );
  };
  display<%= className %>Error = error => {
    this.setState({
      <%= attributeName %>Connected: false,
      <%= attributeName %>ConnectionStatus: undefined,
      <%= attributeName %>ConnectionError: error
    });
  };

  render() {
    const { <%= attributeName %>ConnectionStatus, <%= attributeName %>ConnectionError, <%= attributeName %>Connected, <%= attributeName %>ApiKey, apiKeyChanges } = this.state;
    return (
      <div class="card">
        <div class="card-header">
          <h1 class="card-title">
            <Text id="integration.<%= module %>.setup.title" />
          </h1>
        </div>
        <div class="card-body">
          <div
            class={cx('dimmer', {
              active: <%= attributeName %>ConnectionStatus === RequestStatus.Getting
            })}
          >
            <div class="loader" />
            <div class="dimmer-content">
              <div class="alert alert-info">
                <MarkupText id="integration.<%= module %>.setup.<%= attributeName %>Description" />
              </div>

              {<%= attributeName %>ConnectionStatus === RequestStatus.Error && !<%= attributeName %>ConnectionError && (
                <p class="alert alert-danger">
                  <Text id="integration.<%= module %>.setup.error" />
                </p>
              )}
              {<%= attributeName %>ConnectionStatus === RequestStatus.Success && !<%= attributeName %>Connected && (
                <p class="alert alert-info">
                  <Text id="integration.<%= module %>.setup.connecting" />
                </p>
              )}
              {<%= attributeName %>Connected && (
                <p class="alert alert-success">
                  <Text id="integration.<%= module %>.setup.connected" />
                </p>
              )}
              {<%= attributeName %>ConnectionError && (
                <p class="alert alert-danger">
                  <Text id="integration.<%= module %>.setup.connectionError" />
                </p>
              )}

              <form id="<%= attributeName %>SetupForm">
                <div class="form-group">
                  <label for="<%= attributeName %>ApiKey" class="form-label">
                    <Text id={`integration.<%= module %>.setup.apiKeyLabel`} />
                  </label>
                  <Localizer>
                    <input
                      name="<%= attributeName %>ApiKey"
                      placeholder={<Text id="integration.<%= module %>.setup.apiKeyPlaceholder" />}
                      value={<%= attributeName %>ApiKey}
                      class="form-control"
                      onInput={this.updateConfiguration}
                    />
                  </Localizer>
                </div>

                <div class="row mt-5">
                  <div class="col">
                    <button
                      type="submit"
                      disabled={!apiKeyChanges}
                      class="btn btn-success"
                      onClick={this.saveConfiguration}
                    >
                      <Text id="integration.<%= module %>.setup.saveLabel" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default connect('httpClient,session', {})(SetupTab);