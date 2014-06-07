selenium-nightwatch
===================

Dead-easy acceptance testing for your Meteor app with Selenium and Nightwatch.


####  Requirements  

  - Meteor
  - Firefox

####  Size Warning!
This package is 11mb large, because of the Selenium browser automation server; and will increase the overall size of your application by 11mb!  The good news, however, is that this 11mb won't be shipped down to the client, and is simply bloats the bundle file and adds an unnecessary file to the server.  We're working on providing this in a way that reduces that overhead as well.


####  Installation  

````sh
# Go to the root of your application
terminal-a$  cd myappdir

# Option A:  Install via Atmosphere
terminal-a$  mrt add selenium-nightwatch

# Option B:  Install with Git Clone
terminal-a$  git clone https://github.com/awatson1978/leaderboard-nightwatch.git /private
````


####  Run Your App

````sh
# Go to the root of your application
terminal-a$ cd myappdir

# run the leaderboard application
terminal-a$ sudo mrt
````

####  Running the Tests  
````sh
# and then, in the same way that we run 'meteor mongo' in a separate terminal
# while our application is already running,
# we want to open up a new terminal, and run nightwatch
terminal-b$ cd packages/selenium-nightwatch
terminal-b$ sudo ./launch_nightwatch_from_package.sh
````

####  Running Tests from App Root
````sh
# and then, in the same way that we run 'meteor mongo' in a separate terminal
# while our application is already running,
# we want to open up a new terminal, and run nightwatch
terminal-b$ ln -s packages/selenium-nightwatch/launch_nightwatch_from_app_root.sh run_nightwatch.sh
terminal-b$ sudo ./run_nightwatch.sh
````

#### Resetting the Database For New Runs
````
# if you want to rerun the acceptance tests, go back to the first terminal
# and be sure to reset the database
terminal-a$ ctrl-a
terminal-a$ sudo mrt reset
terminal-a$ sudo mrt

# or write your tests so they don't destructively modify your database
# or write tearUp and tearDown methods for your tests to prep the database
# or set up a test database
# or whatever else you need to do to manage your database settings
````

####  Configuring a Shared Testing Database
````
# with bigger test suites, you'll maybe want to inject values into the database
# and launch your application against a test database
terminal-a$ MONGO_URL=mongodb://127.0.0.1:27017 PORT=3000 node .meteor/local/build/main.js
````


#### Write Your First Acceptance Tests
Check out this dead-simple syntax for writing acceptance tests, and testing your Meteor app's user interface.  All you need to do is add files to the ``/tests`` directory, and follow this syntax.  

````js
// tests/google.js

module.exports = {
  "Demo test Google" : function (client) {
    client
      .url("http://www.google.com")
      .waitForElementVisible("body", 1000)
      .assert.title("Google")
      .assert.visible("input[type=text]")
      .setValue("input[type=text]", "nightwatch")
      .waitForElementVisible("button[name=btnG]", 1000)
      .click("button[name=btnG]")
      .pause(1000)
      .assert.containsText("#main", "The Night Watch")
      .end();
  }
};
````



####  Writing More Complicated Acceptance Tests

Once you have your first test running green, check out the [Nightwatch API](http://nightwatchjs.org/api#assert-attributeEquals), and start creating more advanced tests, like this leaderboard test:
````js
// tests/leaderboard.js

  browser
    .url("http://localhost:3000")
    .waitForElementVisible('body', 1000)
    .waitForElementVisible('div#outer', 1000)
    .waitForElementVisible('div.leaderboard', 1000)
    .waitForElementVisible('.leaderboard .player', 1000)

    .verify.containsText('div.leaderboard div:nth-child(1) .name', 'Ada Lovelace')
    .verify.containsText('div.leaderboard div:nth-child(1) .score', '50')

    .verify.containsText('div.leaderboard div:nth-child(2) .name', 'Grace Hopper')
    .verify.containsText('div.leaderboard div:nth-child(2) .score', '40')

    .verify.containsText('div.leaderboard div:nth-child(3) .name', 'Claude Shannon')
    .verify.containsText('div.leaderboard div:nth-child(3) .score', '35')

    .verify.containsText('div.leaderboard div:nth-child(4) .name', 'Nikola Tesla')
    .verify.containsText('div.leaderboard div:nth-child(4) .score', '25')

    .verify.containsText('div.leaderboard div:nth-child(5) .name', 'Marie Curie')
    .verify.containsText('div.leaderboard div:nth-child(5) .score', '20')

    .verify.containsText('div.leaderboard div:nth-child(6) .name', 'Carl Friedrich Gauss')
    .verify.containsText('div.leaderboard div:nth-child(6) .score', '5')


    .verify.containsText('.none', 'Click a player to select')
    .click('div.leaderboard div:nth-child(2)')
    .pause(500)
    .waitForElementVisible('input.inc', 1000)
    .verify.attributeEquals('input.inc', 'value', 'Give 5 points')

    .click('input.inc')
    .verify.containsText('div.leaderboard div:nth-child(2) .name', 'Grace Hopper')
    .verify.containsText('div.leaderboard div:nth-child(2) .score', '45')

    .click('input.inc')
    .verify.containsText('div.leaderboard div:nth-child(2) .name', 'Grace Hopper')
    .verify.containsText('div.leaderboard div:nth-child(2) .score', '50')

    .click('input.inc')
    .verify.containsText('div.leaderboard div:nth-child(1) .name', 'Grace Hopper')
    .verify.containsText('div.leaderboard div:nth-child(1) .score', '55')

    .verify.containsText('div.leaderboard div:nth-child(2) .name', 'Ada Lovelace')
    .verify.containsText('div.leaderboard div:nth-child(2) .score', '50')

    //.setValue('input[type=text]', 'nightwatch')

    .end();
````


Licensing
------------------------

MIT License. Use as you wish, including for commercial purposes.
