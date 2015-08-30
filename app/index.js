'use strict';

var Promise = require('bluebird');
var child_process = require('child_process');
var clog = require('c.log');
var path = require('path');
var yeoman = require('yeoman-generator');

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
  '0.4.1': 'v0.4.1'
};

var MeanGenerator = yeoman.generators.Base.extend({
  
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function () {
      if (!this.options['skip-install']) {
        clog.green('Running npm install for you....');
        clog.green('This may take a couple minutes.');
        exec('cd ' + folder + ' && npm install')
          .then(function () {
            clog('');
            clog.green('------------------------------------------');
            clog.green('Your MEAN.js application is ready!');
            clog('');
            clog.green('To Get Started, run the following command:');
            clog('');
            clog.yellow('cd ' + folder + ' && grunt');
            clog('');
            clog.green('Happy Hacking!');
            clog.green('------------------------------------------');
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
        clog.red(new Error(err));
        return;
      });
  },

  welcomeMessage: function () {
    clog(this.yeoman);

    clog.green('You\'re using the official MEAN.JS generator.');
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

    clog.red(version);

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

    clog.green('Cloning the MEAN repo.......');

    exec('git clone --branch ' + versions[version] + ' https://github.com/meanjs/mean.git ' + folder)
      .then(function () {
        done();
      })
      .catch(function (err) {
        clog.red(err);
        return;
      });
  },

  removeFiles: function () {
    var done = this.async();

    var files = [
      'package.json',
      'bower.json',
      'config/env/default.js'
    ];

    var remove = [];

    for(var i = 0; i < files.length; i++) {
      remove.push(exec('rm ./' + folder + '/' + files[i]));
    };

    Promise.all(remove)
      .then(function () {
        done();
      })
      .catch(function (err) {
        clog.red(err);
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

      this.slugifiedAppName = this._.slugify(this.appName);
      this.humanizedAppName = this._.humanize(this.appName);
      this.capitalizedAppAuthor = this._.capitalize(this.appAuthor);

      done();
    }.bind(this));
  },

  copyTemplates: function () {
    this.template(version + '/_package.json', folderPath + 'package.json');
    this.template(version + '/_bower.json', folderPath + 'bower.json');
    this.template(version + '/config/env/_default.js', folderPath + 'config/env/default.js');
  },

  removeChatExample: function () {
    var done = this.async();

    if(!this.addChatExample) {
      exec('rm -rf ' + folderPath + 'modules/chat')
        .then(function () {
          done();
        })
        .catch(function (err) {
          clog.red(err);
          return;
        });
    } else {
      done();
    }
  },

  removeArticlesExample: function () {
    var done = this.async();

    if(!this.addArticleExample) {
      exec('rm -rf ' + folderPath + 'modules/articles')
        .then(function () {
          done();
        })
        .catch(function (err) {
          clog.red(err);
          return;
        });
    } else {
      done();
    }
  }

});

module.exports = MeanGenerator;
