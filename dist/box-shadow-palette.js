/*!
 * box-shadow-palette v0.0.0 
 * (c) 2017 Dobromir Hristov
 * Released under the MIT License.
 */
(function (global, factory) {
     typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
     typeof define === 'function' && define.amd ? define(factory) :
     (global.BoxShadowPalette = factory());
}(this, (function () { 'use strict';

/*
 * Color Thief v2.0
 * by Lokesh Dhakar - http://www.lokeshdhakar.com
 *
 * Thanks
 * ------
 * Nick Rabinowitz - For creating quantize.js.
 * John Schulz - For clean up and optimization. @JFSIII
 * Nathan Spady - For adding drag and drop support to the demo page.
 *
 * License
 * -------
 * Copyright 2011, 2015 Lokesh Dhakar
 * Released under the MIT license
 * https://raw.githubusercontent.com/lokesh/color-thief/master/LICENSE
 *
 * @license
 */
var colorThief_min=function(){var a=function(){},b=function(a){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),document.body.appendChild(this.canvas),this.width=this.canvas.width=a.width,this.height=this.canvas.height=a.height,this.context.drawImage(a,0,0,this.width,this.height);};b.prototype.clear=function(){this.context.clearRect(0,0,this.width,this.height);},b.prototype.update=function(a){this.context.putImageData(a,0,0);},b.prototype.getPixelCount=function(){return this.width*this.height},b.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)},b.prototype.removeCanvas=function(){this.canvas.parentNode.removeChild(this.canvas);};/*!
     * quantize.js Copyright 2008 Nick Rabinowitz.
     * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
     * @license
     */
/*!
     * Block below copied from Protovis: http://mbostock.github.com/protovis/
     * Copyright 2010 Stanford Visualization Group
     * Licensed under the BSD License: http://www.opensource.org/licenses/bsd-license.php
     * @license
     */
var c={map:function(a,b){var c={};return b?a.map(function(a,d){return c.index=d,b.call(c,a)}):a.slice()},naturalOrder:function(a,b){return a<b?-1:a>b?1:0},sum:function(a,b){var c={};return a.reduce(b?function(a,d,e){return c.index=e,a+b.call(c,d)}:function(a,b){return a+b},0)},max:function(a,b){return Math.max.apply(null,b?c.map(a,b):a)}},d=function(){function a(a,b,c){return(a<<2*j)+(b<<j)+c}function b(a){function b(){c.sort(a),d=!0;}var c=[],d=!1;return{push:function(a){c.push(a),d=!1;},peek:function(a){return d||b(),void 0===a&&(a=c.length-1),c[a]},pop:function(){return d||b(),c.pop()},size:function(){return c.length},map:function(a){return c.map(a)},debug:function(){return d||b(),c}}}function d(a,b,c,d,e,f,g){var h=this;h.r1=a,h.r2=b,h.g1=c,h.g2=d,h.b1=e,h.b2=f,h.histo=g;}function e(){this.vboxes=new b(function(a,b){return c.naturalOrder(a.vbox.count()*a.vbox.volume(),b.vbox.count()*b.vbox.volume())});}function f(b){var c,d,e,f,g=1<<3*j,h=new Array(g);return b.forEach(function(b){d=b[0]>>k,e=b[1]>>k,f=b[2]>>k,c=a(d,e,f),h[c]=(h[c]||0)+1;}),h}function g(a,b){var c,e,f,g=1e6,h=0,i=1e6,j=0,l=1e6,m=0;return a.forEach(function(a){c=a[0]>>k,e=a[1]>>k,f=a[2]>>k,c<g?g=c:c>h&&(h=c),e<i?i=e:e>j&&(j=e),f<l?l=f:f>m&&(m=f);}),new d(g,h,i,j,l,m,b)}function h(b,d){function e(a){var b,c,e,f,g,h=a+"1",i=a+"2",k=0;for(j=d[h];j<=d[i];j++){ if(p[j]>o/2){for(e=d.copy(),f=d.copy(),b=j-d[h],c=d[i]-j,g=b<=c?Math.min(d[i]-1,~~(j+c/2)):Math.max(d[h],~~(j-1-b/2));!p[g];){ g++; }for(k=q[g];!k&&p[g-1];){ k=q[--g]; }return e[i]=g,f[h]=e[i]+1,[e,f]} }}if(d.count()){var f=d.r2-d.r1+1,g=d.g2-d.g1+1,h=d.b2-d.b1+1,i=c.max([f,g,h]);if(1==d.count()){ return[d.copy()]; }var j,k,l,m,n,o=0,p=[],q=[];if(i==f){ for(j=d.r1;j<=d.r2;j++){for(m=0,k=d.g1;k<=d.g2;k++){ for(l=d.b1;l<=d.b2;l++){ n=a(j,k,l),m+=b[n]||0; } }o+=m,p[j]=o;} }else if(i==g){ for(j=d.g1;j<=d.g2;j++){for(m=0,k=d.r1;k<=d.r2;k++){ for(l=d.b1;l<=d.b2;l++){ n=a(k,j,l),m+=b[n]||0; } }o+=m,p[j]=o;} }else { for(j=d.b1;j<=d.b2;j++){for(m=0,k=d.r1;k<=d.r2;k++){ for(l=d.g1;l<=d.g2;l++){ n=a(k,l,j),m+=b[n]||0; } }o+=m,p[j]=o;} }return p.forEach(function(a,b){q[b]=o-a;}),e(i==f?"r":i==g?"g":"b")}}function i(a,d){function i(a,b){for(var c,d=1,e=0;e<l;){ if(c=a.pop(),c.count()){var f=h(j,c),g=f[0],i=f[1];if(!g){ return; }if(a.push(g),i&&(a.push(i),d++),d>=b){ return; }if(e++>l){ return }}else { a.push(c),e++; } }}if(!a.length||d<2||d>256){ return!1; }var j=f(a),k=0;j.forEach(function(){k++;});var n=g(a,j),o=new b(function(a,b){return c.naturalOrder(a.count(),b.count())});o.push(n),i(o,m*d);for(var p=new b(function(a,b){return c.naturalOrder(a.count()*a.volume(),b.count()*b.volume())});o.size();){ p.push(o.pop()); }i(p,d-p.size());for(var q=new e;p.size();){ q.push(p.pop()); }return q}var j=5,k=8-j,l=1e3,m=.75;return d.prototype={volume:function(a){var b=this;return b._volume&&!a||(b._volume=(b.r2-b.r1+1)*(b.g2-b.g1+1)*(b.b2-b.b1+1)),b._volume},count:function(b){var c=this,d=c.histo;if(!c._count_set||b){var e,f,g,h,i=0;for(f=c.r1;f<=c.r2;f++){ for(g=c.g1;g<=c.g2;g++){ for(h=c.b1;h<=c.b2;h++){ e=a(f,g,h),i+=d[e]||0; } } }c._count=i,c._count_set=!0;}return c._count},copy:function(){var a=this;return new d(a.r1,a.r2,a.g1,a.g2,a.b1,a.b2,a.histo)},avg:function(b){var c=this,d=c.histo;if(!c._avg||b){var e,f,g,h,i,k=0,l=1<<8-j,m=0,n=0,o=0;for(f=c.r1;f<=c.r2;f++){ for(g=c.g1;g<=c.g2;g++){ for(h=c.b1;h<=c.b2;h++){ i=a(f,g,h),e=d[i]||0,k+=e,m+=e*(f+.5)*l,n+=e*(g+.5)*l,o+=e*(h+.5)*l; } } }c._avg=k?[~~(m/k),~~(n/k),~~(o/k)]:[~~(l*(c.r1+c.r2+1)/2),~~(l*(c.g1+c.g2+1)/2),~~(l*(c.b1+c.b2+1)/2)];}return c._avg},contains:function(a){var b=this,c=a[0]>>k,d=a[1]>>k,e=a[2]>>k;return c>=b.r1&&c<=b.r2&&d>=b.g1&&d<=b.g2&&e>=b.b1&&e<=b.b2}},e.prototype={push:function(a){this.vboxes.push({vbox:a,color:a.avg()});},palette:function(){return this.vboxes.map(function(a){return a.color})},size:function(){return this.vboxes.size()},map:function(a){for(var b=this.vboxes,c=0;c<b.size();c++){ if(b.peek(c).vbox.contains(a)){ return b.peek(c).color; } }return this.nearest(a)},nearest:function(a){for(var b,c,d,e=this.vboxes,f=0;f<e.size();f++){ ((c=Math.sqrt(Math.pow(a[0]-e.peek(f).color[0],2)+Math.pow(a[1]-e.peek(f).color[1],2)+Math.pow(a[2]-e.peek(f).color[2],2)))<b||void 0===b)&&(b=c,d=e.peek(f).color); }return d},forcebw:function(){var a=this.vboxes;a.sort(function(a,b){return c.naturalOrder(c.sum(a.color),c.sum(b.color))});var b=a[0].color;b[0]<5&&b[1]<5&&b[2]<5&&(a[0].color=[0,0,0]);var d=a.length-1,e=a[d].color;e[0]>251&&e[1]>251&&e[2]>251&&(a[d].color=[255,255,255]);}},{quantize:i}}();return a.prototype.getColor=function(a,b){return this.getPalette(a,5,b)[0]},a.prototype.getPalette=function(a,c,e){(void 0===c||c<2||c>256)&&(c=10),(void 0===e||e<1)&&(e=10);for(var f,g,h,i,j=new b(a),k=j.getImageData(),l=k.data,m=j.getPixelCount(),n=[],o=0;o<m;o+=e){ f=4*o,g=l[f+0],h=l[f+1],i=l[f+2],l[f+3]>=125&&(g>250&&h>250&&i>250||n.push([g,h,i])); }var p=d.quantize(n,c),q=p?p.palette():null;return j.removeCanvas(),q},a.prototype.getColorFromUrl=function(a,b,c){sourceImage=document.createElement("img");var d=this;sourceImage.addEventListener("load",function(){b(d.getPalette(sourceImage,5,c)[0],a);}),sourceImage.src=a;},a.prototype.getImageData=function(a,b){xhr=new XMLHttpRequest,xhr.open("GET",a,!0),xhr.responseType="arraybuffer",xhr.onload=function(a){if(200==this.status){uInt8Array=new Uint8Array(this.response),c=uInt8Array.length,binaryString=new Array(c);for(var c=0;c<uInt8Array.length;c++){ binaryString[c]=String.fromCharCode(uInt8Array[c]); }data=binaryString.join(""),base64=window.btoa(data),b("data:image/png;base64,"+base64);}},xhr.send();},a.prototype.getColorAsync=function(a,b,c){var d=this;this.getImageData(a,function(a){sourceImage=document.createElement("img"),sourceImage.addEventListener("load",function(){b(d.getPalette(sourceImage,5,c)[0],this);}),sourceImage.src=a;});},a}();

/**
 * boxShadowPalette
 * @param {Object} opts
 * @param {String | NodeList} opts.imageTarget
 * @param {String | NodeList} opts.hoverTarget
 * @param {String} opts.attachBoxShadowTo
 * @param {String | Number} opts.opacity
 * @param {String} opts.opacitySecondary
 * @param {String} opts.colorIndexToUse
 * @param {String} opts.boxShadowTemplate - Provide a boxShadow template to apply. '0 2px 2px {color}, 3px 3px {colorSecondary}'
 */
function boxShadowPalette () {
  /**
   * Extract the colors from image tag or Background-image inline style
   * @param {HTMLElement} paletteTarget - The palette target to get the colors form
   * @return {Array} Returns an object with RGB colors
   * @private
   */
  function __extractColors (paletteTarget) {
    var image = paletteTarget;
    if (!paletteTarget) { throw Error('Target is not an element', paletteTarget) }
    // Our sample is not a img tag so we try to get its background image.
    if (paletteTarget.tagName !== 'IMG' && paletteTarget.style.backgroundImage) { Error('Tag provided is not an image and does not have a background-image style attached to it.'); }
    // Its not an IMG tag so we try to crate one under the hood.
    if (paletteTarget.tagName !== 'IMG') {
      image = new Image(paletteTarget.offsetWidth, paletteTarget.offsetHeight);
      image.src = paletteTarget.style.backgroundImage.replace('url(', '').replace(')', '').replace(/"/gi, '');
    }
    return new colorThief_min().getPalette(image, 3)
  }

  /**
   * Returns the rgba color from current color with applied opacity
   * @param {Array} color
   * @param {String | Number} opacity
   * @return {string}
   * @private
   */
  function __getRgbaColor (color, opacity) {
    var
      r = color[0],
      g = color[1],
      b = color[2];
    return ("rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")")
  }

  /**
   * Adds boxShadow to an element.
   * Required the color and the element to attach to
   * @param {Array} colors - Array of RGB Colors
   * @param {Object} obj - Object that holds the hoverTarget and image
   * @param {HTMLElement} obj.hoverTarget - Reference to the hoverTarget dom element
   * @param {HTMLElement} obj.image - Reference to the image dom element
   * @param {Array} obj.colors - Array of RGB Colors
   * @param {String} obj.rgbaColor - rgba transformed color with opacity in mind.
   * @param {String} obj.rgbaColorSecondary - rgba transformed color with secondary opacity in mind.
   * @private
   */
  function __addBoxShadowToElementData (colors, obj) {
    var ref = self.options;
    var opacity = ref.opacity;
    var opacitySecondary = ref.opacitySecondary;
    var boxShadowTemplate = ref.boxShadowTemplate;
    var color = colors[self.options.colorIndexToUse],
      rgbaColor = __getRgbaColor(color, opacity),
      rgbaColorSecondary = __getRgbaColor(color, opacitySecondary);
    var boxShadow;
    if (!boxShadowTemplate) {
      boxShadow = "0 2px 2px " + rgbaColor + ", 0 4px 4px " + rgbaColor + ", 0 8px 8px " + rgbaColor + ", 0 16px 16px " + rgbaColor + ", 0 32px 32px " + rgbaColorSecondary + ", 0 64px 64px " + rgbaColorSecondary;
    } else {
      boxShadow = boxShadowTemplate.replace('{color}', rgbaColor).replace('{colorSecondary}', rgbaColorSecondary);
    }
    obj.colors = colors;
    obj.rgbaColor = rgbaColor;
    obj.rgbaColorSecondary = rgbaColorSecondary;
    obj.boxShadow = boxShadow;
  }

  var isInitialized = false;

  var
    __defaults = {
      hoverTarget: Error('Please provide hoverTarget'),
      imageTarget: Error('Please provide ImageSrc'),
      attachBoxShadowTo: null,
      opacity: 0.2,
      opacitySecondary: 0.2,
      hoverClass: 'box-shadow-attached',
      colorIndexToUse: 0,
      enterEvent: 'mouseenter',
      leaveEvent: 'mouseleave',
      boxShadowTemplate: ''
    },
    self = {
      options: {},
      elements: [],
      /**
       * Gather all needed elements and push into an the `elements` array
       */
      collectElements: function collectElements () {
        var hoverTargetsCollection = self.options.hoverTarget;
        if (typeof hoverTargetsCollection === 'string') {
          hoverTargetsCollection = document.querySelectorAll(hoverTargetsCollection);
        }
        if (!hoverTargetsCollection.length) { return }
        for (var i = 0; i < hoverTargetsCollection.length; i++) {
          var
            element = hoverTargetsCollection[i],
            image = element.querySelector(self.options.imageTarget),
            obj = {
              hoverTarget: element,
              image: image
            };
          self.elements.push(obj);
        }
      },
      /**
       * Attaches boxShadow to the collection of Images
       */
      attachBoxShadowToCollection: function attachBoxShadowToCollection () {
        self.elements.forEach(function (obj) {
          var color = __extractColors(obj.image);
          __addBoxShadowToElementData(color, obj);
        });
      },
      /**
       * Removes the boxShadow from the collection of images
       * Used in the destroy method
       */
      removeBoxShadowFromCollection: function removeBoxShadowFromCollection () {
        self.elements.forEach(function (el) {
          delete el.hoverTarget.dataset.boxShadow;
        });
      },
      /**
       * Enter event listener callback
       * Adds the boxShadow to the target
       * @param event
       */
      enterHandler: function enterHandler (obj) {
        return function (event) {
          var target = event.currentTarget.querySelector(self.options.attachBoxShadowTo || self.options.imageTarget);
          if (target) {
            target.classList.add(self.options.hoverClass);
            target.style.boxShadow = obj.boxShadow;
          }
        }
      },
      /**
       * Leave Event listener callback
       * Removes the Box shadow from the target
       * @param event
       */
      leaveHandler: function leaveHandler (obj) {
        return function (event) {
          var target = event.currentTarget.querySelector(self.options.attachBoxShadowTo || self.options.imageTarget);
          if (target) {
            target.classList.remove(self.options.hoverClass);
            target.style.boxShadow = '';
          }
        }
      },
      /**
       * Attaches Event listeners to the hoverTargets
       */
      attachEventListeners: function attachEventListeners () {
        var ref = self.options;
        var enterEvent = ref.enterEvent;
        var leaveEvent = ref.leaveEvent;
        self.elements.forEach(function (obj) {
          obj.enterHandler = self.enterHandler(obj);
          obj.leaveHandler = self.leaveHandler(obj);
          obj.hoverTarget.addEventListener(enterEvent, obj.enterHandler, false);
          obj.hoverTarget.addEventListener(leaveEvent, obj.leaveHandler, false);
        });
      },
      /**
       * Detaches event listeners from hoverTargets
       */
      detachEventListeners: function detachEventListeners () {
        var ref = self.options;
        var enterEvent = ref.enterEvent;
        var leaveEvent = ref.leaveEvent;
        self.elements.forEach(function (obj) {
          obj.hoverTarget.removeEventListener(enterEvent, obj.enterHandler, false);
          obj.hoverTarget.removeEventListener(leaveEvent, obj.leaveHandler, false);
        });
      },
      /**
       * Initializes the whole boxShadowPalette.
       * Gets fired when creating boxShadowPalette in the first place
       */
      init: function init (opts) {
        if (isInitialized) { throw new Error('boxShadowPalette is already initialized') }

        self.options = Object.assign({}, __defaults, opts);

        self.collectElements();
        // Attach boxShadow's to all images
        self.attachBoxShadowToCollection();
        // Attach event listeners to all hovered elements.
        self.attachEventListeners();
        // Set isInitialized to true so we cant initialize again until destroyed
        isInitialized = true;

        return self
      },
      /**
       * Destroys the boxShadowPalette and cleans up after it self.
       */
      destroy: function destroy (removeDataAttr) {
        if ( removeDataAttr === void 0 ) removeDataAttr = true;

        self.detachEventListeners();
        removeDataAttr && self.removeBoxShadowFromCollection();
        self.elements = [];
        isInitialized = false;
      },
      /**
       * Reinitialize the plugin.
       * Destroy and then reinitialize it.
       */
      reInit: function reInit$1 () {
        self.destroy();
        self.init(self.options);
      },
      /**
       * Set new options. Merges then with the old ones.
       * Takes an options object and a reInit boolean.
       * reInit defaults to True
       * @param {Object} options - New options to override the old ones
       * @param {Boolean} reInit - Should the plugin reInit? Defaults to true
       */
      setOptions: function setOptions (options, reInit) {
        if ( reInit === void 0 ) reInit = true;

        self.options = Object.assign({}, self.options, options);
        reInit && self.reInit();
      },
      /**
       * Is the plugin initialized
       * @return {boolean}
       */
      isInitialized: function isInitialized$1 () {
        return isInitialized
      }
    };

  return self
}

return boxShadowPalette;

})));
