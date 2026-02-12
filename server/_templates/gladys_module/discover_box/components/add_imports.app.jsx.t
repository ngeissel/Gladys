---
inject: true
to: ../front/src/components/app.jsx
after: "import <%= className %>Page from '../routes/integration/all/<%= module %>';"
skip_if: "routes/integration/all/<%= module %>/discover-page"
---
import <%= className %>DiscoverPage from '../routes/integration/all/<%= module %>/discover-page';