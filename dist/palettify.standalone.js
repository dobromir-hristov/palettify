/*!
 * palettify v0.0.0 
 * (c) 2017 Dobromir Hristov
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@mariotacke/color-thief')) :
  typeof define === 'function' && define.amd ? define(['@mariotacke/color-thief'], factory) :
  (global.palettify = factory(global.colorThief));
}(this, (function (ColorThief) { 'use strict';

ColorThief = 'default' in ColorThief ? ColorThief['default'] : ColorThief;

/**
 * palettify
 * @param {Object} opts
 * @param {String | NodeList} opts.imageTarget
 * @param {String | NodeList} opts.hoverTarget
 * @param {String} opts.attachBoxShadowTo
 * @param {String | Number} opts.opacity
 * @param {String} opts.opacitySecondary
 * @param {String} opts.colorIndexToUse
 * @param {String} opts.boxShadowTemplate - Provide a boxShadow template to apply. '0 2px 2px {color}, 3px 3px {colorSecondary}'
 */
function palettify () {
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
    return new ColorThief().getPalette(image, 3)
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
       * Initializes the whole Palettify.
       * Gets fired when creating Palettify in the first place
       */
      init: function init (opts) {
        if (isInitialized) { throw new Error('Palettify is already initialized') }

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
       * Destroys the Palettify and cleans up after it self.
       */
      destroy: function destroy () {
        self.detachEventListeners();
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

return palettify;

})));
