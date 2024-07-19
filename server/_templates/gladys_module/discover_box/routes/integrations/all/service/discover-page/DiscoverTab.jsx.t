---
to: ../front/src/routes/integration/all/<%= module %>/discover-page/DiscoverTab.jsx
---
import { Component } from 'preact';
import { Text } from 'preact-i18n';
import cx from 'classnames';

import EmptyState from './EmptyState';
import style from './style.css';
import <%= className %>DeviceBox from '../<%= className %>DeviceBox';


class DiscoverTab extends Component {
  render(props) {
    return (
      <div class="card">
        <div class="card-header">
          <h1 class="card-title">
            <Text id="integration.<%= module %>.discover.title" />
          </h1>
          <div class="page-options d-flex">
            <button onClick={props.search<% className %>Devices} class="btn btn-outline-primary ml-2" disabled={props.loading}>
              <Text id="integration.<%= module %>.discover.scan" /> <i class="fe fe-radio" />
            </button>
          </div>
        </div>
        <div class="card-body">
          

          <div class="alert alert-secondary">
            <Text id="integration.<%= module %>.discover.description" />
          </div>
          <div
            class={cx('dimmer', {
              active: props.loading
            })}
          >
            <div class="loader" />
            <div class={cx('dimmer-content', style.<%= attributeName %>ListBody)}>
              {props.errorLoading && (
                <p class="alert alert-danger">
                  <Text id="integration.<%= module %>.discover.error" />
                </p>
              )}
              <div class="row">
                {props.discoveredDevices &&
                  props.discoveredDevices.map((device, index) => (
                    <<%= className %>DeviceBox
                      {...props}
                      editable={!device.created_at || device.updatable}
                      alreadyCreatedButton={device.created_at && !device.updatable}
                      updateButton={device.updatable}
                      saveButton={!device.created_at}
                      device={device}
                      deviceIndex={index}
                      listName="discoveredDevices"
                    />
                  ))}
                {!props.discoveredDevices || (props.discoveredDevices.length === 0 && <EmptyState />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DiscoverTab;