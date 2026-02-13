
#!/bin/bash
export HYGEN_OVERWRITE=1;
module=${1:-mymodule};
className=${2:-MyModule};
attributeName=${3:-myModule};
constName=${4:-MYMODULE};

npx hygen gladys_module service  --module=$module --className=$className --attributeName=$attributeName --constName=$constName;
npx hygen gladys_module service_with_devices  --module=$module --className=$className --attributeName=$attributeName --constName=$constName;
npx hygen gladys_module init_integration_front  --module=$module --className=$className --attributeName=$attributeName --constName=$constName;
#npx hygen gladys_module box  --module=$module --className=$className --attributeName=$attributeName --constName=$constName;
npx hygen gladys_module devices_box  --module=$module --className=$className --attributeName=$attributeName --constName=$constName;
npx hygen gladys_module discover_box  --module=$module --className=$className --attributeName=$attributeName --constName=$constName;
npx hygen gladys_module add_api_configtab  --module=$module --className=$className --attributeName=$attributeName --constName=$constName;
#npx hygen gladys_module dashboard_box  --module=$module --className=$className --constName=$constName;
npm run test-service --service=$module;
