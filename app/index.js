'use strict';

var Promise = require('bluebird'),
  child_process = require('child_process'),
  fs = require('fs'),
  rimraf = require('rimraf'),
  path = require('path'),
  s = require('underscore.string'),
  generators = require('yeoman-generator'),
  log = require('./log');

var exec = function (cmd) {
  return new Promise(function (resolve, reject) {
    child_process.exec(cmd, function (err, res) {
      if(err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

// Global Variables
var folder, folderPath, version;

var versions = {
  'master': 'master',
  '0.4.0': 'v0.4.0',
  '0.4.1': 'v0.4.1',
  '0.4.2': 'v0.4.2'
};

module.exports = generators.Base.extend({
  
  init: function () {
    this.pkg = this.fs.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function () {
      if (!this.options['skip-install']) {
        log.green('Running npm install for you....');
        log.green('This may take a couple minutes.');
        exec('cd ' + folder + ' && npm install')
          .then(function () {
            log('');
            log.green('------------------------------------------');
            log.green('Your MEAN.js application is ready!');
            log('');
            log.green('To Get Started, run the following command:');
            log('');
            log.yellow('cd ' + folder + ' && grunt');
            log('');
            log.green('Happy Hacking!');
            log.green('------------------------------------------');
          });
      }
    });
  },

  checkForGit: function () {
    var done = this.async();

    exec('git --version')
      .then(function () {
        done();
      })
      .catch(function (err) {
        log.red(new Error(err));
        return;
      });
  },

  welcomeMessage: function () {
    log.green('You\'re using the official MEAN.JS generator.');
  },

  promptForVersion: function () {
    var done = this.async();

    var choices = [];
    for(var v in versions) {
      choices.push(v);
    }

    var prompt = {
      type: 'list',
      name: 'version',
      message: 'What mean.js version would you like to generate?',
      choices: choices,
      default: 1
    };

    this.prompt(prompt, function (props) {
      version = props.version;
      done();
    }.bind(this));

  },

  promptForFolder: function () {
    var done = this.async();

    log.red(version);

    var prompt = {
      name: 'folder',
      message: 'In which folder would you like the project to be generated? This can be changed later.',
      default: 'mean'
    };

    this.prompt(prompt, function (props) {
      folder = props.folder;
      folderPath = './' + folder + '/';
      done();
    }.bind(this));
  },

  cloneRepo: function () {
    var done = this.async();

    log.green('Cloning the MEAN repo.......');

    exec('git clone --branch ' + versions[version] + ' https://github.com/meanjs/mean.git ' + folder)
      .then(function () {
        done();
      })
      .catch(function (err) {
        log.red(err);
        return;
      });
  },

  getPrompts: function () {
    var done = this.async();

    var prompts = [{
      name: 'appName',
      message: 'What would you like to call your application?',
      default: 'MEAN'
    }, {
      name: 'appDescription',
      message: 'How would you describe your application?',
      default: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js'
    }, {
      name: 'appKeywords',
      message: 'How would you describe your application in comma seperated key words?',
      default: 'MongoDB, Express, AngularJS, Node.js'
    }, {
      name: 'appAuthor',
      message: 'What is your company/author name?'
    }, {
      type: 'confirm',
      name: 'addArticleExample',
      message: 'Would you like to generate the article example CRUD module?',
      default: true
    }, {
      type: 'confirm',
      name: 'addChatExample',
      message: 'Would you like to generate the chat example module?',
      default: true
    }];

    this.prompt(prompts, function(props) {
      this.appName = props.appName;
      this.appDescription = props.appDescription;
      this.appKeywords = props.appKeywords;
      this.appAuthor = props.appAuthor;
      this.addArticleExample = props.addArticleExample;
      this.addChatExample = props.addChatExample;

      this.slugifiedAppName = s(this.appName).slugify().value();
      this.humanizedAppName = s(this.appName).humanize().value();
      this.capitalizedAppAuthor = s(this.appAuthor).capitalize().value();

      done();
    }.bind(this));
  },

  replacePackageConfigs: function () {
    var done = this.async();

    var packageJson = JSON.parse(fs.readFileSync(folderPath + 'package.json'));
    packageJson.name = this.slugifiedAppName;
    packageJson.description = this.appDescription;
    packageJson.author = this.appAuthor;

    fs.writeFile(folderPath + 'package.json', JSON.stringify(packageJson, null, 2), function (err) {
      if(err) {
        return log.red(err);
      }
      done();
    });
  },

  replaceBowerConfigs: function () {
    var done = this.async();

    var bowerJson = JSON.parse(fs.readFileSync(folderPath + 'bower.json'));
    bowerJson.name = this.slugifiedAppName;
    bowerJson.description = this.appDescription;

    fs.writeFile(folderPath + 'bower.json', JSON.stringify(bowerJson, null, 2), function (err) {
      if (err) {
        return log.red(err);
      }
      done();
    });
  },

  replaceConfigConfigs: function () {
    var done = this.async();

    var titleRegex = /title: 'MEAN.JS'/g;
    var descriptionRegex = /description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js'/g;
    var keywordsRegex = /keywords: 'mongodb, express, angularjs, node.js, mongoose, passport'/g;

    var configFile = (fs.readFileSync(folderPath + 'config/env/default.js')).toString();

    configFile.replace(titleRegex, 'title: \'' + this.slugifiedAppName + '\'');
    configFile.replace(descriptionRegex, 'description: \'' + this.appDescription + '\'');
    configFile.replace(keywordsRegex, 'keywords: \'' + this.appKeywords + '\'');

    fs.writeFile(folderPath + 'config/env/default.js', configFile, function (err) {
      if(err) {
        return log.red(err);
      }
      done();
    });
  },

  removeExampleModules: function () {
    var promises = [];
    
    var done = this.async();

    if(!this.addChatExample) {
      var p1 = Promise.defer();
      promises.push(p1);
      
      rimraf(folderPath + 'modules/chat', function(err) {
        if (err) {
          log.red(err);
          p1.reject(err);
        } else {
          p1.resolve();
        }
      });
    }
    
    if(!this.addArticleExample) {
      var p2 = Promise.defer();
      promises.push(p2);
      
      rimraf(folderPath + 'modules/articles', function(err) {
        if (err) {
          log.red(err);
          p2.reject(err);
        } else {
          p2.resolve();
        }
      });
    }
    
    Promise
      .all(promises)
      .then(function() {
        done();
      })
      .catch(function() {
        log.red('Something failed.');
        done();
      });
  }

});
