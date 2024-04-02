---
inject: true
to: ../front/src/components/app.jsx
after: "<<%= className %>Page path=\"/dashboard/integration/device/<%= module %>\" />"
skip_if: "<<%= className %>SetupPage path=\"/dashboard/integration/device/<%= module %>/setup\" />"
---
        <<%= className %>SetupPage path="/dashboard/integration/device/<%= module %>/setup" />