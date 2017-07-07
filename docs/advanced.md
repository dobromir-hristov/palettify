## Built in Effects

**Palettify** comes with a few built in effects. Their purpose is to give you an idea what you can do with the plugin.
The effects are in `palettify.styles.min.js` and can be imported in your build system or added directly in the browser as its an UMD module.
To apply them, you have to merge them with your own styles.

The more advanced examples have css styles that you have to include as well. Either use `palettify.min.css` or use the raw scss files.

#### Node/Build system
```js
import palettifyStyles from 'palettify/dist/palettify.styles.min.js'
```
#### Browser
```html
<script src="palettify/dist/palettify.styles.min.js"></script>
```

### boxShadow effect example

The box shadow effect is a little glow that is added to the image on each interaction.

```js
const palettifyInstance = palettify().init({
  selector: '#boxShadow',
  eventTarget: '.hoverTarget', 
  image: '.imageTarget', 
  styles: Object.assign({}, palettifyStyles.boxShadow, { /* your style overide here */ })
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

## Callbacks
Sometimes you just need more advanced features. This is where the callbacks come in handy. Each callback is called at a strategic time.
 
- staticCallback(obj, options) - Gets called after the `styleTarget` gets its styles attached. `this` gets bound to the `styleTarget`.
- beforeEnterCallback(obj, options, event) - Gets called before the `enterEvent`. `this` gets bound to the `styleTarget`.
- afterEnterCallback(obj, options, event) - Gets called after the `enterEvent`. `this` gets bound to the `styleTarget`.
- beforeLeaveCallback(obj, options, event) - Gets called before the `leaveEvent`. `this` gets bound to the `styleTarget`.
- afterLeaveCallback(obj, options, event) - Gets called after the `leaveEvent`. `this` gets bound to the `styleTarget`.
- onReadyCallback(palettifyInstance) - Gets called after **palettify** is finished initializing. `this` gets bound to the `palettify` instance.
    

<script>
    setTimeout(function(){
       window.boxShadowInstance = palettify().init({
             selector: '#boxShadow',
             eventTarget: '.hoverTarget', 
             image: '.imageTarget', 
             styles: Object.assign({}, palettifyStyles.boxShadow)
       }) 
    }, 1)
</script>
