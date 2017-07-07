/*!
 * palettify v0.0.0 
 * (c) 2017 Dobromir Hristov
 * Released under the MIT License.
 */
(function (global, factory) {
     typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
     typeof define === 'function' && define.amd ? define(factory) :
     (global.palettify = factory());
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
 * @callback ResolverFn
 * @param {string} varName - variable name before being parsed.
 *        For example: {a.b.c} ->  'a.b.c', {  x  } -> 'x'
 * @param {Object} view - the view object that was passed to .render() function
 * @returns {string|number|boolean|Object|undefined} the value to be
 *        interpolated. If the function returns undefined, the value resolution
 *        algorithm will go ahead with the default behaviour (resolving the
 *        variable name from the provided object).
 */

var VAR_MATCH_REGEX = /\{\{\s*(.*?)\s*\}\}/g;

function _valueToString (value) {
  switch (typeof value) {
  case 'string':
  case 'number':
  case 'boolean':
    return value;
  case 'object':
    try {
      // null is an object but is falsy. Swallow it.
      return value === null ? '' : JSON.stringify(value);
    } catch (jsonError) {
      return '{...}';
    }
  default:
     // Anything else will be replaced with an empty string
     // For example: undefined, Symbol, etc.
    return '';
  }
}

/**
 * Recursively goes through an object trying to resolve a path.
 *
 * @param {Object} scope - The object to traverse (in each recursive call we dig into this object)
 * @param {string[]} path - An array of property names to traverse one-by-one
 * @param {number} [pathIndex=0] - The current index in the path array
 */
function _recursivePathResolver(scope, path, pathIndex) {
  if ( pathIndex === void 0 ) pathIndex = 0;

  if (typeof scope !== 'object' || scope === null || scope === undefined) {
    return '';
  }

  var varName = path[pathIndex];
  var value = scope[varName];

  if (pathIndex === path.length - 1) {
    // It's a leaf, return whatever it is
    return value;
  }

  return _recursivePathResolver(value, path, ++pathIndex);
}

function defaultResolver(varName, view) {
  return _recursivePathResolver(view, varName.split('.'));
}

/**
 * Replaces every {{variable}} inside the template with values provided by view.
 *
 * @param {string} template - The template containing one or more {{variableNames}} every variable
 *        names that is used in the template. If it's omitted, it'll be assumed an empty object.
 * @param {Object} [view={}] - An object containing values for every variable names that is used in
 *        the template. If it's omitted, it'll be set to an empty object essentially removing all
 *        {{varName}}s in the template.
 * @param {ResolverFn} [resolver] - An optional function that will be
 *        called for every {{varName}} to generate a value. If the resolver throws an error
 *        we'll proceed with the default value resolution algorithm (find the value from the view
 *        object).
 * @returns {string} - Template where its variable names replaced with
 *        corresponding values. If a value is not found or is invalid, it will
 *        be assumed empty string ''. If the value is an object itself, it'll
 *        be stringified by JSON.
 *        In case of a JSON stringify error the result will look like "{...}".
 */
function render (template, view, resolver) {
  if ( view === void 0 ) view = {};
  if ( resolver === void 0 ) resolver = defaultResolver;

  // don't touch the template if it is not a string
  if (typeof template !== 'string') {
    return template;
  }

  return template.replace(VAR_MATCH_REGEX, function (match, varName) {
    try {
      // defaultResolver never throws
      return _valueToString(resolver(varName, view));
    } catch (e) {
      // if your resolver throws, we proceed with the default resolver
      return _valueToString(defaultResolver(varName, view));
    }
  });
}

var render_1$1 = render;

var render_1 = render_1$1;

var index$2 = function isMergeableObject(value) {
	return isNonNullObject(value) && isNotSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isNotSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue !== '[object RegExp]'
		&& stringValue !== '[object Date]'
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && index$2(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (index$2(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (index$2(target)) {
        Object.keys(target).forEach(function(key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function(key) {
        if (!index$2(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var arrayMerge = options.arrayMerge || defaultArrayMerge;

    if (array) {
        return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

var index$2$1 = deepmerge;

/**
 * Creates a palettify instance
 * @module palettify
 * @return palettify
 */
function createPalettify () {
  var
    isInitialized = false,
    __selector = null;

  /**
   * @typedef {Object} paletteObj
   * @property {HTMLElement} eventTarget
   * @property {HTMLElement} styleTarget
   * @property {HTMLElement} image
   * @property {PaletteObject} palette
   * @property {Function} enterHandler
   * @property {Function} leaveHandler
   */

  /**
   * @typedef {Object} PaletteObject
   * @property {Array} original
   * @property {Array} rgb
   * @property {Array} rgba
   */

  var
    /**
     * Default options to extend
     * @typedef {Object} DefaultOptions
     * @property {String|HTMLElement} selector - The element that holds all your images and eventTargets.
     * @property {String} eventTarget - The event target to attach event listeners to
     * @property {String} image - The image to sample
     * @property {String} styleTarget - The element to apply styling to. Defaults to image
     * @property {Object} contrastColors - Light and Dark colors, based on brightness of each color in the palette
     * @property {String} contrastColors.light - Light inverted color
     * @property {String} contrastColors.dark - Dark inverted color
     * @property {String} activeClass - CSS class to apply on each enterEvent
     * @property {String} readyClass - CSS class to apply when palettify is ready
     * @property {Number} colorsToExtract - Colors to extract
     * @property {String | Array} enterEvent - Event or Array of events to apply listeners to for each enterCallback
     * @property {string | Array} leaveEvent - Event or Array of events to apply listeners to for each leaveCallback
     * @property {Object} styles - Collection of static and dynamic styles
     * @property {Array<number>} styles.opacities - Array of opacities
     * @property {Object} styles.static - Object containing valid css styles to apply to styleTarget on ready
     * @property {Object} styles.dynamic - Object containing valid css styles to apply to styleTarget on each enterEvent
     * @property {Function} beforeEnterCallback - Callback called before the enter event
     * @property {Function} afterEnterCallback - Callback called after the enter event
     * @property {Function} beforeLeaveCallback - Callback called before the leave event
     * @property {Function} afterLeaveCallback - Callback called after the enter event
     * @property {Function} onReadyCallback - Callback called after palettify is ready.
     */
    __defaults = {
      selector: Error('Please provide а selector in your options.'),
      eventTarget: Error('Please provide an eventTarget as a parent for your image in the options.'),
      image: Error('Please provide an image to sample.'),
      styleTarget: null,
      contrastColors: {
        light: '#fff',
        dark: '#000'
      },
      activeClass: 'palettify--active',
      readyClass: 'palettify--ready',
      colorsToExtract: 3,
      enterEvent: 'mouseenter',
      leaveEvent: 'mouseleave',
      styles: {
        opacities: [0.5, 0.5, 0.5],
        static: {},
        dynamic: {}
      },
      staticCallback: null,
      beforeEnterCallback: null,
      afterEnterCallback: null,
      beforeLeaveCallback: null,
      afterLeaveCallback: null,
      onReadyCallback: null
    },
    /**
     * @typedef {Object} palettify
     * @type Object
     * @property {DefaultOptions} options
     * @property {Array} data
     * @property {function} collectElements
     * @property {function} extractColorsAndAttachStyles
     * @property {function} generateEnterHandler
     * @property {function} generateLeaveHandler
     * @property {function} attachEventListeners
     * @property {function} detachEventListeners
     * @property {function} init
     * @property {function} destroy
     * @property {function} reInit
     * @property {function} cleanUp
     * @property {function} setOptions
     * @property {function} isInitialized
     */
    self = {
      /**
       * Palettify options
       * @name palettify#options
       * @type DefaultOptions
       */
      options: {},
      /**
       * Holds a collection of {@link paletteObj} objects.
       * @type Array<paletteObj>
       * @name palettify#data
       */
      data: [],
      /**
       * Gather all needed elements and push into an the {@see palettify#data}
       * @type function
       * @name palettify#collectElements
       */
      collectElements: function collectElements () {
        var
          eventTargetsCollection = '';
        __selector = typeof self.options.selector === 'string' ? document.querySelector(self.options.selector) : self.options.selector;
        if (!__selector) { throw new Error('Selector ' + self.options.selector + ' does not exist') }
        eventTargetsCollection = __selector.querySelectorAll(self.options.eventTarget);
        [].slice.call(eventTargetsCollection, 0).forEach(function (eventTarget) {
          var
            image = eventTarget.querySelector(self.options.image),
            styleTarget = self.options.styleTarget === true ? eventTarget : eventTarget.querySelector(self.options.styleTarget || self.options.image),
            // Create the main object it self.
            obj = {
              eventTarget: eventTarget,
              styleTarget: styleTarget,
              image: image,
              palette: {
                original: [],
                rgb: [],
                rgba: []
              }
            };
          self.data.push(obj);
        });
      },
      /**
       * Extracts colors and attaches static styles to each styleTarget {@see palettify#options.styleTarget}
       * Adds ready class and calls onReadyCallback when done
       * @function
       * @name palettify#extractColorsAndAttachStyles
       */
      extractColorsAndAttachStyles: function extractColorsAndAttachStyles (skipCallbacks) {
        if ( skipCallbacks === void 0 ) skipCallbacks = false;

        var promises = [];
        self.data.forEach(function (obj, index) {
          promises[index] = __extractColors(obj.image, self.options.colorsToExtract).then(function (colors) {
            obj.palette.original = colors;
            obj.palette.rgb = __opacifyPalette(obj.palette.original, []);
            obj.palette.rgba = __opacifyPalette(obj.palette.original, self.options.styles.opacities);
            obj.palette.contrastColors = __getInvertedColors(obj.palette.original, self.options.contrastColors);
            __attachStylesToElement({
              target: obj.styleTarget,
              styles: self.options.styles.static,
              palette: obj.palette,
              staticCallback: self.options.staticCallback,
              obj: obj
            });
          });
        });
        if (!skipCallbacks) {
          Promise.all(promises).then(function (values) {
            __selector.classList.add(self.options.readyClass);
            typeof self.options.onReadyCallback === 'function' && self.options.onReadyCallback.call(self, self);
          });
        }
      },
      /**
       * Generates the enter event listener callback
       * Attaches dynamicStyles {@see palettify#options.styles.dynamic} to styleTarget
       * @function
       * @param {paletteObj} obj
       * @name palettify#generateEnterHandler
       * @return function
       */
      generateEnterHandler: function generateEnterHandler (obj) {
        return function (event) {
          if (obj.styleTarget) {
            if (typeof self.options.beforeEnterCallback === 'function') { self.options.beforeEnterCallback.call(obj.styleTarget, obj, self.options, event); }
            obj.styleTarget.classList.add(self.options.activeClass);
            __attachStylesToElement({
              target: obj.styleTarget,
              styles: self.options.styles.dynamic,
              palette: obj.palette,
              obj: obj
            });
            if (typeof self.options.afterEnterCallback === 'function') { self.options.afterEnterCallback.call(obj.styleTarget, obj, self.options, event); }
          }
        }
      },
      /**
       * Generates the leave event listener callback
       * Removes all dynamicStyles
       * @function
       * @param {paletteObj} obj
       * @name palettify#generateLeaveHandler
       * @return function
       */
      generateLeaveHandler: function generateLeaveHandler (obj) {
        return function (event) {
          var target = obj.styleTarget;
          if (target) {
            if (typeof self.options.beforeLeaveCallback === 'function') { self.options.beforeLeaveCallback.call(obj.styleTarget, obj, self.options, event); }
            target.classList.remove(self.options.activeClass);
            __removeDynamicStylesFromElement(obj.styleTarget, self.options.styles.dynamic, self.options.styles.static, obj.palette);
            if (typeof self.options.afterLeaveCallback === 'function') { self.options.afterLeaveCallback.call(obj.styleTarget, obj, self.options, event); }
          }
        }
      },
      /**
       * Attaches Event listeners to the eventTargets
       * @function
       * @name palettify#attachEventListeners
       */
      attachEventListeners: function attachEventListeners () {
        var ref = self.options;
        var enterEvent = ref.enterEvent;
        var leaveEvent = ref.leaveEvent;

        enterEvent = !Array.isArray(enterEvent) ? [enterEvent] : enterEvent;
        leaveEvent = !Array.isArray(leaveEvent) ? [leaveEvent] : leaveEvent;

        self.data.forEach(function (obj) {
          obj.enterHandler = self.generateEnterHandler(obj);
          obj.leaveHandler = self.generateLeaveHandler(obj);

          enterEvent.forEach(function (event) {
            obj.eventTarget.addEventListener(event, obj.enterHandler, false);
          });
          leaveEvent.forEach(function (event) {
            obj.eventTarget.addEventListener(event, obj.leaveHandler, false);
          });

        });
      },
      /**
       * Detaches event listeners from eventTargets
       * @function
       * @name palettify#detachEventListeners
       */
      detachEventListeners: function detachEventListeners () {
        var ref = self.options;
        var enterEvent = ref.enterEvent;
        var leaveEvent = ref.leaveEvent;

        enterEvent = !Array.isArray(enterEvent) ? [enterEvent] : enterEvent;
        leaveEvent = !Array.isArray(leaveEvent) ? [leaveEvent] : leaveEvent;

        self.data.forEach(function (obj) {
          enterEvent.forEach(function (event) {
            obj.eventTarget.removeEventListener(event, obj.enterHandler, false);
          });
          leaveEvent.forEach(function (event) {
            obj.eventTarget.removeEventListener(event, obj.leaveHandler, false);
          });
        });
      },
      /**
       * Initializes the whole Palettify.
       * Gets fired when creating Palettify in the first place
       * @constructs
       * @param {DefaultOptions} opts - Options to pass to palettify
       * @name palettify#init
       * @return palettify
       */
      init: function init (opts) {
        if (isInitialized) { throw new Error('Palettify is already initialized') }

        __mergeOptions(opts);

        self.collectElements();
        // Collect colors and attach boxShadow's to all images
        self.extractColorsAndAttachStyles();
        // Attach event listeners to all hovered elements.
        self.attachEventListeners();
        // Set isInitialized to true so we cant initialize again until destroyed
        isInitialized = true;

        return self
      },
      /**
       * Destroys the Palettify and cleans up after it self.
       * @function
       * @name palettify#destroy
       * @param {Boolean} [cleanUp = true]
       */
      destroy: function destroy (cleanUp) {
        if ( cleanUp === void 0 ) cleanUp = true;

        self.detachEventListeners();
        cleanUp && self.cleanUp();
        self.data = [];
        isInitialized = false;
      },
      /**
       * Reinitialize the plugin.
       * Destroy and then reinitialize it.
       * @function
       * @name palettify#reInit
       */
      reInit: function reInit$1 () {
        self.destroy();
        self.init(self.options);
      },
      /**
       * Cleans up the dom after the plugin is destroyed. Removes all styles.static
       * @function
       * @name palettify#cleanUp
       */
      cleanUp: function cleanUp$1 () {
        self.data.forEach(function (obj) {
          for (var prop in self.options.styles.static) {
            if (self.options.styles.static.hasOwnProperty(prop)) {
              obj.styleTarget.style[prop] = '';
            }
          }
        });
      },
      /**
       * Set new options. Merges then with the old ones.
       * @param {Object} options - New options to override the old ones
       * @param {Boolean} [reInit = true] - Should the plugin reInit? Defaults to true
       * @function
       * @name palettify#setOptions
       */
      setOptions: function setOptions (options, reInit) {
        if ( reInit === void 0 ) reInit = true;

        self.options = Object.assign({}, self.options, options);
        reInit && self.reInit();
      },
      /**
       * Is the plugin initialized
       * @name palettify#isInitialized
       * @return {boolean}
       */
      isInitialized: function isInitialized$1 () {
        return isInitialized
      }
    };

  /**
   * Extract the colors from image tag or Background-image inline style
   * @param {HTMLElement} paletteTarget - The palette target to get the colors form
   * @param {Number} colorsToExtract - Number of colors to extract
   * @return {Promise} Returns promise when image is loaded with an array of RGB colors
   * @private
   */
  function __extractColors (paletteTarget, colorsToExtract) {
    var image = __sanitizeImage(paletteTarget);
    return new Promise(function (resolve) {
      if (!isImageLoaded(image)) {
        image.onload = function () {
          resolve(new colorThief_min().getPalette(image, colorsToExtract));
        };
      } else {
        resolve(new colorThief_min().getPalette(image, colorsToExtract));
      }
    })
  }

  /**
   * Transform all colors in the palette to RGBA colors using the supplied opacities in {@see palettify#options.opacities}
   * @param {Array} palette - Color palette of the current obj
   * @param {Array} opacities - Array of opacities for each color
   * @private
   */
  function __opacifyPalette (palette, opacities) {
    return palette.map(function (color, i) {
      var opacity = 1;
      if (Array.isArray(opacities) && opacities[i]) {
        opacity = opacities[i];
      }
      return __getRgbaColor(color, opacity)
    })
  }

  /**
   * Returns the rgba color with applied opacity
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
   * Adds styles to an element.
   * @param target
   * @param {Object} styles
   * @param palette
   * @param staticCallback
   * @param obj
   * @private
   */
  function __attachStylesToElement (ref) {
    var target = ref.target;
    var styles = ref.styles;
    var palette = ref.palette;
    var staticCallback = ref.staticCallback; if ( staticCallback === void 0 ) staticCallback = null;
    var obj = ref.obj;

    for (var prop in styles) {
      if (styles.hasOwnProperty(prop)) {
        target.style[prop] = render_1(styles[prop], palette);
      }
    }
    staticCallback && staticCallback.call(target, obj, self.options);
  }

  /**
   * Removes all dynamic styles from an element.
   * If the staticStyle has the same prop as dynamicStyle, we set the prop to be the static style.
   * @param {HTMLElement} target - The Target to remove styles from
   * @param {Object} dynamicStyles - Dynamic styles to apply
   * @param {Object} staticStyles - Static styles to apply
   * @param {Array} palette - Array of available palettes
   * @private
   */
  function __removeDynamicStylesFromElement (target, dynamicStyles, staticStyles, palette) {
    for (var prop in dynamicStyles) {
      if (dynamicStyles.hasOwnProperty(prop) && !staticStyles.hasOwnProperty(prop)) {
        target.style[prop] = '';
      } else if (staticStyles.hasOwnProperty(prop)) {
        target.style[prop] = render_1(staticStyles[prop], palette);
      }
    }
  }

  /**
   * Merges the options and throws errors where necessary
   * @param {DefaultOptions} options
   * @private
   */
  function __mergeOptions (options) {
    self.options = index$2$1(__defaults, options, {clone: true, arrayMerge: __arrayMerge});
    Object.keys(self.options).forEach(function (opt) {
      if (self.options[opt] instanceof Error) {
        throw self.options[opt]
      }
    });
  }

  function __getBrightness (rgb) {
    return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
  }

  function __isDark (color) {
    return __getBrightness(color) < 170 // 128 by default, but 170 gives better results
  }

  function __getInvertedColors (palette, colors) {
    return palette.map(function (color) { return __isDark(color) ? colors.light : colors.dark; })
  }

  function __getUrl (url) {
    var el = document.createElement('a');
    el.href = url;
    return el
  }

  function __isCORS (src) {
    return document.location.host !== __getUrl(src).host
  }

  function isImageLoaded (img) {
    if (!img.complete) { return false }

    if (typeof img.naturalWidth !== 'undefined' && img.naturalWidth === 0) {
      return false
    }
    // No other way of checking: assume it's ok.
    return true
  }

  function __sanitizeImage (imgElement) {
    var
      cachedImg = imgElement,
      isNotIMG = cachedImg.tagName !== 'IMG',
      src = isNotIMG ? imgElement.style.backgroundImage.replace('url(', '').replace(')', '').replace(/"/gi, '') : imgElement.src,
      isCors = __isCORS(src);

    if (!cachedImg) { throw Error('Target is not an element', cachedImg) }
    // Our sample is not a img tag so we try to get its background image.
    if (isNotIMG || (isCors && !cachedImg.crossOrigin)) {
      if (isNotIMG && !cachedImg.style.backgroundImage) { throw Error('Tag provided is not an image and does not have a background-image style attached to it.') }
      cachedImg = new Image(imgElement.offsetWidth, imgElement.offsetHeight);
      isCors && (cachedImg.crossOrigin = 'anonymous');
      cachedImg.src = src;
    }
    return cachedImg
  }

  function __arrayMerge (destArray, sourceArray, opts) {
    return sourceArray
  }

  return self
}

return createPalettify;

})));
