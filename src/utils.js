const _ = require('lodash');

// allowed keywords according to https://keepachangelog.com/en/1.0.0/#how
const titleKeywords = ['Added', 'Changed', 'Deprecated', 'Removed', 'Fixed', 'Security'];
const titleKeywordRegex = new RegExp(`^(${titleKeywords.join('|')})$`, 'i');

function sanitizeChangelog(changelog) {
  return changelog.replace(/### (\w+)/g, (match, keyword) => {
    if (keyword === 'Updated') {
      console.log('Replace invalid keyword `Updated` with `Changed`');
      return match.replace('Updated', 'Changed');
    }

    if (titleKeywordRegex.test(keyword)) {
      console.log(`Fix casing of word \`${keyword}\``);
      return match.replace(keyword, _.upperFirst(keyword));
    }

    if (titleKeywords.indexOf(keyword) === -1) {
      console.log(`Replace invalid keyword \`${keyword}\` with \`Changed\``);
      return match.replace(keyword, 'Changed');
    }

    return match;
  });
}

module.exports = {
  sanitizeChangelog,
};
