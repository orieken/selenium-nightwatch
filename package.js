
Package.describe({
  summary: "Dead-easy acceptance testing for your Meteor app with Selenium and Nightwatch.",
  internal: false
});


Npm.depends({
    'glob': '3.2.9',
    'lodash': '2.4.1',
    'rimraf': '2.2.8',
    'xml2js': '0.4.2',
    'meteor-stubs': '0.0.1'
});

Package.on_use(function (api) {
    //api.use(['velocity', 'mirror']);
    //api.use('package-stubber');
    api.add_files('velocity-integration.js', 'server');
});
