# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.0.0"></a>
# 1.0.0 (2017-07-07)


### Bug Fixes

* Add a better merge strategy for the options. ([4df7279](https://github.com/dobromir-hristov/palettify/commit/4df7279))
* Add check if bg-image is CORS. ([e4f4664](https://github.com/dobromir-hristov/palettify/commit/e4f4664))
* **callbacks:** Change up callback parameters to make more sense. ([5f98658](https://github.com/dobromir-hristov/palettify/commit/5f98658))
* **dist files:** Added dist files that were deleted on name change. ([c7fb0e7](https://github.com/dobromir-hristov/palettify/commit/c7fb0e7))
* **styles:** fixes to the premade styles. ([c138280](https://github.com/dobromir-hristov/palettify/commit/c138280))
* **styles:** Remove margin from border style. ([9d7940c](https://github.com/dobromir-hristov/palettify/commit/9d7940c))
* Fix background image fetching when element has no height. ([b9068c3](https://github.com/dobromir-hristov/palettify/commit/b9068c3))
* Remove unnecessary console.log. ([fc8fbb8](https://github.com/dobromir-hristov/palettify/commit/fc8fbb8))


### Features

* Add ability to wait for image to load. ([818a095](https://github.com/dobromir-hristov/palettify/commit/818a095))
* Add contrastColors feature. ([07cdd57](https://github.com/dobromir-hristov/palettify/commit/07cdd57))
* Add parentElement option to enable scoping. ([2750efd](https://github.com/dobromir-hristov/palettify/commit/2750efd))
* Added ability to add multiple event types to listeners. ([e4c49f0](https://github.com/dobromir-hristov/palettify/commit/e4c49f0))
* Total rewrite of the plugin. ([27d5614](https://github.com/dobromir-hristov/palettify/commit/27d5614))
* **SCSS:** Add styles.scss to palettify. ([6fc8d24](https://github.com/dobromir-hristov/palettify/commit/6fc8d24))
* **SCSS:** Add zoomOutRight style to styles. ([b9db4e1](https://github.com/dobromir-hristov/palettify/commit/b9db4e1))


### BREAKING CHANGES

* dynamicStyles and staticStyles changed to styles.static and styles.dynamic. Opacities is moved to styles as well. This is to make merging of predefined styles easier.
* hoverTarget changed to Event target. imageTarget changed to image. Added required
selector option. Added static and dynamic style objects. Removed the boxShadow properties. They are
now externally reqired.
* `attachBoxShadowTo` is now `styleTarget`. `opacity` and `opacitySecondary` are deprecated and will be removed soon.
