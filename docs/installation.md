# Install
palettify can be used both in the browser via cdn or script tag and as a package in a build system like Rollup/Webpack/Browserify.

## Using a module bundler like Webpack/Rollup/Browserify etc

### NPM
```bash
$ npm install palettify
```
### Yarn
```bash
$ yarn add palettify
```

After you have installed the package import `palettify` and create a new instance:

```js
import palettify from 'palettify'

const palettifyInstance = palettify().init({
  selector: '.image-list',
  eventTarget: '.hoverTarget', // Element to attach event listener to (mouseenter bt default).
  image: '.imageTarget', // Image target that we will be sampled for colors.
  styleTarget: '.imageTarget', // Element to attach the styles to. (optional) Defaults to image.
  staticStyles: {}, // Static styles to apply on plugin load
  dynamicStyles: {} // Dynamic styles to apply on each interaction
})
```
___
## No bundler and using directly in the Browser

If you are not using a module bundler and want to use it directly in the browser:

### Direct Download / CDN

https://unpkg.com/palettify/dist/palettify

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like https://unpkg.com/palettify@0.0.0/dist/palettify.js......................

```html
<script src="https://unpkg.com/palettify/dist/palettify.min.js"></script>
```

or download it from [github](https://github.com/dobromir-hristov/palettify.git)

```html
<script>
  var palettifyInstance = window.palettify().init({
      selector: '.image-list',
      eventTarget: '.hoverTarget', 
      image: '.imageTarget', 
      styleTarget: '.imageTarget',
      staticStyles: {}, 
      dynamicStyles: {} 
  })
</script>

```
## Exemplary markup
```html
<div class="image-list">
  <div class="hoverTarget">
    <img class="imageTarget" width="400" height="200" src="images/0.jpg">
  </div>
  <div class="hoverTarget">
     <img class="imageTarget" width="400" height="200" src="images/1.jpg">
  </div>
</div>
```
