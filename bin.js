#!/usr/bin/env node

const program = require('commander');
let cmdValue;

program.version('0.2.1');

program.command('new').action(function(cmd) {
  cmdValue = cmd;

  require('@babel/polyfill');
  const run = require('auto-changelog/lib/run').default;
  const argv = ['node', 'auto-changelog', '--template', 'keepachangelog', '-l', '20', '-b', '20'];

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
