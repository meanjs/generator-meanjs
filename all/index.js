'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var AllGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    this.config.set({'homeBoy': this.name});
    console.log('In all');
    console.log(this);
  },

  // this.hookFor('meanjs:nothing', {   });

  files: function () {
    this.copy('somefile.js', 'somefile.js');
  }
});

module.exports = AllGenerator;

/*
{ domain: null,
  _events: 
   { start: [ [Function], [Function] ],
     method: [Function],
     end: [ [Function], [Function] ] },
  _maxListeners: 10,
  arguments: [ 'fred' ],
  args: [ 'fred' ],
  options: 
   { nopassport: true,
     argv: { remain: [Object], cooked: [Object], original: [Object] },
     env: 
      { domain: null,
        _events: [Object],
        _maxListeners: 10,
        arguments: [],
        options: {},
        adapter: {},
        cwd: '/home/revdave/angular/dev/baseline-meanjs',
        store: [Object],
        lookups: [Object],
        aliases: [Object] },
     name: 'all',
     resolved: '/home/revdave/angular/dev/generator-meanjs/all/index.js',
     namespace: 'meanjs:all',
     engine: { [Function: underscore] detect: [Function: detect] },
     help: false },
  env: 
   { domain: null,
     _events: { end: [Function], error: [Function] },
     _maxListeners: 10,
     arguments: [],
     options: {},
     adapter: {},
     cwd: '/home/revdave/angular/dev/baseline-meanjs',
     store: { _generators: [Object], _meta: [Object] },
     lookups: [ '.', 'generators', 'lib/generators' ],
     aliases: [ [Object], [Object] ] },
  resolved: '/home/revdave/angular/dev/generator-meanjs/all/index.js',
  fallbacks: {},
  generatorName: 'all',
  description: '',
  async: [Function],
  _engine: { [Function: underscore] detect: [Function: detect] },
  conflicter: 
   { domain: null,
     _events: {},
     _maxListeners: 10,
     adapter: {},
     conflicts: [],
     force: undefined },
  log: 
   { [Function: log]
     setMaxListeners: [Function],
     emit: [Function],
     addListener: [Function],
     on: [Function],
     once: [Function],
     removeListener: [Function],
     removeAllListeners: [Function],
     listeners: [Function],
     write: [Function],
     writeln: [Function],
     ok: [Function],
     error: [Function],
     _events: { up: [Function], down: [Function] },
     skip: [Function],
     force: [Function],
     create: [Function],
     invoke: [Function],
     conflict: [Function],
     identical: [Function],
     info: [Function],
     table: [Function] },
  _arguments: [ { name: 'name', config: [Object] } ],
  _options: 
   [ { alias: 'h',
       desc: 'Print generator\'s options and usage',
       name: 'help',
       type: [Function: Boolean],
       defaults: false,
       hide: false } ],
  _hooks: [],
  _conflicts: [],
  appname: 'baseline meanjs',
  src: 
   { _options: 
      { write: true,
        encoding: 'utf8',
        logger: [Object],
        base: undefined,
        dest: '/home/revdave/angular/dev/baseline-meanjs' },
     _base: '/home/revdave/angular/dev/generator-meanjs/all/templates',
     _destBase: '/home/revdave/angular/dev/baseline-meanjs',
     _writeFilters: {},
     _validationFilters: { collision: [Function: checkForCollisionFilter] },
     mkdir: [Function],
     recurse: [Function],
     read: [Function],
     readJSON: [Function],
     write: [Function],
     delete: [Function],
     copy: [Function],
     _actualWrite: [Function] },
  dest: 
   { _options: 
      { write: true,
        encoding: 'utf8',
        logger: [Object],
        base: '/home/revdave/angular/dev/baseline-meanjs',
        dest: undefined },
     _base: '/home/revdave/angular/dev/baseline-meanjs',
     _destBase: '/home/revdave/angular/dev/generator-meanjs/all/templates',
     _writeFilters: {},
     _validationFilters: { collision: [Function: checkForCollisionFilter] },
     mkdir: [Function],
     recurse: [Function],
     read: [Function],
     readJSON: [Function],
     write: [Function],
     delete: [Function],
     copy: [Function],
     _actualWrite: [Function] },
  config: 
   { domain: null,
     _events: {},
     _maxListeners: 10,
     path: '/home/revdave/angular/dev/baseline-meanjs/.yo-rc.json',
     name: 'generator-meanjs',
     existed: true,
     save: [Function],
     _fullStore: { 'generator-meanjs': [Object] },
     _store: { homeBoy: 'fred' } },
  _sourceRoot: '/home/revdave/angular/dev/generator-meanjs/all/templates',
  name: 'fred',
  _running: true }
*/