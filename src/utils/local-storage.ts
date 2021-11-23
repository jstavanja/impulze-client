export const getLocalStorageItem = (key: string) => {
  const localStorageValue = localStorage.getItem(key)

  if (!localStorageValue) {
    throw new Error(`Local storage value for key ${key} could not be found.`)
  }

  return JSON.parse(localStorageValue)
}

export const setLocalStorageItem = (key: string, value: unknown) => {
  if (!key) {
    throw new Error('You must provide a key under which you wish to store the value.')
  }

  if (typeof value === 'undefined') {
    throw new Error('You must provide a value that you wish to store.')
  }

  localStorage.setItem(key, JSON.stringify(value))
}

export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key)
}
