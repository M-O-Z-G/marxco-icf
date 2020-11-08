Marxco Iconfont CS
---

[![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/m-o-z-g/marxco-icf/master?label=version&logo=github)](https://github.com/M-O-Z-G/marxco-icf) [![GitHub Release Date](https://img.shields.io/github/release-date-pre/m-o-z-g/marxco-icf?logo=github)](https://github.com/M-O-Z-G/marxco-icf) [![Icons Count](https://frama.link/xHxyshm8)](https://m-o-z-g.gitlab.io/marxco-icf/) [![pipeline status](https://img.shields.io/gitlab/pipeline/m-o-z-g/marxco-icf?logo=gitlab&label=pipeline)](https://gitlab.com/M-O-Z-G/marxco-icf/pipelines) [![coverage report](https://gitlab.com/M-O-Z-G/marxco-icf/badges/master/coverage.svg)](https://m-o-z-g.gitlab.io/marxco-icf/coverage) [![AppVeyor](https://img.shields.io/appveyor/build/m-o-z-g/marxco-icf?logo=appveyor&logoColor=white)](https://ci.appveyor.com/project/M-O-Z-G/marxco-icf) [![devDependency Status](https://david-dm.org/m-o-z-g/marxco-icf/dev-status.png)](https://david-dm.org/m-o-z-g/marxco-icf?type=dev) [![GitHub package.json dependency Gulp version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/m-o-z-g/marxco-icf/dev/gulp?logo=gulp&logoColor=white&label=Gulp)](https://github.com/gulpjs/gulp) [![node](https://img.shields.io/static/v1?label=Node.js&message=%3E=8.17.0&logo=node.js&logoColor=white&color=informational)](https://github.com/nodejs/node) [![Activity](https://img.shields.io/github/commits-since/m-o-z-g/marxco-icf/latest/master?include_prereleases&label=commits%20from%20latest%20release)](https://gitlab.com/M-O-Z-G/marxco-icf/master/commits) [![Support the Author](https://frama.link/Wn756FPF)](https://www.blockonomics.co/pay-url/029f3f4400fc11eb) [![Patreon](https://img.shields.io/static/v1?logo=patreon&label=&message=support%20on%20Patreon&color=F96854&logoColor=white)](https://patreon.com/mozgstudio)

## What is?

Marxco Iconfonts provides specific icons for 3D artists, print designers, merchants, and also reflect some cultural artifacts. This icon font is the part of big ambitious Stylus framework Marxco, designed for artists, and with the spirit of classic typesetting in its heart. Which however is in the deep development process, and perhaps will never be released for the public. But it's necessary to have some regular and specific icons under the hand, that's why this project has been separated into own repository, and I hope could be helpful for someone else.

## How to?

All icons are provided in common font formats and ready to use with your code and injected `icons.css` from `public` directory.

### Example:

```html
<i class="mrx_ic mrx_ic-logo-gitlab"></i>
```

> Since 1.7.0 version, source icons related styles remade with Stylus, and now you have full control of prefixes, and its allows to use default variables from Marxco or [Bulma Stylus Plus](https://github.com/M-O-Z-G/bulma-stylus-plus) as default  values, with variable `$framework`. You can use it however you need. Initially, this repo suggested to work as is with CSS.

> Since 1.7.0 version [Gulp](https://gulpjs.com) is doing generation and preparation work only. Showcase layout generated with [Parcel](https://parceljs.org).

But if you're planning to make some changes:

1. You need to install [Node.js](https://nodejs.org/en/).

2. You need to install [Yarn](https://yarnpkg.com/lang/en/).

3. You need to install [Gulp](https://gulpjs.com/).

4. Clone this repository to local.

5. Run terminal, set current dir to the path of your local repository.

6. Run `yarn install` and wait for finished of installation all dependencies.

	Next commands available:
- `npm run build` to optimize, organize new icons then generate fonts and build showcase layout.
- `npm run font-generation` to generate fonts with no processing.
- `gulp test` like `npm run build` but resets all icon unicode names then give new.

### Supported prefixes by default:

`logo-`, `badge-`, `social-`, `finance-`, `market-`, `grafx-`, `3d-`, `doc-`, `software-`, `lic-`, `dev-`, `polit-`, `cult-`, `gem-`, `userpic-`. Any other prefixes and filenames will be proceeded as `miscellaneous` icons.