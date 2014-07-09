#!/bin//bash
echo "installing nightwatch in .meteor/local/build"
  cd .meteor/local/build
  sudo npm install nightwatch@0.5.3
  cd ../../../

echo "velocity is launching nightwatch"
   sudo .meteor/local/build/node_modules/nightwatch/bin/nightwatch -c packages/selenium-nightwatch/nightwatch_from_velocity.json $1 $2
