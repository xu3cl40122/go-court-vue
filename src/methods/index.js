export function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms)
  })
}

export function isEmail(str) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(
    str
  )
}

export function isNull(val) {
  if (typeof val === "boolean")
    return false
  if (val === 0)
    return false
  if (Array.isArray(val) && val.length === 0)
    return true
  if (!val)
    return true

  return false
}
