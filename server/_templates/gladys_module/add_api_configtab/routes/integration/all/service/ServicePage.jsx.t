---
inject: true
to: ../front/src/routes/integration/all/<%= module %>/<%= className %>Page.js
before: "<DeviceConfigurationLink"
skip_if: "integration.<%= module %>.setupTab"
---
                  
                  <Link
                    href="/dashboard/integration/device/<%= module %>/setup"
                    activeClassName="active"
                    class="list-group-item list-group-item-action d-flex align-items-center"
                  >
                    <span class="icon mr-3">
                      <i class="fe fe-radio" />
                    </span>
                    <Text id="integration.<%= module %>.setupTab" />
                  </Link>
