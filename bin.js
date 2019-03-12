#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const version = require('./package.json').version;
let cmdValue;

program.version(version);

program.command('new').action(function(cmd) {
  cmdValue = cmd;

  require('@babel/polyfill');
  const run = require('auto-changelog/lib/run').default;
  const argv = [
    'node',
    'auto-changelog',
    '--template',
    path.join(__dirname, './templates/custom-keepachangelog.hbs'),
    '-l',
    '20',
    '-b',
    '20',
  ];

  run(argv).catch(function(error) {
    console.error(error);
    process.exit(1);
  });
});

program.parse(process.argv);

if (!cmdValue) {
  console.log('Generating record');
  require('.');
}
