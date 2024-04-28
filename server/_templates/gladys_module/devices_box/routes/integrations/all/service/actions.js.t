---
inject: true
to: ../front/src/routes/integration/all/<%= module %>/actions.js
before: "return Object.assign"
skip_if: "async get<%= className %>Devices"
---
  async search(state, e) {
    store.setState({
      <%= attributeName %>Search: e.target.value
    });
    await actions.get<%= className %>Devices(store.getState());
  },
  async changeOrderDir(state, e) {
    store.setState({
      get<%= className %>OrderDir: e.target.value
    });
    await actions.get<%= className %>Devices(store.getState());
  },
  async get<%= className %>Devices(state) {
    store.setState({
      get<%= className %>DevicesStatus: RequestStatus.Getting
    });
    try {
      const options = {
        order_dir: 'asc'
      };
      if (state.<%= attributeName %>Search && state.<%= attributeName %>Search.length) {
        options.search = state.<%= attributeName %>Search;
      }
      const <%= attributeName %>Devices = await state.httpClient.get('/api/v1/service/<%= module %>/device', options);
      store.setState({
        <%= attributeName %>Devices,
        get<%= className %>DevicesStatus: RequestStatus.Success
      });
    } catch (e) {
      store.setState({
        get<%= className %>DevicesStatus: RequestStatus.Error
      });
    }
  },
  updateDeviceField(state, listName, index, field, value) {
      const devices = update(state[listName], {
        [index]: {
          [field]: {
            $set: value
          }
        }
      });
      store.setState({
        [listName]: devices
      });
    },
    updateFeatureProperty(state, listName, deviceIndex, featureIndex, property, value) {
      const devices = update(state[listName], {
        [deviceIndex]: {
          features: {
            [featureIndex]: {
              [property]: {
                $set: value
              }
            }
          }
        }
      });

      store.setState({
        [listName]: devices
      });
    },
    async saveDevice(state, listName, index) {
      const device = state[listName][index];
      const savedDevice = await state.httpClient.post(`/api/v1/device`, device);
      const devices = update(state[listName], {
        $splice: [[index, 1, savedDevice]]
      });
      store.setState({
        [listName]: devices
      });
    },
    async deleteDevice(state, index) {
      const device = state.<%= attributeName %>Devices[index];
      if (device.created_at) {
        await state.httpClient.delete(`/api/v1/device/${device.selector}`);
      }
      const <%= attributeName %>Devices = update(state.<%= attributeName %>Devices, {
        $splice: [[index, 1]]
      });
      store.setState({
        <%= attributeName %>Devices
      });
    }
  };
