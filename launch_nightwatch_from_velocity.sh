#!/bin//bash
echo "running nightwatchv from velocity"
#  sudo .meteor/local/build/node_modules/nightwatch/bin/nightwatch -c private/nightwatch.json -t tests/leaderboardTest.js
   sudo .meteor/local/build/node_modules/nightwatch/bin/nightwatch -c packages/selenium-nightwatch/nightwatch_from_velocity.json $1 $2
