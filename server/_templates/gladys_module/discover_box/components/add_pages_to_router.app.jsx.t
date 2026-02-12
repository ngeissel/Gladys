---
inject: true
to: ../front/src/components/app.jsx
after: "<<%= className %>Page path=\"/dashboard/integration/device/<%= module %>\" />"
skip_if: "<<%= className %>DiscoverPage path=\"/dashboard/integration/device/<%= module %>/discover\" />"
---
        <<%= className %>DiscoverPage path="/dashboard/integration/device/<%= module %>/discover" />