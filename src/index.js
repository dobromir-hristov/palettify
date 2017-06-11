import ColorThief from '@mariotacke/color-thief'
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
    let image = paletteTarget
    if (!paletteTarget) throw Error('Target is not an element', paletteTarget)
    // Our sample is not a img tag so we try to get its background image.
    if (paletteTarget.tagName !== 'IMG' && paletteTarget.style.backgroundImage) Error('Tag provided is not an image and does not have a background-image style attached to it.')
    // Its not an IMG tag so we try to crate one under the hood.
    if (paletteTarget.tagName !== 'IMG') {
      image = new Image(paletteTarget.offsetWidth, paletteTarget.offsetHeight)
      image.src = paletteTarget.style.backgroundImage.replace('url(', '').replace(')', '').replace(/"/gi, '')
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
    const
      r = color[0],
      g = color[1],
      b = color[2]
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
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
    const
      {opacity, opacitySecondary, boxShadowTemplate} = self.options,
      color = colors[self.options.colorIndexToUse],
      rgbaColor = __getRgbaColor(color, opacity),
      rgbaColorSecondary = __getRgbaColor(color, opacitySecondary)
    let boxShadow
    if (!boxShadowTemplate) {
      boxShadow = `0 2px 2px ${rgbaColor}, 0 4px 4px ${rgbaColor}, 0 8px 8px ${rgbaColor}, 0 16px 16px ${rgbaColor}, 0 32px 32px ${rgbaColorSecondary}, 0 64px 64px ${rgbaColorSecondary}`
    } else {
      boxShadow = boxShadowTemplate.replace('{color}', rgbaColor).replace('{colorSecondary}', rgbaColorSecondary)
    }
    obj.colors = colors
    obj.rgbaColor = rgbaColor
    obj.rgbaColorSecondary = rgbaColorSecondary
    obj.boxShadow = boxShadow
  }

  let isInitialized = false

  const
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
      collectElements () {
        let hoverTargetsCollection = self.options.hoverTarget
        if (typeof hoverTargetsCollection === 'string') {
          hoverTargetsCollection = document.querySelectorAll(hoverTargetsCollection)
        }
        if (!hoverTargetsCollection.length) return
        for (let i = 0; i < hoverTargetsCollection.length; i++) {
          const
            element = hoverTargetsCollection[i],
            image = element.querySelector(self.options.imageTarget),
            obj = {
              hoverTarget: element,
              image
            }
          self.elements.push(obj)
        }
      },
      /**
       * Attaches boxShadow to the collection of Images
       */
      attachBoxShadowToCollection () {
        self.elements.forEach(obj => {
          const color = __extractColors(obj.image)
          __addBoxShadowToElementData(color, obj)
        })
      },
      /**
       * Enter event listener callback
       * Adds the boxShadow to the target
       * @param event
       */
      enterHandler (obj) {
        return (event) => {
          const target = event.currentTarget.querySelector(self.options.attachBoxShadowTo || self.options.imageTarget)
          if (target) {
            target.classList.add(self.options.hoverClass)
            target.style.boxShadow = obj.boxShadow
          }
        }
      },
      /**
       * Leave Event listener callback
       * Removes the Box shadow from the target
       * @param event
       */
      leaveHandler (obj) {
        return (event) => {
          const target = event.currentTarget.querySelector(self.options.attachBoxShadowTo || self.options.imageTarget)
          if (target) {
            target.classList.remove(self.options.hoverClass)
            target.style.boxShadow = ''
          }
        }
      },
      /**
       * Attaches Event listeners to the hoverTargets
       */
      attachEventListeners () {
        const {enterEvent, leaveEvent} = self.options
        self.elements.forEach(obj => {
          obj.enterHandler = self.enterHandler(obj)
          obj.leaveHandler = self.leaveHandler(obj)
          obj.hoverTarget.addEventListener(enterEvent, obj.enterHandler, false)
          obj.hoverTarget.addEventListener(leaveEvent, obj.leaveHandler, false)
        })
      },
      /**
       * Detaches event listeners from hoverTargets
       */
      detachEventListeners () {
        const
          {enterEvent, leaveEvent} = self.options
        self.elements.forEach(obj => {
          obj.hoverTarget.removeEventListener(enterEvent, obj.enterHandler, false)
          obj.hoverTarget.removeEventListener(leaveEvent, obj.leaveHandler, false)
        })
      },
      /**
       * Initializes the whole boxShadowPalette.
       * Gets fired when creating boxShadowPalette in the first place
       */
      init (opts) {
        if (isInitialized) throw new Error('boxShadowPalette is already initialized')

        self.options = Object.assign({}, __defaults, opts)

        self.collectElements()
        // Attach boxShadow's to all images
        self.attachBoxShadowToCollection()
        // Attach event listeners to all hovered elements.
        self.attachEventListeners()
        // Set isInitialized to true so we cant initialize again until destroyed
        isInitialized = true

        return self
      },
      /**
       * Destroys the boxShadowPalette and cleans up after it self.
       */
      destroy () {
        self.detachEventListeners()
        self.elements = []
        isInitialized = false
      },
      /**
       * Reinitialize the plugin.
       * Destroy and then reinitialize it.
       */
      reInit () {
        self.destroy()
        self.init(self.options)
      },
      /**
       * Set new options. Merges then with the old ones.
       * Takes an options object and a reInit boolean.
       * reInit defaults to True
       * @param {Object} options - New options to override the old ones
       * @param {Boolean} reInit - Should the plugin reInit? Defaults to true
       */
      setOptions (options, reInit = true) {
        self.options = Object.assign({}, self.options, options)
        reInit && self.reInit()
      },
      /**
       * Is the plugin initialized
       * @return {boolean}
       */
      isInitialized () {
        return isInitialized
      }
    }

  return self
}

export default boxShadowPalette
