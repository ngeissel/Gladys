---
inject: true
to: ../front/src/components/app.jsx
after: "<<%= className %>Page path=\"/dashboard/integration/device/<%= module %>\" />"
skip_if: "<<%= className %>DevicePage path=\"/dashboard/integration/device/<%= module %>/device-page\" />"
---
        <<%= className %>DevicePage path="/dashboard/integration/device/<%= module %>/device-page" />