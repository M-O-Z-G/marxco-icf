Marxco Iconfont CS
---

[![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/m-o-z-g/marxco-icf/master?label=version&logo=github)](https://github.com/M-O-Z-G/marxco-icf) [![GitHub Release Date](https://img.shields.io/github/release-date-pre/m-o-z-g/marxco-icf?logo=github)](https://github.com/M-O-Z-G/marxco-icf) [![Icons Count](https://frama.link/N8VvbA_Q)](https://m-o-z-g.gitlab.io/marxco-icf/) [![pipeline status](https://img.shields.io/gitlab/pipeline/m-o-z-g/marxco-icf?logo=gitlab&label=pipeline)](https://gitlab.com/M-O-Z-G/marxco-icf/pipelines) [![coverage report](https://gitlab.com/M-O-Z-G/marxco-icf/badges/master/coverage.svg)](https://m-o-z-g.gitlab.io/marxco-icf/coverage) [![AppVeyor](https://img.shields.io/appveyor/build/m-o-z-g/marxco-icf?logo=appveyor&logoColor=white)](https://ci.appveyor.com/project/M-O-Z-G/marxco-icf) [![Coveralls Coverage Status](https://coveralls.io/repos/gitlab/M-O-Z-G/marxco-icf/badge.svg?branch=master)](https://coveralls.io/gitlab/M-O-Z-G/marxco-icf?branch=master) [![devDependency Status](https://david-dm.org/m-o-z-g/marxco-icf/dev-status.png)](https://david-dm.org/m-o-z-g/marxco-icf?type=dev) [![GitHub package.json dependency Gulp version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/m-o-z-g/marxco-icf/dev/gulp?logo=gulp&logoColor=white&label=Gulp)](https://github.com/gulpjs/gulp) [![node](https://img.shields.io/static/v1?label=Node.js&message=%3E=8.17.0&logo=node.js&logoColor=white&color=informational)](https://github.com/nodejs/node) [![Activity](https://img.shields.io/github/commits-since/m-o-z-g/marxco-icf/latest/master?include_prereleases&label=commits%20from%20latest%20release)](https://gitlab.com/M-O-Z-G/marxco-icf/master/commits) [![Support the Author](https://frama.link/Wn756FPF)](https://liberapay.com/m.o.z.g)

## What is?

While Marxco Component System is still far from public release, I just decided to share some icons from it as separate repository.

## CS/MS?

CS _(Component System)_ is open versions of the icon font that I decided to share. MS version is closed and contains some specific icons for future design of my store.

## How to?

All icons are provided in common font formats and ready to use with your code and injected `icons.css` from `public` directory.

### Example:

```html
<i class="mrx_ic mrx_ic-logo-gitlab"></i>
```



But if you're planning to make some changes:

1. You need to install [Node.js](https://nodejs.org/en/).
2. You need to install [Yarn](https://yarnpkg.com/lang/en/).
3. You need to install [Gulp](https://gulpjs.com/).
4. Clone this repository to local.
5. Run terminal, set current dir to the path of your local repository.
6. Run `yarn install` and wait for finished of instllation all dependencies.
7. Run `gulp cleanNames` to remove unicode prefixes from filenames.
8. Run `gulp organize` to move all svg files from `src\icons` to related sub-deirectories, based on their prefixes.
9. Run `gulp unicodify` to add unicode prefixes to filenames, base of `icRanges` array from `gulpfile.js`.
10. Run `gulp generation` to rewrite all templates, generate fonts and css files.

If you want, you also could use `gulp layout`, this task will create HTML files with cheatsheet as presented [here](https://m-o-z-g.gitlab.com/marxco-icf/).

### Supported prefixes by default:

`logo-`, `badge-`, `social-`, `finance-`, `market-`, `grafx-`, `3d-`, `doc-`, `software-`, `lic-`, `dev-`, `polit-`, `cult-`, `gem-`. Any other prefixes and filenames will be precced as `miscellaneous` icons.

## What's next?

No any code changes are planned in this repository, but new svg, updated font files and regenerated CSS for new additions/changes.
