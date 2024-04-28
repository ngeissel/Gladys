---
inject: true
to: ../front/src/config/demo.js
before: "get /api/v1/service/zwave/status"
skip_if: "get /api/v1/service/<%= module %>/config"
---
  'get /api/v1/service/<%= module %>/config': {login: 'login', password: 'secret'},
  'get /api/v1/service/<%= module %>': {},
  'get /api/v1/service/<%= module %>/device': [
    {
      id: 'fbedb47f-4d25-4381-8923-2633b23192a0',
      service_id: 'a810b8db-6d04-4697-bed3-c4b72c996279',
      room_id: 'cecc52c7-3e67-4b75-9b13-9a8867b0443d',
      name: 'Demo <%= module %> device',
      selector: 'XXX:1234',
      external_id: 'test-sensor-external',
      should_poll: false,
      poll_frequency: null,
      created_at: '2019-02-12T07:49:07.556Z',
      updated_at: '2019-02-12T07:49:07.556Z',
      features: [
        {
          name: 'Temperature',
          selector: 'test-temperature',
          category: 'temperature-sensor',
          type: 'decimal'
        },
        {
          name: 'Motion',
          selector: 'test-motion',
          category: 'motion-sensor',
          type: 'binary'
        },
        {
          name: 'Battery',
          selector: 'test-battery',
          category: 'battery',
          type: 'integer',
          last_value: '92'
        },
        {
          name: 'Lux',
          selector: 'test-light',
          category: 'light-sensor',
          type: 'integer'
        }
      ],
      room: {
        id: 'cecc52c7-3e67-4b75-9b13-9a8867b0443d',
        name: 'Living Room',
        selector: 'living-room'
      }
    }
  ],
  'get /api/v1/service/<%= module %>/discover': [
    {
      name: '<%= className %> Basic Kitchen',
      external_id: '<%= module %>:<%= module %>-basic',
      created_at: '2024-02-08T15:09:07.556Z',
      model: '<%= module %>-basic',
      features: [
        {
          category: 'switch',
          type: 'binary'
        }
      ]
    },
  ],