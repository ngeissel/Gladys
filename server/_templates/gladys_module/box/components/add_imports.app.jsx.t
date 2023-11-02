---
inject: true
to: ../front/src/components/app.jsx
before: "// OpenAI integration"
skip_if: "routes/integration/all/<%= module %>/setup-page"
---
// <%= className %>
import <%= className %>Page from '../routes/integration/all/<%= module %>';
import <%= className %>SetupPage from '../routes/integration/all/<%= module %>/setup-page';