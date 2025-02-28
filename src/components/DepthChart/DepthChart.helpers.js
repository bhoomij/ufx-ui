// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = {
  37: 1,
  38: 1,
  39: 1,
  40: 1,
}

function preventDefault(e) {
  e.preventDefault()
}

// eslint-disable-next-line consistent-return
function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e)
    return false
  }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false
try {
  window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
    // eslint-disable-next-line getter-return
    get() { supportsPassive = true },
  }))
// eslint-disable-next-line no-empty
} catch (e) {}

const wheelOpt = supportsPassive ? { passive: false } : false
const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'

// call this to Disable
export function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false) // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt) // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt) // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false)
}

// call this to Enable
export function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false)
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt)
  window.removeEventListener('touchmove', preventDefault, wheelOpt)
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false)
}

export function dpi(value) {
  return value * (typeof window !== 'undefined' ? window.devicePixelRatio : 1)
}
