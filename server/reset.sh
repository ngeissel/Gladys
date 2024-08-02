#!/bin/bash
# reset reset
module=rflink;

git status
git checkout services/index.js
git checkout ../front/src/components/app.jsx
git checkout ../front/src/config/i18n/fr.json
git checkout ../front/src/config/i18n/en.json
git checkout ../front/src/config/integrations/devices.json
git checkout utils/constants.js
git checkout ../front/src/config/demo.js
git checkout ../front/src/routes/dashboard/Box.jsx
git checkout ../front/src/routes/dashboard/edit-dashboard/EditBox.jsx

rm -rf ../front/src/assets/integrations/cover/$module.png
rm -rf services/$module/
rm -rf test/services/$module/
rm -rf ../front/src/routes/integration/all/$module/
rm -rf ../front/src/components/boxs/$module/
git status
