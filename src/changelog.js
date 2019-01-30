const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const { parser, Release } = require('keep-a-changelog');
const _ = require('lodash');

const rootPath = path.resolve(__dirname, '../../..');

const { version, repository } = require(rootPath, 'package.json');

const changelogPath = path.resolve(rootPath, 'CHANGELOG.md');

const changelog = parser(fs.readFileSync(changelogPath, 'UTF-8'));
const today = new Date();
const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

const lastReleaseVersion = changelog.releases[0].version.raw;
const nextRelease = new Release(version, date);

let commits = '';

if (repository) {
  changelog.url = repository.url;
}

try {
  commits = childProcess.execSync(`git log ${lastReleaseVersion}..HEAD --pretty=format:%s`);
} catch (e) {
  console.warn('Error when getting commits since last release');
}

const typeRegexps = {
  added: /^Add(ed)?\s/,
  fixed: /^Fix(ed)?\s/,
  removed: /^Remove(d)?\s/,
  changed: /^(Change|Update)(d)?\s/,
};

commits
  .toString()
  .split('\n')
  .filter(Boolean)
  .forEach(message => {
    for (const type in typeRegexps) {
      const regexp = typeRegexps[type];

      const typeMatch = message.match(regexp);
      if (typeMatch) {
        return nextRelease[type](_.upperFirst(message.replace(typeMatch[0], '')));
      }
    }
    // type not matched, add to added in default
    nextRelease.added(message);
  });

changelog.addRelease(nextRelease);

fs.writeFileSync(changelogPath, changelog.toString());
