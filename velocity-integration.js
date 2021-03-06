;(function () {

  "use strict";
  console.log('welcome to Nighwatch-Selenium...')

  if ('undefined' !== typeof Mirror && Mirror.isMirror) {
    // only run jasmine unit tests once, not for each mirror
    return;
  }

  var ANNOUNCE_STRING = 'Velocity Nightwatch-Selenium is loaded',
      pwd = process.env.PWD,
      DEBUG = process.env.NIGHTWATCH_DEBUG,
      spawn = Npm.require('child_process').spawn,
      parseString = Npm.require('xml2js').parseString,
      glob = Npm.require('glob'),
      fs = Npm.require('fs'),
      path = Npm.require('path'),
      _ = Npm.require('lodash'),
      rimraf = Npm.require('rimraf'),
      //testReportsPath = path.join(pwd, 'tests', '.reports', 'jasmine-unit'),
      testReportsPath = path.join(pwd, 'tests', '.reports', 'nightwatch-acceptance'),
      args = [],
      consoleData = '',
      jasmineCli,
      closeFunc;


// build OS-independent path to jasmine cli
  //jasmineCli = pwd + ',packages,jasmine-unit,.npm,package,node_modules,jasmine-node,lib,jasmine-node,cli.js'.split(',').join(path.sep);
  var nightwatchCli = pwd + '/run_nightwatch.sh';

  args.push(nightwatchCli);

  //args.push(jasmineCli);
  // args.push('--coffee');
  // args.push('--color');
  // args.push('--verbose');
  // args.push('--match');
  // args.push('.*-jasmine-unit\.');
  // args.push('--matchall');
  // args.push('--junitreport');
  // args.push('--output');
  // args.push(testReportsPath);
  // args.push(path.join(pwd, 'packages', 'jasmine-unit', 'lib'));
  // args.push(path.join(pwd, 'tests'));

  // How can we abstract this server-side so the test frameworks don't need to know about velocity collections
  // VelocityTestFiles.find({targetFramework: 'nightwatch'}).observe({
  //   added: rerunTests,
  //   changed: rerunTests,
  //   removed: rerunTests
  // });

  //rerunTests();
  parseOutputFiles();
  console.log(ANNOUNCE_STRING);



//////////////////////////////////////////////////////////////////////
// private functions
//

  function hashCode (s) {
    return s.split("").reduce(function (a, b) {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
  }

  // possible memory leak
  var regurgitate = Meteor.bindEnvironment(function (data) {
    consoleData += data;
    if (consoleData.indexOf('\n') !== -1 && consoleData.trim()) {
      console.log(consoleData.trim());
      Meteor.call('postLog', {
        type: 'out',
        framework: 'nightwatch',
        message: consoleData.trim()
      });
      consoleData = '';
    }
  });

  // closeFunc = Meteor.bindEnvironment(function () {
  //   var newResults = [],
  //       globSearchString = path.join('**', 'FIREFOX-*.xml'),
  //       xmlFiles = glob.sync(globSearchString, { cwd: testReportsPath });
  //
  //   _.each(xmlFiles, function (xmlFile, index) {
  //     parseString(fs.readFileSync(testReportsPath + path.sep + xmlFile), function (err, result) {
  //       _.each(result.testsuites.testsuite, function (testsuite) {
  //         _.each(testsuite.testcase, function (testcase) {
  //           var result = ({
  //             name: testcase.$.name,
  //             framework: 'nightwatch',
  //             result: testcase.failure ? 'failed' : 'passed',
  //             timestamp: testsuite.$.timestamp,
  //             time: testcase.$.time,
  //             ancestors: [testcase.$.classname]
  //           });
  //
  //           if (testcase.failure) {
  //             _.each(testcase.failure, function (failure) {
  //               result.failureType = failure.$.type;
  //               result.failureMessage = failure.$.message;
  //               result.failureStackTrace = failure._;
  //             });
  //           }
  //           result.id = 'nightwatch:' + hashCode(xmlFile + testcase.$.classname + testcase.$.name);
  //           newResults.push(result.id);
  //           Meteor.call('postResult', result);
  //         });
  //       });
  //     });
  //
  //     if (index === xmlFiles.length - 1) {
  //       Meteor.call('resetReports', {framework: 'nightwatch', notIn: newResults});
  //       Meteor.call('completed', {framework: 'nightwatch'});
  //     }
  //   });
  // });  // end closeFunc

  function parseOutputFiles(){
    console.log('parsing Nightwatch output files...');
    //Meteor.bindEnvironment(function (data) {
    //console.log('bound environment...');
      var newResults = [],
          globSearchString = path.join('**', 'FIREFOX_*.xml'),
          xmlFiles = glob.sync(globSearchString, { cwd: testReportsPath });

    console.log('globSearchString: ' + globSearchString);
      console.log('testReportsPath: ' + testReportsPath);

      console.log('iterating through files...');
      _.each(xmlFiles, function (xmlFile, index) {
        console.log('xmlfile ' + index + ": " + xmlFile);

        parseString(fs.readFileSync(testReportsPath + path.sep + xmlFile), function (err, result) {
          _.each(result.testsuites.testsuite, function (testsuite) {
            _.each(testsuite.testcase, function (testcase) {
              var result = ({
                name: testcase.$.name,
                framework: 'nightwatch',
                result: testcase.failure ? 'failed' : 'passed',
                timestamp: testsuite.$.timestamp,
                time: testcase.$.time,
                ancestors: [testcase.$.classname]
              });

              if (testcase.failure) {
                _.each(testcase.failure, function (failure) {
                  result.failureType = failure.$.type;
                  result.failureMessage = failure.$.message;
                  result.failureStackTrace = failure._;
                });
              }
              result.id = 'nightwatch:' + hashCode(xmlFile + testcase.$.classname + testcase.$.name);
              newResults.push(result.id);
              Meteor.call('postResult', result);
            });
          });
        });

        if (index === xmlFiles.length - 1) {
          Meteor.call('resetReports', {framework: 'nightwatch', notIn: newResults});
          Meteor.call('completed', {framework: 'nightwatch'});
        }
      });
    //});
  }


  // function rerunTests () {
  //   Meteor.call('resetLogs', {framework: 'nightwatch'});
  //   rimraf.sync(testReportsPath);
  //
  //   // PackageStubber.stubPackages({
  //   //   outfile: path.join('tests', 'a1-package-stub.js')
  //   // })
  //
  //   var nightwatchNode = spawn(process.execPath, args);
  //   nightwatchNode.stdout.on('data', regurgitate);
  //   nightwatchNode.stderr.on('data', regurgitate);
  //   nightwatchNode.on('close', closeFunc);
  // }


})();
