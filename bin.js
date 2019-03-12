#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const program = require('commander');
const prompt = require('prompt');
const version = require('./package.json').version;

const template = path.join(__dirname, './templates/custom-keepachangelog.hbs');
const changelogMd = path.join(process.cwd(), 'CHANGELOG.md');
const schema = {
  properties: {
    overwrite: {
      description: 'CHANGELOG.md already exists. Are you sure you want to overwrite it?',
      pattern: /y[es]*|n[o]?/,
      message: 'Must respond yes or no',
      default: 'yes',
    },
  },
};
let cmdValue;

function generateChangelog() {
  require('@babel/polyfill');
  const run = require('auto-changelog/lib/run').default;
  const argv = ['node', 'auto-changelog', '--template', template, '-l', '20', '-b', '20'];

  run(argv).catch(function(error) {
    console.error(error);
    process.exit(1);
  });
}

program.version(version);

program
  .command('new')
  .description('Generates new CHANGELOG.md')
  .action(function(cmd) {
    cmdValue = cmd;

    if (fs.existsSync(changelogMd)) {
      prompt.start();
      prompt.get(schema, function(err, result) {
        if (!err && (result.overwrite === 'yes' || result.overwrite === 'y')) {
          generateChangelog();
        }
      });
    } else {
      generateChangelog();
    }
  });

program.parse(process.argv);

if (!cmdValue) {
  console.log('Generating record');
  require('.');
}
