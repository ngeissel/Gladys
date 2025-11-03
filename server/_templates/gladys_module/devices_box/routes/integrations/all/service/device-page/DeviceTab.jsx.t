---
to: ../front/src/routes/integration/all/<%= module %>/device-page/DeviceTab.jsx
---
import { Text, Localizer, MarkupText } from 'preact-i18n';
import cx from 'classnames';
import debounce from 'debounce';
import { Component } from 'preact';
import { connect } from 'unistore/preact';
import EmptyState from './EmptyState';
import { RequestStatus } from '../../../../../utils/consts';
import style from './style.css';
import <%= className %>DeviceBox from '../<%= className %>DeviceBox';
import CardFilter from '../../../../../components/layout/CardFilter';


class DeviceTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      orderDir: 'asc',
      <%= attributeName %>Devices: [],
      loading: true,
      error: null,
      <%= attributeName %>Enabled: null
    };
    this.debouncedGet<%= className %>Devices = debounce(this.get<%= className %>Devices, 200).bind(this);
  }

  componentWillMount() {
    this.init();
  }

  init = async () => {
    this.setState({ loading: true });
    await Promise.all([this.loadConfiguration(), this.getHouses()]);
    if (this.state.<%= attributeName %>Enabled) {
      await this.get<%= className %>Devices();
    }
    this.setState({
      loading: false
    });
  };

  loadConfiguration = async () => {
    try {
      const <%= attributeName %>Enabled = await this.props.httpClient.get('/api/v1/service/<%= module %>/status');
      await this.setState({
        <%= attributeName %>Enabled
      });
    } catch (e) {
      console.error(e);
      await this.setState({
        <%= attributeName %>Enabled: false
      });
      if (e.response && e.response.status !== 404) {
        this.setState({ error: RequestStatus.Error });
      }
    }
  };

  get<%= className %>Devices = async () => {
    this.setState({
      <%= attributeName %>GetStatus: RequestStatus.Getting
    });
    try {
      const options = {
        order_dir: this.state.orderDir || 'asc'
      };
      if (this.state.search && this.state.search.length) {
        options.search = this.state.search;
      }

      const <%= attributeName %>Devices = await this.props.httpClient.get('/api/v1/service/<%= module %>/device', options);
      this.setState({
        <%= attributeName %>Devices,
        <%= attributeName %>GetStatus: RequestStatus.Success
      });
    } catch (e) {
      console.error(e);
      this.setState({
        <%= attributeName %>GetStatus: RequestStatus.Error
      });
    }
  };
  search = async e => {
    await this.setState({
      search: e.target.value
    });
    this.debouncedGet<%= className %>Devices();
  };
  changeOrderDir = async e => {
    await this.setState({
      orderDir: e.target.value
    });
    this.get<%= className %>Devices();
  };
  async getHouses() {
    this.setState({
      housesGetStatus: RequestStatus.Getting
    });
    try {
      const params = {
        expand: 'rooms'
      };
      const housesWithRooms = await this.props.httpClient.get(`/api/v1/house`, params);
      this.setState({
        housesWithRooms,
        housesGetStatus: RequestStatus.Success
      });
    } catch (e) {
      this.setState({
        housesGetStatus: RequestStatus.Error
      });
    }
  }
  
  render({}, { orderDir, search, <%= attributeName %>GetStatus, <%= attributeName %>Devices, housesWithRooms, <%= attributeName %>Enabled }) {
    return (
      <div class="card">
        <div class="card-header">
          <h1 class="card-title">
            <Text id="integration.<%= module %>.device.title" />
          </h1>
          <div class="page-options d-flex">
            <Localizer>
              <CardFilter
                changeOrderDir={this.changeOrderDir}
                orderValue={orderDir}
                search={this.search}
                searchValue={search}
                searchPlaceHolder={<Text id="device.searchPlaceHolder" />}
              />
            </Localizer>
          </div>
        </div>
        <div class="card-body">
          <div
            class={cx('dimmer', {
              active: <%= attributeName %>GetStatus === RequestStatus.Getting
            })}
          >
            <div class="loader" />
            <div class={cx('dimmer-content', style.<%= attributeName %>ListBody)}>
              {!<%= attributeName %>Enabled && (
                <div class="alert alert-warning">
                  <MarkupText id="integration.<%= module %>.setup.disabledWarning" />
                </div>
              )}
              <div class="row">
                {<%= attributeName %>Devices &&
                  <%= attributeName %>Devices.length > 0 &&
                  <%= attributeName %>Devices.map((device, index) => (
                    <<%= className %>DeviceBox
                      editable
                      saveButton
                      deleteButton
                      device={device}
                      deviceIndex={index}
                      housesWithRooms={housesWithRooms}
                      get<%= className %>Devices={this.get<%= className %>Devices}
                    />
                  ))}
                {<%= attributeName %>Enabled && (!<%= attributeName %>Devices || (<%= attributeName %>Devices.length === 0 && <EmptyState />))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect('httpClient', {})(DeviceTab);