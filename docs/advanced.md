# Built in Effects

**Palettify** comes with a few built in effects. They are mostly starters and are by no means perfect. Their purpose is to give you an idea what you can do with the plugin.
The effects are in `palettify.styles.min.js` and can be imported in your build system or added directly in the browser as its an UMD module.
To apply them, you have to merge them with your own styles.

### boxShadow effect

The box shadow effect is a little glow that is added to the image on each interaction.

```js
const palettifyInstance = palettify().init({
  selector: '#boxShadow',
  eventTarget: '.hoverTarget', 
  image: '.imageTarget', 
  styles: Object.assign({}, palettifyStyles.boxShadow, { /* your styles here */ })
})
```

   <div class="image-list" id="boxShadow">
      <div class="hoverTarget">
        <img class="imageTarget" width="400" height="200" src="images/0_thumb.jpg" alt="abstract0">
      </div>
      <div class="hoverTarget">
        <img class="imageTarget" width="400" height="200" src="images/1_thumb.jpg" alt="abstract1">
      </div>
      <div class="hoverTarget">
        <img class="imageTarget" width="400" height="200" src="images/2_thumb.jpg" alt="abstract2">
      </div>
      <div class="hoverTarget">
        <img class="imageTarget" width="400" height="200" src="images/3_thumb.jpg" alt="abstract3">
      </div>
    </div>
    
    
You have two colors that you can use, `{color}` and `{colorSecondary}`. Both colors are RGBA and apply the opacity settings you provide defaulting to `.2`.
Settings opacity is easy using the `opacity` and `opacitySecondary` settings.

```js
const palettifyInstance = palettify().init({
  hoverTarget: '.hoverTarget', 
  imageTarget: '.imageTarget', 
  boxShadowTemplate: '2px 3px 10px {color}, 5px 2px 10px 5px {colorSecondary}',
  opacity: 0.5,
  opacitySecondary: 0.1
})
```

## Setting which color to use

Under the hood **palettify** uses [Color Thief](http://lokeshdhakar.com/projects/color-thief/) which is a simple library to extract a color palette from an image.

**Color Thief** returns 8 colors from which to choose. **palettify** is set to use the first one, but it is overridable with the `colorIndexToUse` option.

## Setting Enter and Leave events

If you want to use different events than `mouseenter` and `mouseleave` then supply them via da `enterEvent` and `leaveEvent`.
For example settings focus and blur events:

```js
const palettifyInstance = palettify().init({
  hoverTarget: '.focusTarget', // Element to attach event listener to (mouseenter bt default).
  imageTarget: '.imageTarget', // Image target that we will be sampled for colors.
  enterEvent: 'focus',
  leaveEvent: 'blur'
})
```

  <div class="image-list">
    <div class="hoverTarget focusTarget">
      <img class="imageTarget" width="400" height="200" src="images/0_thumb.jpg" alt="abstract0">
    </div>
    <div class="hoverTarget focusTarget">
      <img class="imageTarget" width="400" height="200" src="images/1_thumb.jpg" alt="abstract1">
    </div>
    <div class="hoverTarget focusTarget">
      <img class="imageTarget" width="400" height="200" src="images/2_thumb.jpg" alt="abstract2">
    </div>
    <div class="hoverTarget focusTarget">
      <img class="imageTarget" width="400" height="200" src="images/3_thumb.jpg" alt="abstract3">
    </div>
  </div>  
  
## Apply your own box-shadow template
  To apply a new box-shadow template all you have to do is pass your own `boxShadowTemplate` option.
  
  ```js
  const palettifyInstance = palettify().init({
    hoverTarget: '.customShadowTarget', // Element to attach event listener to (mouseenter bt default).
    imageTarget: '.imageTarget', // Image target that we will be sampled for colors.
    boxShadowTemplate: '0 2px 10px 5px {color}, 0 5px 15px 10px {colorSecondary}'
  })
  ```
  
   <div class="image-list">
      <div class="hoverTarget customShadowTarget">
        <img class="imageTarget" width="400" height="200" src="images/0_thumb.jpg" alt="abstract0">
      </div>
      <div class="hoverTarget customShadowTarget">
        <img class="imageTarget" width="400" height="200" src="images/1_thumb.jpg" alt="abstract1">
      </div>
      <div class="hoverTarget customShadowTarget">
        <img class="imageTarget" width="400" height="200" src="images/2_thumb.jpg" alt="abstract2">
      </div>
      <div class="hoverTarget customShadowTarget">
        <img class="imageTarget" width="400" height="200" src="images/3_thumb.jpg" alt="abstract3">
      </div>
    </div>  
  
<script>
     window.boxShadowInstance = palettify().init({
       selector: '#boxShadow',
       eventTarget: '.hoverTarget', 
       image: '.imageTarget', 
       styles: Object.assign({}, palettifyStyles.boxShadow)
     })
      
   
</script>
