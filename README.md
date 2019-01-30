# Changelog-it

> Easy to use tool for maintaing your Changelog that keeps [keepachangelog](https://keepachangelog.com) format.

## Table of contents
  * [Installation](#init)
  * [New changelog](#new-changelog)
  * [Usage](#usage)

## Installation

Using npm:

```bash
npm i -s AckeeCZ/changelog-it
```

## New changelog

Initialization of new changelog is currently not available (but planned for some of next releases). Current best way to initialize new Changelog is to execute command

```bash
npx auto-changelog --template keepachangelog -l 20 -b 20
```

## Usage

Using the package now is very simply, just call it's binary

```bash
changelog-it
```

which cause few things to happen:

* Existing CHANGELOG.md is parsed
* Last version in changelog means name of tag which is used to get all commits since last release
* Current version is determined from package.json
* New record with received version and today date is created in changelog
* Messages of all commits since last release are added to the new record
* Every commit message is tested and if it starts with key word, it's added to the corresponding section
  * `Add` or `Added` are key words for **Added** section
  * `Fix` or `Fixed` are key words for **Fixed** section
  * `Remove` or `Removed` are key words for **Removed** section
  * `Change`, `Changeed`, `Update` or `Updated` are key words for **Changed** section

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