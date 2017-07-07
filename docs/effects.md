## diagonalBackground
_include extra palettify styles_
```html
 <div class="diagonalBackground" id="diagonalBackground">
 ...
    <figure class="figure">
      <img class="image" src="images/0_thumb.jpg" alt="abstract0">
      <figcaption class="caption">
        <h4 class="title">Jason Response</h4>
        <p class="desc">Just makes people try to do everything at once.</p>
      </figcaption>
      <a href="#" class="attachTo"> </a>
      <div class="diagonal"></div>
    </figure>
    ...
  </div>
```
```js
palettify().init({
    selector: '#diagonalBackground',
    image: '.image',
    eventTarget: '.figure',
    styleTarget: '.caption',
    styles: Object.assign({},palettifyStyles.diagonalBackground),
    staticCallback: function(obj){
      // Apply the primary color's contrast color as background to the diagonal element. Gives it extra oomph.
      obj.eventTarget.querySelector('.diagonal').style.background = obj.palette.contrastColors[0]
    }
  })
```
 <div class="grid-x grid-margin-x medium-up-2 large-up-3 diagonalBackground" id="diagonalBackground">
    <div class="cell m-b-10">
      <figure class="figure">
        <img class="image" src="images/0_thumb.jpg" alt="abstract">
        <figcaption class="caption">
          <h4 class="title">Jason Response</h4>
          <p class="desc">Just makes people try to do everything at once.</p>
        </figcaption>
        <a href="#" class="attachTo"> </a>
        <div class="diagonal"></div>
      </figure>
    </div>
    <div class="cell m-b-10">
      <figure class="figure">
        <img class="image" src="images/1_thumb.jpg" alt="abstract1">
        <figcaption class="caption">
          <h4 class="title">Jason Response</h4>
          <p class="desc">Just makes people try to do everything at once.</p>
        </figcaption>
        <a href="#" class="attachTo"> </a>
        <div class="diagonal"></div>
      </figure>
    </div>
    <div class="cell m-b-10">
      <figure class="figure">
        <img class="image" src="images/2_thumb.jpg" alt="abstract2">
        <figcaption class="caption">
          <h4 class="title">Jason Response</h4>
          <p class="desc">Just makes people try to do everything at once.</p>
        </figcaption>
        <a href="#" class="attachTo"> </a>
        <div class="diagonal"></div>
      </figure>
    </div>
  </div>
  
 ## zoomOutRight
_include extra palettify styles_
```html
 <div class="zoomOutRight" id="zoomOutRight">
  ...
    <figure class="figure">
      <img class="image" src="images/0_thumb.jpg" alt="abstract">
      <figcaption class="caption">
        <h4 class="title">Jason Response</h4>
        <p class="desc">Just makes people try to do everything at once.</p>
      </figcaption>
      <a href="#" class="attachTo"> </a>
    </figure>
  ...
</div>
```

```js
   palettify().init({
      selector: '#zoomOutRight',
      image: '.image',
      eventTarget: '.figure',
      styleTarget: true, // special hidden feature. When set to true, use eventTarget it self.
      styles: Object.assign({},palettifyStyles.zoomOutRight)
    })
```
 <div class="grid-x grid-margin-x medium-up-2 zoomOutRight" id="zoomOutRight">
    <div class="cell m-b-10">
      <figure class="figure">
        <img class="image" src="images/0_thumb.jpg" alt="abstract">
        <figcaption class="caption">
          <h4 class="title">Jason Response</h4>
          <p class="desc">Just makes people try to do everything at once.</p>
        </figcaption>
        <a href="#" class="attachTo"> </a>
      </figure>
    </div>
    <div class="cell m-b-10">
      <figure class="figure">
        <img class="image" src="images/1_thumb.jpg" alt="abstract1">
        <figcaption class="caption">
          <h4 class="title">Jason Response</h4>
          <p class="desc">Just makes people try to do everything at once.</p>
        </figcaption>
        <a href="#" class="attachTo"> </a>
      </figure>
    </div>
    <div class="cell m-b-10">
      <figure class="figure">
        <img class="image" src="images/2_thumb.jpg" alt="abstract2">
        <figcaption class="caption">
          <h4 class="title">Jason Response</h4>
          <p class="desc">Just makes people try to do everything at once.</p>
        </figcaption>
        <a href="#" class="attachTo"> </a>
      </figure>
    </div>
  </div>
  
<script lang="javascript">
  palettify().init({
    selector: '#diagonalBackground',
    image: '.image',
    eventTarget: '.figure',
    styleTarget: '.caption',
    styles: Object.assign({},palettifyStyles.diagonalBackground),
    staticCallback: function(obj){
      obj.eventTarget.querySelector('.diagonal').style.background = obj.palette.contrastColors[0]
    }
  })
  
   palettify().init({
      selector: '#zoomOutRight',
      image: '.image',
      eventTarget: '.figure',
      styleTarget: true, // special hidden feature. When set to true, use eventTarget it self.
      styles: Object.assign({},palettifyStyles.zoomOutRight)
    })
</script>
