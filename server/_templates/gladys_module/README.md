How TO
------

{gladys}/server/npm run hygen:create-service

Create a service (backend) :
hygen gladys_module service new --module ecovacs --className Ecovacs --attributeName ecovacs --constName ECOVACS

After that :
run npm run test-service --service=module

Create a configuration box for an existing service (frontend) :
hygen gladys_module box new --module ecovacs --className Ecovacs --attributeName ecovacs --constName ECOVACS


Tutorial
--------
Create a service handling devices (discorvering included), able to handle an api key to access service.

npx hygen gladys_module service  --module=myawesomeservice --className=MyAwesomeService --attributeName=myAwesomeService --constName=MYAWESOMESERVICE;
npx hygen gladys_module service_with_devices  --module=myawesomeservice --className=MyAwesomeService --attributeName=myAwesomeService --constName=MYAWESOMESERVICE;
npx hygen gladys_module init_integration_front  --module=myawesomeservice --className=MyAwesomeService --attributeName=myAwesomeService --constName=MYAWESOMESERVICE;
npx hygen gladys_module devices_box  --module=myawesomeservice --className=MyAwesomeService --attributeName=myAwesomeService --constName=MYAWESOMESERVICE;
npx hygen gladys_module discover_box  --module=myawesomeservice --className=MyAwesomeService --attributeName=myAwesomeService --constName=MYAWESOMESERVICE;
npx hygen gladys_module add_api_configtab  --module=myawesomeservice --className=MyAwesomeService --attributeName=myAwesomeService --constName=MYAWESOMESERVICE;

After generation :
1. Replace logo
2. Change myawesomeservice.getStatus.js (what are the criteria ensuring the service is up : api key ok, reaching an url ....)
3. Adapt scan (discover and convert part)

