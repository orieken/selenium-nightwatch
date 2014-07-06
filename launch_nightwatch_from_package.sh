#!/bin//bash
echo "running nightwatch from package"
#  sudo .meteor/local/build/node_modules/nightwatch/bin/nightwatch -c private/nightwatch.json -t tests/leaderboardTest.js
   sudo ../../.meteor/local/build/node_modules/nightwatch/bin/nightwatch -c nightwatch_from_package.json $1 $2
