export {debounce}

function debounce(fn, wait) {
  let timeout = null;
  return function() {
    if (!timeout) {
      fn.apply(this, arguments)
    }
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = undefined;
    }, wait);
  };
}