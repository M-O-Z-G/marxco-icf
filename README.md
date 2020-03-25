Marxco Iconfont CS
---

[![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/m-o-z-g/marxco-icf/master?label=version&logo=github)](https://github.com/M-O-Z-G/marxco-icf) [![GitHub Release Date](https://img.shields.io/github/release-date-pre/m-o-z-g/marxco-icf?logo=github)](https://github.com/M-O-Z-G/marxco-icf) [![Icons Count](https://img.shields.io/static/v1?label=icons&message=258&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5NjAgMTAyNCI+PHBhdGggZD0iTTE1MS40ODUsODQ0Ljc1OWMxODEuNDMzLDE4MS40MzQgNDc1LjU5NiwxODEuNDM0IDY1Ny4wMywwYzE4MS40MzMsLTE4MS40MzQgMTgxLjQzNCwtNDc1LjU5NiAwLC02NTcuMDNjMTEuNSwtMTYuMzQgMjAuMDE1LC00MC4zMTkgMjAuMDg1LC01OC44NzljLTEzMi45LC00NC4yMyAtMjE1Ljg2LC0xNzYuOTcgLTM0OC42LC0xMTAuNmMtMTMyLjc0LC02Ni4zNyAtMjE1LjcsNjYuMzcgLTM0OC42LDExMC42YzAuMDcsMTguNTYgOC41ODUsNDIuNTM5IDIwLjA4NSw1OC44NzljLTE4MS40MzMsMTgxLjQzNCAtMTgxLjQzNCw0NzUuNTk2IDAsNjU3LjAzWm04My43MDUsLTU4LjAyOWwzNy42OTcsLTY2LjczbDQxNC4yMjcsMGwzNy42ODYsNjYuNzFjLTEzOC45NCwxMjUuOTQgLTM1MS4wOCwxMjUuNjIgLTQ4OS42MSwwLjAyWm05MS45MywtMTYyLjczbDE1Mi44OCwtMjcwLjYybDE1Mi44ODEsMjcwLjYybC0zMDUuNzYxLDBabS0xNjMuMDUsLTI5MC4xNmM2Ny40NywtMTE2Ljg2IDE4OS44MywtMTgyLjI2IDMxNS43MSwtMTgyLjQ2YzEyNS44NywwLjIgMjQ4LjIzLDY1LjYgMzE1LjcsMTgyLjQ2YzY4LjY5LDExOC45NyA2Mi43NSwyNjAuNTUgLTMuMywzNzAuNTNsLTMxMi40LC01NTIuOTlsLTMxMi40MSw1NTIuOTljLTY2LjA0LC0xMDkuOTggLTcxLjk5LC0yNTEuNTYgLTMuMywtMzcwLjUzbDAsMFoiIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PC9zdmc+DQo=&logoColor=white&color=informational)](https://m-o-z-g.gitlab.io/marxco-icf/) [![pipeline status](https://img.shields.io/gitlab/pipeline/m-o-z-g/marxco-icf?logo=gitlab&label=pipeline)](https://gitlab.com/M-O-Z-G/marxco-icf/pipelines) [![AppVeyor](https://img.shields.io/appveyor/build/m-o-z-g/marxco-icf?logo=appveyor&logoColor=white)](https://ci.appveyor.com/project/M-O-Z-G/marxco-icf) [![coverage report](https://gitlab.com/M-O-Z-G/marxco-icf/badges/master/coverage.svg)](https://gitlab.com/M-O-Z-G/marxco-icf/-/commits/master) [![devDependency Status](https://david-dm.org/m-o-z-g/marxco-icf/dev-status.png)](https://david-dm.org/m-o-z-g/marxco-icf?type=dev) [![GitHub package.json dependency Gulp version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/m-o-z-g/marxco-icf/dev/gulp?logo=gulp&logoColor=white&label=Gulp)](https://github.com/gulpjs/gulp) [![node](https://img.shields.io/static/v1?label=Node.js&message=%3E=8.17.0&logo=node.js&logoColor=white&color=informational)](https://github.com/nodejs/node) [![Activity](https://img.shields.io/github/commits-since/m-o-z-g/marxco-icf/latest/master?include_prereleases&label=commits%20from%20latest%20release)](https://gitlab.com/M-O-Z-G/marxco-icf/master/commits)

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
