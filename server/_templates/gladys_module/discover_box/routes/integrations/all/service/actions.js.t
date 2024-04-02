---
inject: true
to: ../front/src/routes/integration/all/<%= module %>/actions.js
before: "displayConnectedMessage"
skip_if: "async getDiscovered<%= className %>Devices"
---
    async getDiscovered<%= className %>Devices(state) {
      store.setState({
        loading: true
      });
      try {
        const discoveredDevices = await state.httpClient.get('/api/v1/service/<%= module %>/discover');
        store.setState({
          discoveredDevices,
          loading: false,
          errorLoading: false
        });
      } catch (e) {
        store.setState({
          loading: false,
          errorLoading: true
        });
      }
    },