export function setItem (key, value) {
    window.localStorage.setItem(key,JSON.stringify(value));
}

export function getItem (key) {
  return JSON.parse(window.localStorage.getItem(key));
}

export function removeItem (key) {
    window.localStorage.removeItem(key);
}

export function clear() {
    window.localStorage.clear();
}
