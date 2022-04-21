> We're switched to usage of gitmoji-changelog and this tool isn't used or maintained anymore.

![](https://camo.githubusercontent.com/30a50b0142b709751620b6a52935bb8b31b8119830301b330f873b988945cc86/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f6d61782f313030302f312a70676b7a6e72752d3833396c3654746d397a617671512e706e67)

# Changelog-it

> Easy to use tool for maintaing your Changelog that keeps [keepachangelog](https://keepachangelog.com) format.

## Table of contents

- [Installation](#init)
- [New changelog](#new-changelog)
- [Usage](#usage)

## Installation

Using npm:

```bash
npm i -s AckeeCZ/changelog-it
```

Add `.npmrc` into root of your repository with following content:

```bash
tag-version-prefix=""
```

## New changelog

To generate new changelog file, run:

```bash
changelog-it new
```

## Usage

Using the package now is very simply, just call it's binary:

```bash
changelog-it
```

which cause few things to happen:

- Existing CHANGELOG.md is parsed
- Last version in changelog means name of tag which is used to get all commits since last release
- Current version is determined from package.json
- New record with received version and today date is created in changelog
- Messages of all commits since last release are added to the new record
- Every commit message is tested and if it starts with key word, it's added to the corresponding section
  - `Add` or `Added` are key words for **Added** section
  - `Fix` or `Fixed` are key words for **Fixed** section
  - `Remove` or `Removed` are key words for **Removed** section
  - `Change`, `Changeed`, `Update` or `Updated` are key words for **Changed** section

### Best way to use

All mentioned above means the best way to use this tool is together with `npm version` and add to your `package.json` new script:

```js
{
  "scripts": {
    "version": "changelog-it && vim CHANGELOG.md && git add CHANGELOG.md"
  }
}
```

then when you execute

```bash
npm version minor
```

new record is added to changelog and after that vim editor is opened so you can modify the record before commit of new release.
