import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { Text } from 'preact-i18n';
import actions from '../../../actions/dashboard/boxes/vacbot';
import { RequestStatus } from '../../../utils/consts';
import get from 'get-value';
import { WEBSOCKET_MESSAGE_TYPES, DEVICE_FEATURE_TYPES, VACBOT_MODE } from '../../../../../server/utils/constants';
import debounce from 'debounce';
import VacbotModeControls from './VacbotModeControls';

const updateDeviceFeaturesString = (deviceFeatures, deviceFeatureSelector, lastValueString, lastValueChange) => {
  return deviceFeatures.map(feature => {
    if (feature.selector === deviceFeatureSelector) {
      return {
        ...feature,
        last_value_string: lastValueString,
        last_value_changed: lastValueChange
      };
    }
    return feature;
  });
};

const VacbotBox = ({ children, ...props }) => {
  const { boxTitle, mapFeature = {} } = props;

  return (
    <div class="card">
      
        <div class="card-body">
          {mapFeature.name} - <img src={mapFeature.last_value_string} />
          
        </div>
      
    </div>
  );
};

class VacbotBoxComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      device: {},
      deviceFeatures: [],
      status: RequestStatus.Getting
    };
  }
  getDevice = async () => {
    try {
      this.setState({ status: RequestStatus.Getting });
      const vacbotDevice = await this.props.httpClient.get(`/api/v1/device/${this.props.box.device_feature}`);
      const mapFeature = vacbotDevice.features.find(f => f.type === DEVICE_FEATURE_TYPES.VACBOT.MAP);
      const imageMap = mapFeature.last_value_string;
      
      this.setState({
        mapFeature,
        imageMap,
        status: RequestStatus.Success
      });
    } catch (e) {
      console.error(e);
      this.setState({
        status: RequestStatus.Error
      });
    }
  };
  refreshData = async () => {
    try {
      this.setState({ status: RequestStatus.Getting });
      this.displayMap()
      const imageMap = this.state.mapFeature.last_value_string;
      const backgroundImage = this.state.backgroundImage;
      console.log(backgroundImage);
      this.setState({
        imageMap,
        backgroundImage,
        status: RequestStatus.Success
      });
    } catch (e) {
      console.error(e);
      this.setState({
        status: RequestStatus.Error
      });
    }
  };
  

  updateDeviceTextWebsocket = payload => {
    let { deviceFeatures } = this.state;
    if (deviceFeatures) {
      deviceFeatures = updateDeviceFeaturesString(
        deviceFeatures,
        payload.device_feature,
        payload.last_value_string,
        payload.last_value_changed
      );
      this.setState({
        deviceFeatures
      });
    }
  };
  componentDidMount() {
    this.getDevice();
    this.refreshData();
    this.props.session.dispatcher.addListener(
      WEBSOCKET_MESSAGE_TYPES.DEVICE.NEW_STATE_STRING,
      this.updateDeviceTextWebsocket
    );
  };

  componentDidUpdate(previousProps) {
    const vacbotFeaturesChanged = get(previousProps, 'box.vacbot') !== get(this.props, 'box.vacbot');
    const nameChanged = get(previousProps, 'box.name') !== get(this.props, 'box.name');
    if (vacbotFeaturesChanged || nameChanged) {
      this.refreshData();
    }
  };
  
  componentWillUnmount() {
    this.props.session.dispatcher.removeListener(
      WEBSOCKET_MESSAGE_TYPES.DEVICE.NEW_STATE_STRING,
      this.updateDeviceTextWebsocket
    );
  };

  displayMap = async () => {
    console.log('displayMap');
    
    try {
      await this.setState({ loading: true });
      const imageMap = await this.props.httpClient.get(
        `/api/v1/service/ecovacs/${this.props.box.device_feature}/map`
      );
      // await this.updateValueWithDebounce(this.state.mapFeature, imageMap);
      const mapFeature = this.state.mapFeature;
      updateDeviceFeaturesString(mapFeature, mapFeature.selector, mapFeature.last_value_string, mapFeature.last_value_changed);
      const backgroundImage = imageMap;
      this.setState({
        imageMap,
        backgroundImage
      });
    } catch (e) {
      console.error(e);
      this.setState({ loading: false });
    }
  };

  render(props, { device, mapFeature, status }) {
    const loading = status === RequestStatus.Getting && !status;
    const boxTitle = get(this.props.box, 'title');
    const error = status === RequestStatus.Error;
    const backgroundImage = this.state.backgroundImage;
    return (
      <VacbotBox
        {...props}
        loading={loading}
        boxTitle={boxTitle}
        device={device}
        mapFeature={mapFeature}
        backgroundImage={backgroundImage}
        updateValue={this.updateValue}
        updateValueWithDebounce={this.updateValueWithDebounce}
        displayMap={this.displayMap}
        error={error}
      />
    );
  }
}

export default connect(
  'session,httpClient,DashboardBoxDataVacbot,DashboardBoxStatusVacbot',
  actions
)(VacbotBoxComponent);
