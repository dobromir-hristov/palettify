# Getting Started

> We will be using [ES2015](https://github.com/lukehoban/es6features) in the code samples in the guide.

After initializing, `palettify` returns an instance containing handy methods to modify the plugin after it has been setup.
Almost everything is configurable. From the color used, to the type of box shadow that is applied to the element. You could even add extra styles by extending some methods.

### Markup

There is no required markup or specific classes to use. The only requirements are an image to pick the color from and a parent element to listen for hover events.

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

  <div class="image-list">
    <div class="hoverTarget">
      <img class="imageTarget" width="400" height="200" src="images/0.jpg" alt="abstract0">
    </div>
    <div class="hoverTarget">
      <img class="imageTarget" width="400" height="200" src="images/1.jpg" alt="abstract1">
    </div>
    <div class="hoverTarget">
      <img class="imageTarget" width="400" height="200" src="images/2.jpg" alt="abstract2">
    </div>
    <div class="hoverTarget">
      <img class="imageTarget" width="400" height="200" src="images/3.jpg" alt="abstract3">
    </div>
  </div>  

You can also use the plugin with background images too. Only requirement is the background image is defined in an inline style.
```html
<div class="image-list">
  <div class="hoverTarget">
    <div class="imageTarget" style="background-image: url('images/0.jpg')"></div>
  </div>
  <div class="hoverTarget">
     <div class="imageTarget" style="background-image: url('images/1.jpg')"></div>
  </div>
</div>
```
  <div class="image-list">
    <div class="hoverTarget hoverTarget--bg">
      <div class="imageTarget" style="background-image: url('images/0.jpg')"></div>
    </div>
    <div class="hoverTarget hoverTarget--bg">
       <div class="imageTarget" style="background-image: url('images/1.jpg')"></div>
    </div>
    <div class="hoverTarget hoverTarget--bg">
      <div class="imageTarget" style="background-image: url('images/2.jpg')"></div>
    </div>
    <div class="hoverTarget hoverTarget--bg">
       <div class="imageTarget" style="background-image: url('images/3.jpg')"></div>
    </div>
  </div>


## Available Options
| Option | Type | Required | Description |
| --- | --- | --- | --- |
| hoverTarget | String, Nodelist |required | Target to attach the event listeners to. |
| imageTarget | String, Nodelist | required | Target to pick color palette from. Must be child of `hoverTarget`. (distant/direct does not matter) |
| attachBoxShadowTo | String | optional | Target to attach the box shadow effect on. If not provided, will attach to `imageTarget`. |
| opacity | String | optional | Opacity to apply on the first box shadow color |
| opacitySecondary | String | optional | Opacity to apply on the secondary box shadow color |
| colorIndexToUse | String | optional | Color index to use from the generated palette | 
| enterEvent | String | optional | Enter event on which we do all the animations |
| leaveEvent | String | optional | Leave event on which we do all the animations |
| boxShadowTemplate | String | optional | Provide a custom box shadow template. Should be a string and something like this: `2px 3px 12px {color}` Color being our primary color combined with primary opacity. There is a second variable: {colorSecondary} which returns the secondary color. |

## Methods

| Method | Description | 
| --- | --- |
| collectElements | Collects all the `hoverTargets` and `imageTargets` and puts them inside an array. |
| attachBoxShadowToCollection | Extracts colors from each image in the `images` collection and attaches a box shadow template as a data attribute. |
| removeBoxShadowFromCollection | Removes the box shadow template from the data attribute of each image. |
| attachEventListeners | Attaches the event listeners to each `hoverTarget` element. |
| detachEventListeners | Detaches the event listeners from each `hoverTarget` element. |
| init | Initializes the whole plugin. Can be called only after `palettify` is destroyed. |
| destroy(removeDataAttr = true) | Destroys the whole plugin and cleans after it self. `removeDataAttr <Boolean> = true` - Should it remove the `boxShadow` data attribute|
| reInit(removeDataAttr = true) | Destroys and Initializes the plugin. |
| setOptions (options, reInit = true) | Allows setting an option after the plugin is initialized. Requires an options object. `reInit <Boolean> = true`  Tells the `palettify` to reinitialize. |
| isInitialized () | Check if plugin is initialized. Returns `true/false`. |

## Attributes

| Attribute | Description | 
| --- | --- |
| elements | Array of objects containing image targets, hoverTarget, boxShadow, colors picked by the color picker. |
| enterHandler | Mouse enter event handler. Attaches the `boxShadow` to the `attachBoxShadowTo` or falls back to `imageTarget` element. |
| leaveHandler | Mouse leave event handler. Removes the box shadow from to the `attachBoxShadowTo` element. |

<script>
imagesLoaded('.imageTarget', function () {
  window.boxshadow = palettify().init({
    hoverTarget: '.hoverTarget',
    imageTarget: '.imageTarget'
  })
})
</script>
