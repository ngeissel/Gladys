
#!/bin/bash
export HYGEN_OVERWRITE=1;
module=${1:-rflink};
className=${2:-Rflink};
attributeName=${3:-rflink};
constName=${4:-rflink};

npx hygen gladys_module service  --module=$module --className=$className --attributeName=$attributeName --constName=$constName;
npm run test-service --service=$module;
npx hygen gladys_module box  --module=$module --className=$className --attributeName=$attributeName --constName=$constName;
npx hygen gladys_module dashboard_box  --module=$module --className=$className --constName=$constName;
npx hygen gladys_module service_with_devices  --module=$module --className=$className --attributeName=$attributeName --constName=$constName;
npx hygen gladys_module devices_box  --module=$module --className=$className --attributeName=$attributeName --constName=$constName;
npx hygen gladys_module discover_box  --module=$module --className=$className --attributeName=$attributeName --constName=$constName;
npm run test-service --service=$module;
