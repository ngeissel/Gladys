import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { Text } from 'preact-i18n';
import actions from '../../../actions/dashboard/boxes/vacbot';
import { RequestStatus } from '../../../utils/consts';
import get from 'get-value';
import { WEBSOCKET_MESSAGE_TYPES, DEVICE_FEATURE_TYPES, VACBOT_MODE } from '../../../../../server/utils/constants';
import debounce from 'debounce';
import VacbotModeControls from './VacbotModeControls';
import VacbotBatteryBox from './VacbotBatteryBox';
import VacbotCleanReportBox from './VacbotCleanReportBox';
import VacbotDebugBox from './VacbotDebugBox';

const updateDeviceFeatures = (deviceFeatures, deviceFeatureSelector, lastValue, lastValueChange) => {
  return deviceFeatures.map(feature => {
    if (feature.selector === deviceFeatureSelector) {
      return {
        ...feature,
        last_value: lastValue,
        last_value_changed: lastValueChange
      };
    }
    return feature;
  });
};


const VacbotBox = ({ children, ...props }) => {
  const { boxTitle, deviceFeatures = [] } = props;
  
  return (
    <div class="card">
      {props.error && (
        <div>
          <p class="alert alert-danger">
            <i class="fe fe-bell" />
            <span class="pl-2">
              <Text id="dashboard.boxes.vacbot.noVacbotInfo" />
            </span>
          </p>
        </div>
      )}
      {!props.error && (
        <div class="card-body">
          <div class="d-flex bd-highlight">
            <h2 class="card-title bd-highlight mr-auto ">{boxTitle}</h2>

            <div class="p-2 bd-highlight">
              <VacbotCleanReportBox {...props} />
            </div>

            <div class="p-2 bd-highlight">
              <VacbotBatteryBox {...props} />
            </div>
          </div>

          <div
            title={`${props.vacbotStatus.name}`}
            class="bg-image"
            style={{
              backgroundImage: `url(${props.vacbotStatus.imageUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              width: '100%',
              height: '250px',
              position: 'relative'
            }}
          >
             <div class="p-2">
              {props.vacbotStatus.hasMappingCapabilities && <button class={`btn btn-sm fe fe-map`} title="Display map" onClick={props.displayMap} />}
              {props.vacbotStatus.hasCustomAreaCleaningMode && <button class={`btn btn-sm fe fe-codepen`} title="Select area to clean"  />}
            </div>
            <div class="d-flex align-items-center justify-content-center">
              <div>
                {deviceFeatures.map((deviceFeature, deviceFeatureIndex) => (
                  <div class="card-body ">
                    {!props.vacbotStatus.isOnline && <div> OFFLINE </div>}
                    {props.vacbotStatus.isOnline && (
                      <div class="d-flex bd-highlight mt-9">
                        {deviceFeature.type === DEVICE_FEATURE_TYPES.VACBOT.STATE && (
                          <VacbotModeControls
                            deviceFeature={deviceFeature}
                            deviceFeatureIndex={deviceFeatureIndex}
                            updateValue={props.updateValue}
                            updateValueWithDebounce={props.updateValueWithDebounce}
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
            </div>
          </div>
        </div>
      )}
      <VacbotDebugBox
        {...props}
        debug={true}
        deviceFeatures={deviceFeatures}
        
      />
    </div>
  );
};

class VacbotBoxComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      device: {},
      deviceFeatures: [],
      vacbotStatus: [],
      status: RequestStatus.Getting
    };
  }
  getDevice = async () => {
    try {
      this.setState({ status: RequestStatus.Getting });
      const vacbotDevice = await this.props.httpClient.get(`/api/v1/device/${this.props.box.device_feature}`);
      const deviceFeatures = vacbotDevice.features;
      const controlFeature = vacbotDevice.features.find(f => f.type === DEVICE_FEATURE_TYPES.VACBOT.STATE);
      const batteryFeature = vacbotDevice.features.find(f => f.type === DEVICE_FEATURE_TYPES.VACBOT.BATTERY);
      const cleanReportFeature = vacbotDevice.features.find(f => f.type === DEVICE_FEATURE_TYPES.VACBOT.CLEAN_REPORT);
      const mapFeature = vacbotDevice.features.find(f => f.type === DEVICE_FEATURE_TYPES.VACBOT.MAP);
      const isCleaning = controlFeature.last_value === VACBOT_MODE.CLEAN;
      
      this.setState({
        vacbotDevice,
        deviceFeatures,
        controlFeature,
        batteryFeature,
        cleanReportFeature,
        mapFeature,
        isCleaning,
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

      const vacbotStatus = await this.props.httpClient.get(
        `/api/v1/service/ecovacs/${this.props.box.device_feature}/status`
      );
      const imageMap = await this.props.httpClient.get(
        `/api/v1/service/ecovacs/${this.props.box.device_feature}/map`
      );
      // const imageMap = await this.updateValueWithDebounce(this.state.mapFeature, 1);
      this.setState({
        vacbotStatus,
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

  updateDeviceStateWebsocket = () => {
    this.refreshData();
  };

  componentDidMount() {
    this.getDevice();
    this.refreshData();
    this.props.session.dispatcher.addListener(
      WEBSOCKET_MESSAGE_TYPES.DEVICE.NEW_STATE,
      this.updateDeviceStateWebsocket
    );
  }

  componentDidUpdate(previousProps) {
    const vacbotDeviceChanged = get(previousProps, 'box.vacbot') !== get(this.props, 'box.vacbot');
    const nameChanged = get(previousProps, 'box.name') !== get(this.props, 'box.name');
    if (vacbotDeviceChanged || nameChanged) {
      this.refreshData();
    }
  }

  componentWillUnmount() {
    this.props.session.dispatcher.removeListener(
      WEBSOCKET_MESSAGE_TYPES.DEVICE.NEW_STATE,
      this.updateDeviceStateWebsocket
    );
  };

  setValueDevice = async (deviceFeature, value) => {
    try {
      await this.setState({ error: false });
      await this.props.httpClient.post(`/api/v1/device_feature/${deviceFeature.selector}/value`, {
        value
      });
    } catch (e) {
      console.error(e);
      this.setState({ error: true });
    }
  };

  updateValue = async (deviceFeature, value) => {
    const deviceFeatures = updateDeviceFeatures(this.state.deviceFeatures, deviceFeature.selector, value, new Date());
    await this.setState({
      deviceFeatures
    });
    try {
      await this.setValueDevice(deviceFeature, value);
    } catch (e) {
      console.error(e);
    }
  };

  setValueDeviceDebounce = debounce(this.updateValue.bind(this), 200);

  updateValueWithDebounce = async (deviceFeature, value) => {
    const deviceFeatures = updateDeviceFeatures(this.state.deviceFeatures, deviceFeature.selector, value, new Date());
    this.setState({
      deviceFeatures
    });
    await this.setValueDeviceDebounce(deviceFeature, value);
  };


  displayMap = async () => {
    console.log('displayMap');
    
    try {
      await this.setState({ loading: true });
      await this.updateValueWithDebounce(this.state.mapFeature, 1);
      const vacbotMap = await this.props.httpClient.get(
        `/api/v1/service/ecovacs/${this.props.box.device_feature}/map`
      );
    } catch (e) {
      console.error(e);
      this.setState({ loading: false });
    }
  };

  render(props, { device, deviceFeatures, vacbotStatus, imageMap, status }) {
    const loading = status === RequestStatus.Getting && !status;
    const boxTitle = get(this.props.box, 'title');
    const error = status === RequestStatus.Error;

    return (
      <VacbotBox
        {...props}
        loading={loading}
        boxTitle={boxTitle}
        device={device}
        deviceFeatures={deviceFeatures}
        vacbotStatus={vacbotStatus}
        imageMap={imageMap}
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
