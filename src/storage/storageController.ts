export function createStorage(key: string, storage = window.localStorage) {
  function getStorage() {
    const item = storage.getItem(key)

    if (item) {
      return JSON.parse(item)
    }

    return []
  }

  function setStorage<T>(value: T) {
    storage.setItem(key, JSON.stringify(value))
  }

  function setTargetStorage<T>(targetId: string, newItem: T) {
    const items = getStorage()
    const index = items.findIndex((item) => item.id === targetId)
    const updatedItem = { ...newItem, id: targetId }

    if (index !== -1) {
      items[index] = { ...items[index], ...updatedItem }
    } else {
      items.push(updatedItem)
    }

    setStorage(items)
  }

  function removeStorage() {
    storage.removeItem(key)
  }

  function clearStorage() {
    storage.clear()
  }

  function findItem(id: string) {
    const items = getStorage()
    return items.find((item) => item.id === id) || null
  }

  return {
    get: getStorage,
    set: setStorage,
    remove: removeStorage,
    clear: clearStorage,
    find: findItem,
    setTarget: setTargetStorage,
  }
}
