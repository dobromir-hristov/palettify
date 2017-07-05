# Getting Started

> We will be using [ES2015](https://github.com/lukehoban/es6features) in the code samples in the guide.

After initializing, `palettify` returns an instance containing handy methods to modify the plugin after it has been setup.

## Markup

There is no required markup or specific classes to use. The only requirements are a selector wrapper, an image to pick the color from and a parent element to attach event listeners to.

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
  
### Background Images
You can also use the plugin with background images too. Only requirement is the background image is defined in an inline style so **palettify** can read it.
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
  <div class="image-list image-list--bg">
    <div class="hoverTarget hoverTarget--bg">
      <div class="imageTarget" style="background-image: url('http://i.imgur.com/YQqDfyF.jpg')"></div>
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
  
  
  ## Cross Origin images e.g. from CDN

If you are using images that are not hosted externally, the server that hosts them should send proper cross-origin headers. 
You should add the `crossorigin="Anonymous"` tag to your image, if you forget to do so, **palettify** will do it for you, but from a performance perspective its better to do it your self.

```html
  <div class="image-list">
    <div class="hoverTarget">
      <img class="imageTarget" crossorigin="anonymous" width="400" height="200" src="http://i.imgur.com/YQqDfyF.jpg" alt="abstract0">
    </div>
    <div class="hoverTarget">
      <img class="imageTarget" crossorigin="anonymous" width="400" height="200" src="http://i.imgur.com/KRVdGIu.jpg" alt="abstract1">
    </div>
    <div class="hoverTarget">
      <img class="imageTarget" crossorigin="anonymous" width="400" height="200" src="http://i.imgur.com/qbZ7xVY.jpg" alt="abstract2">
    </div>
    <div class="hoverTarget">
      <img class="imageTarget" crossorigin="anonymous" width="400" height="200" src="http://i.imgur.com/n4de5bt.jpg" alt="abstract3">
    </div>
  </div>  
```

  <div id="crossorigin" class="image-list">
    <div class="hoverTarget">
      <img class="imageTarget" crossorigin="anonymous" width="400" height="200" src="http://i.imgur.com/YQqDfyF.jpg" alt="abstract0">
    </div>
    <div class="hoverTarget">
      <img class="imageTarget" crossorigin="anonymous" width="400" height="200" src="http://i.imgur.com/KRVdGIu.jpg" alt="abstract1">
    </div>
    <div class="hoverTarget">
      <img class="imageTarget" crossorigin="anonymous" width="400" height="200" src="http://i.imgur.com/qbZ7xVY.jpg" alt="abstract2">
    </div>
    <div class="hoverTarget">
      <img class="imageTarget" crossorigin="anonymous" width="400" height="200" src="http://i.imgur.com/n4de5bt.jpg" alt="abstract3">
    </div>
  </div>
  
## Main usage
### staticStyles
Styling is done via the `staticStyles` and `dynamicStyles` objects. These represent an object containing valid css rules like `color`, `boxShadow`, `backgroundPosition` etc.
`staticStyles` are applied when the image is sampled and the `palette` object is created. You can use moustache bindings to make use of the colors in the palettes:

```js
const options = {
  staticStyles: {
    boxShadow: `0 2px 2px {{rgba.0}}, 0 4px 4px {{rgba.0}}, 0 8px 8px {{rgba.0}}, 0 16px 16px {{rgba.0}}, 0 32px 32px {{rgba.1}}, 0 64px 64px {{rgba.1}}`
  }
}
```
### dynamicStyles
`dynamicStyles` are applied on each `enterEvent` (hover, click, etc) and are removed in the `leaveEvent`. If there is a property in `dynamicStyles` that is present in `staticStyles` as well, the `staticStyles` one is reapplied on the `leaveEvent`.

Combined properties like `border` need special attention. If you want to change the `borderWidth` in the `dynamicStyles` but it is set like `border:2px solid {{rgb.0}}` on the `staticStyles` then it will get set to `border-width: initial`. 
To overcome this, just set `borderWidth` on your `staticStyles` to what ever you want, this way it will be set back to it after the interaction is finished.
  
### contrastColors
  
`contrastColors` is an object containing 2 colors, `light` and `dark`. **palettify** scans each color in the palette, finds its luminosity and figures out if a light or dark color would be better suited.
This is very useful when you need to show text in a background filled with the primary color of an image. We use this in our `popover` premade styles.
  
## Available Options
| Option | Type | Required | Description |
| --- | --- | --- | --- |
| selector | String, HTMLElement |required | Wrapper that holds your collection of images |
| eventTarget | String |required | Target to attach the event listeners to. |
| image | String | required | Target to pick color palette from. Must be child of `hoverTarget`. (distant/direct does not matter) |
| styleTarget | String | optional | The element to apply styling to. Defaults to image. |
| staticStyles | Object | optional | Object containing valid css styles to apply to styleTarget on ready |
| dynamicStyles | Object | optional | Object containing valid css styles to apply to styleTarget on each enterEvent |
| opacities | Array<number> | optional | Array of opacity numbers from 0 to 1. Generates an rgba palette with opacities. |
| colorsToExtract | Number | optional | Number of colors to extract for the palette | 
| contrastColors | Object | optional | Contrast colors to be assigned depending on the luminosity of each color. Dark ones get light color, light colors get the dark one. Defaults to: `{light:'#fff', dark:'#000'}` | 
| activeClass | String | optional | CSS class to apply on each enterEvent. Defaults to `palettify--active` |
| readyClass | String | optional | CSS class to apply when palettify is ready. Defaults to `palettify--ready` |
| enterEvent | String or Array | optional | Event or Array of events to apply listeners to for each enter interaction. Defaults to mouseenter |
| leaveEvent | String or Array | optional | Event or Array of events to apply listeners to for each leave interaction. Defaults to mouseleave |
| beforeEnterCallback | Function | optional | Callback called before the enter event |
| afterEnterCallback | Function | optional | Callback called after the enter event |
| beforeLeaveCallback | Function | optional | Callback called before the leave event |
| afterLeaveCallback | Function | optional | Callback called after the enter event |
| onReadyCallback | Function | optional | Callback called after palettify is ready |

## Methods

| Method | Description | 
| --- | --- |
| collectElements | Collects all the targets and saves references inside a collection. |
| extractColorsAndAttachStyles | Extracts color palettes and attaches static styles to each styleTarget. This is where we call onReadyCallback. |
| attachEventListeners | Attaches the event listeners to each `eventTarget` element. |
| detachEventListeners | Detaches the event listeners from each `eventTarget` element. |
| init(options) | Initializes the whole plugin. Can be called only after `palettify` is destroyed. |
| destroy(cleanUp = true) | Destroys the whole plugin and cleans after it self. `cleanUp <Boolean> = true` - If set to false, skips the cleaning part.|
| reInit | Destroys and Initializes the plugin. |
| cleanUp | Cleans up the dof after plugin is destroyed. Removes all `staticStyles`. |
| setOptions (options, reInit = true) | Allows setting an option after the plugin is initialized. Requires an options object. `reInit <Boolean> = true`  Tells the `palettify` to reinitialize. |
| isInitialized () | Check if plugin is initialized. Returns `Boolean`. |

## Options in Data Collection

The palettify instance returns a `data` array that represents a collection of html element references, function references and properties:

| Attribute | Description | 
| --- | --- |
| enterHandler | A reference to the enterEvent handler. This is needed to be able to unbind on the `destroy` method. |
| leaveHandler | A reference to the leaveEvent handler. Same as above. |
| eventTarget | A reference to the eventTarget element. Used for easy access to each event target. |
| image | A reference to the image/element that is being sampled.|
| styleTarget | A reference to the styleTarget element. |
| palette | A collection of different palettes. See bellow |
| palette.original | The original palette extracted from the image. An Array of Arrays containing the RGB colors as indexes. |
| palette.rgb | An array of RGBA strings `rgba(255,255,255, 1)` from the `original` palette with set opacity to 1 .|
| palette.rgba | An array of RGBA strings `rgba(255,255,255, 0.5)` from the `original` palette, opacity is influenced by the `opacities` option.|
| palette.contrastColors | An array of the `contrastColors`, depending on the luminosity of each color a proper contrast color is chosen. |

<script>
  window.boxshadow = palettify().init(Object.assign({}, palettifyStyles.boxShadow,
    {
      selector: '.image-list',
      eventTarget: '.hoverTarget',
      image: '.imageTarget'
    }
  ))
  
   window.border = palettify().init(Object.assign({}, palettifyStyles.border,
      {
        selector: '.image-list--bg',
        eventTarget: '.hoverTarget',
        image: '.imageTarget'
      }
    )) 
      
   window.crossOrigin = palettify().init(Object.assign({}, palettifyStyles.boxShadow,
      {
        selector: '#crossorigin',
        eventTarget: '.hoverTarget',
        image: '.imageTarget'
      }
    ))
</script>
