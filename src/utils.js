// allowed keywords according to https://keepachangelog.com/en/1.0.0/#how
const titleKeywords = ['Added', 'Changed', 'Deprecated', 'Removed', 'Fixed', 'Security'];
const titleKeywordRegex = new RegExp(`(${titleKeywords.join('|')})`, 'i');
const _ = require('lodash');

function sanitizeChangelog(changelog) {
  return changelog.replace(/### (\w+)/g, (match, keyword) => {
    if (keyword === 'Updated') {
      return match.replace('Updated', 'Changed');
    }

    if (titleKeywordRegex.test(keyword)) {
      return match.replace(keyword, _.upperFirst(keyword));
    }

    if (titleKeywords.indexOf(keyword) === -1) {
      return match.replace(keyword, 'Changed');
    }

    return match;
  });
}

module.exports = {
  sanitizeChangelog,
};
