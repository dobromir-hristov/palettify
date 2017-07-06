import ColorThief from '@mariotacke/color-thief'
import { render } from 'micromustache'
import merge from 'deepmerge'
/**
 * Creates a palettify instance
 * @module palettify
 * @return palettify
 */
function createPalettify () {
  let
    isInitialized = false,
    __selector = null

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

  const
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
      collectElements () {
        let
          eventTargetsCollection = ''
        __selector = typeof self.options.selector === 'string' ? document.querySelector(self.options.selector) : self.options.selector
        if (!__selector) { throw new Error('Selector does not exist') }
        eventTargetsCollection = __selector.querySelectorAll(self.options.eventTarget);
        [].slice.call(eventTargetsCollection, 0).forEach((eventTarget) => {
          const
            image = eventTarget.querySelector(self.options.image),
            styleTarget = eventTarget.querySelector(self.options.styleTarget || self.options.image),
            // Create the main object it self.
            obj = {
              eventTarget,
              styleTarget,
              image,
              palette: {
                original: [],
                rgb: [],
                rgba: []
              }
            }
          self.data.push(obj)
        })
      },
      /**
       * Extracts colors and attaches static styles to each styleTarget {@see palettify#options.styleTarget}
       * Adds ready class and calls onReadyCallback when done
       * @function
       * @name palettify#extractColorsAndAttachStyles
       */
      extractColorsAndAttachStyles (skipCallbacks = false) {
        let promises = []
        self.data.forEach((obj, index) => {
          promises[index] = __extractColors(obj.image, self.options.colorsToExtract).then(colors => {
            obj.palette.original = colors
            obj.palette.rgb = __opacifyPalette(obj.palette.original, [])
            obj.palette.rgba = __opacifyPalette(obj.palette.original, self.options.styles.opacities)
            obj.palette.contrastColors = __getInvertedColors(obj.palette.original, self.options.contrastColors)
            __attachStylesToElement(obj.styleTarget, self.options.styles.static, obj.palette, self.options.staticCallback)
          })
        })
        if (!skipCallbacks) {
          Promise.all(promises).then(values => {
            __selector.classList.add(self.options.readyClass)
            typeof self.options.onReadyCallback === 'function' && self.options.onReadyCallback.call(self, self)
          })
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
      generateEnterHandler (obj) {
        return (event) => {
          if (obj.styleTarget) {
            if (typeof self.options.beforeEnterCallback === 'function') self.options.beforeEnterCallback.call(obj.styleTarget, obj.palette, event, self.options)
            obj.styleTarget.classList.add(self.options.activeClass)
            __attachStylesToElement(obj.styleTarget, self.options.styles.dynamic, obj.palette)
            if (typeof self.options.afterEnterCallback === 'function') self.options.afterEnterCallback.call(obj.styleTarget, obj.palette, event, self.options)
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
      generateLeaveHandler (obj) {
        return (event) => {
          const target = obj.styleTarget
          if (target) {
            if (self.options.beforeLeaveCallback) self.options.beforeLeaveCallback.call(obj.styleTarget, obj.palette, event, self.options)
            target.classList.remove(self.options.activeClass)
            __removeDynamicStylesFromElement(obj.styleTarget, self.options.styles.dynamic, self.options.styles.static, obj.palette)
            if (self.options.afterLeaveCallback) self.options.afterLeaveCallback.call(obj.styleTarget, obj.palette, event, self.options)
          }
        }
      },
      /**
       * Attaches Event listeners to the eventTargets
       * @function
       * @name palettify#attachEventListeners
       */
      attachEventListeners () {
        let {enterEvent, leaveEvent} = self.options

        enterEvent = !Array.isArray(enterEvent) ? [enterEvent] : enterEvent
        leaveEvent = !Array.isArray(leaveEvent) ? [leaveEvent] : leaveEvent

        self.data.forEach(obj => {
          obj.enterHandler = self.generateEnterHandler(obj)
          obj.leaveHandler = self.generateLeaveHandler(obj)

          enterEvent.forEach((event) => {
            obj.eventTarget.addEventListener(event, obj.enterHandler, false)
          })
          leaveEvent.forEach((event) => {
            obj.eventTarget.addEventListener(event, obj.leaveHandler, false)
          })

        })
      },
      /**
       * Detaches event listeners from eventTargets
       * @function
       * @name palettify#detachEventListeners
       */
      detachEventListeners () {
        let
          {enterEvent, leaveEvent} = self.options

        enterEvent = !Array.isArray(enterEvent) ? [enterEvent] : enterEvent
        leaveEvent = !Array.isArray(leaveEvent) ? [leaveEvent] : leaveEvent

        self.data.forEach(obj => {
          enterEvent.forEach((event) => {
            obj.eventTarget.removeEventListener(event, obj.enterHandler, false)
          })
          leaveEvent.forEach((event) => {
            obj.eventTarget.removeEventListener(event, obj.leaveHandler, false)
          })
        })
      },
      /**
       * Initializes the whole Palettify.
       * Gets fired when creating Palettify in the first place
       * @constructs
       * @param {DefaultOptions} opts - Options to pass to palettify
       * @name palettify#init
       * @return palettify
       */
      init (opts) {
        if (isInitialized) throw new Error('Palettify is already initialized')

        __mergeOptions(opts)

        self.collectElements()
        // Collect colors and attach boxShadow's to all images
        self.extractColorsAndAttachStyles()
        // Attach event listeners to all hovered elements.
        self.attachEventListeners()
        // Set isInitialized to true so we cant initialize again until destroyed
        isInitialized = true

        return self
      },
      /**
       * Destroys the Palettify and cleans up after it self.
       * @function
       * @name palettify#destroy
       * @param {Boolean} [cleanUp = true]
       */
      destroy (cleanUp = true) {
        self.detachEventListeners()
        cleanUp && self.cleanUp()
        self.data = []
        isInitialized = false
      },
      /**
       * Reinitialize the plugin.
       * Destroy and then reinitialize it.
       * @function
       * @name palettify#reInit
       */
      reInit () {
        self.destroy()
        self.init(self.options)
      },
      /**
       * Cleans up the dom after the plugin is destroyed. Removes all styles.static
       * @function
       * @name palettify#cleanUp
       */
      cleanUp () {
        self.data.forEach(obj => {
          for (let prop in self.options.styles.static) {
            if (self.options.styles.static.hasOwnProperty(prop)) {
              obj.styleTarget.style[prop] = ''
            }
          }
        })
      },
      /**
       * Set new options. Merges then with the old ones.
       * @param {Object} options - New options to override the old ones
       * @param {Boolean} [reInit = true] - Should the plugin reInit? Defaults to true
       * @function
       * @name palettify#setOptions
       */
      setOptions (options, reInit = true) {
        self.options = Object.assign({}, self.options, options)
        reInit && self.reInit()
      },
      /**
       * Is the plugin initialized
       * @name palettify#isInitialized
       * @return {boolean}
       */
      isInitialized () {
        return isInitialized
      }
    }

  /**
   * Extract the colors from image tag or Background-image inline style
   * @param {HTMLElement} paletteTarget - The palette target to get the colors form
   * @param {Number} colorsToExtract - Number of colors to extract
   * @return {Promise} Returns promise when image is loaded with an array of RGB colors
   * @private
   */
  function __extractColors (paletteTarget, colorsToExtract) {
    let image = __sanitizeImage(paletteTarget)
    return new Promise(resolve => {
      if (!isImageLoaded(image)) {
        image.onload = function () {
          resolve(new ColorThief().getPalette(image, colorsToExtract))
        }
      } else {
        resolve(new ColorThief().getPalette(image, colorsToExtract))
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
    return palette.map((color, i) => {
      let opacity = 1
      if (Array.isArray(opacities) && opacities[i]) {
        opacity = opacities[i]
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
    const
      r = color[0],
      g = color[1],
      b = color[2]
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  /**
   * Adds styles to an element.
   * @param target
   * @param {Object} styles
   * @param palette
   * @param cb
   * @private
   */
  function __attachStylesToElement (target, styles, palette, cb = null) {
    for (const prop in styles) {
      if (styles.hasOwnProperty(prop)) {
        target.style[prop] = render(styles[prop], palette)
      }
    }
    cb && cb.call(target, target, styles, palette)
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
    for (const prop in dynamicStyles) {
      if (dynamicStyles.hasOwnProperty(prop) && !staticStyles.hasOwnProperty(prop)) {
        target.style[prop] = ''
      } else if (staticStyles.hasOwnProperty(prop)) {
        target.style[prop] = render(staticStyles[prop], palette)
      }
    }
  }

  /**
   * Merges the options and throws errors where necessary
   * @param {DefaultOptions} options
   * @private
   */
  function __mergeOptions (options) {
    self.options = merge(__defaults, options, {clone: true, arrayMerge: __arrayMerge})
    Object.keys(self.options).forEach(opt => {
      if (self.options[opt] instanceof Error) {
        throw self.options[opt]
      }
    })
  }

  function __getBrightness (rgb) {
    return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
  }

  function __isDark (color) {
    return __getBrightness(color) < 128
  }

  function __getInvertedColors (palette, colors) {
    return palette.map(color => __isDark(color) ? colors.light : colors.dark)
  }

  function __getUrl (url) {
    const el = document.createElement('a')
    el.href = url
    return el
  }

  function __isCORS (src) {
    return document.location.host !== __getUrl(src).host
  }

  function isImageLoaded (img) {
    if (!img.complete) return false

    if (typeof img.naturalWidth !== 'undefined' && img.naturalWidth === 0) {
      return false
    }
    // No other way of checking: assume it's ok.
    return true
  }

  function __sanitizeImage (imgElement) {
    let
      cachedImg = imgElement,
      isNotIMG = cachedImg.tagName !== 'IMG',
      src = isNotIMG ? imgElement.style.backgroundImage.replace('url(', '').replace(')', '').replace(/"/gi, '') : imgElement.src,
      isCors = __isCORS(src)

    if (!cachedImg) throw Error('Target is not an element', cachedImg)
    // Our sample is not a img tag so we try to get its background image.
    if (isNotIMG || (isCors && !cachedImg.crossOrigin)) {
      if (isNotIMG && !cachedImg.style.backgroundImage) throw Error('Tag provided is not an image and does not have a background-image style attached to it.')
      cachedImg = new Image(imgElement.offsetWidth, imgElement.offsetHeight)
      isCors && (cachedImg.crossOrigin = 'anonymous')
      cachedImg.src = src
    }
    return cachedImg
  }

  function __arrayMerge (destArray, sourceArray, opts) {
    return sourceArray
  }

  return self
}

export default createPalettify
