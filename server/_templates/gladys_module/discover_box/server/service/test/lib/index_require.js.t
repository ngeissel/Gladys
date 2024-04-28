---
inject: true
to: ./services/<%= module %>/lib/index.js
after: "const { saveConfiguration }"
skip_if: "'./device/<%= module %>.scan'"
---

const { scan } = require('./device/<%= module %>.scan');
