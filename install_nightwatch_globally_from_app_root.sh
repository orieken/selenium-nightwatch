#!/bin//bash
echo "running global nightwatch from app root"
  sudo .meteor/local/build/node_modules/nightwatch/bin/nightwatch -c packages/selenium-nightwatch/nightwatch_from_app_root.json $1 $2
