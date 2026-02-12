---
inject: true
to: ../front/src/components/app.jsx
before: "<BluetoothDevicePage path=\"/dashboard/integration/device/bluetooth\" />"
skip_if: "<<%= className %>Page path=\"/dashboard/integration/device/<%= module %>\" />"

---
        <<%= className %>Page path="/dashboard/integration/device/<%= module %>" />
        