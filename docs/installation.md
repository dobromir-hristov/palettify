# Install
palettify can be used both in the browser via cdn or script tag and as a package in a build system.

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
  hoverTarget: '.hoverTarget', // Element to attach event listener to (mouseenter bt default).
  imageTarget: '.imageTarget', // Image target that we will be sampled for colors.
  attachBoxShadowTo: '.imageTarget' // Element to attach the boxShadow to. (optional) Defaults to imageTarget.
})
```
___
## No bundler and using directly in the Browser

If you are not using a module bundler and want to use it directly in the browser:

### Direct Download / CDN

https://unpkg.com/palettify/dist/palettify

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like https://unpkg.com/palettify@0.0.0/dist/palettify.js...........

```html
<script src="https://unpkg.com/palettify/dist/img-palette.js"></script>
<script src="https://unpkg.com/img-palette/dist/palettify.js"></script>
```

or download it from [github](https://github.com/dobromir-hristov/palettify.git)

```html
<script>
  var palettifyInstance = palettify().init({
      hoverTarget: '.hoverTarget', 
      imageTarget: '.imageTarget', 
      attachBoxShadowTo: '.imageTarget'
  })
</script>
```
### TIP!!
Because we are working with images, its good practise to make sure they are all loaded before we can sample them.
One good way is to use the [imagesLoaded](https://imagesloaded.desandro.com) library. Add it in your page (via cdn or bundle) and init after is done.
```js
imagesLoaded('.imageTarget', function() {
  window.palettifyInstance = palettify().init({
    hoverTarget: '.hoverTarget',
    imageTarget: '.imageTarget'
  })
})
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
