'use strict';

var chalk = require('chalk');

var log = function log(value) {
  console.log(value);
};

log.green = function(value) {
  console.log(chalk.green(value));
};

log.blue = function(value) {
  console.log(chalk.blue(value));
};

log.red = function(value) {
  console.log(chalk.red(value));
};

log.yellow = function(value) {
  console.log(chalk.yellow(value));
};

log.magenta = function(value) {
  console.log(chalk.magenta(value));
};

log.cyan = function(value) {
  console.log(chalk.cyan(value));
};

log.white = function(value) {
  console.log(chalk.white(value));
};

log.gray = function(value) {
  console.log(chalk.gray(value));
};

module.exports = log;
