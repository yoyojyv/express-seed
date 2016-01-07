'use strict';

/**
 * External dependencies
 */
let path = require('path');
let chalk = require('chalk');
let argv = require('yargs').argv;

/**
 * Determine environment and paths
 */
const ENV = argv.env || process.env.NODE_ENV || 'dev';
const BASE_PATH = path.resolve(path.join(__dirname, '..'));
const CONFIG_PATH = path.join(BASE_PATH, 'config');

/**
 * Load and merge environment configuration files
 */
let envCfg = loadConfig(ENV);
let localCfg = loadConfig('local');
let mergedCfg = Object.assign(envCfg, localCfg, {ENV: ENV});

/**
 * Export merged config
 */
module.exports = mergedCfg;

/**
 * Helper to load a config file
 */
function loadConfig(env) {
  let configPath = path.join(CONFIG_PATH, env + '.js');
  try {
    return require(configPath);
  }
  catch (e) {
    console.error(
      chalk.red('Could not load environment file'),
      chalk.magenta(env + '.js')
    );
    return {};
  }
}