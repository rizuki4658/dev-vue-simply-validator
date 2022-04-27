function requiredChecker (value) {
  if (!value) return true
  
  if (typeof value === 'string') {
    value = value.trim()
  }
  return value.length ? false : true
}

function Length(value) {
  if (Array.isArray(value)) return value.length

  if (typeof value === 'object') {
    return Object.keys(value).length
  }

  return String(value).length
}

function Regex(value, rules) {
  if (!value) return true
  const regex = rules.test(value)
  if (!regex) return true
  return false
}

function minLengthChecker(value, length) {
  if (!value) return true
  if (Length(value) <= length) return true
  return false
}

function maxLengthChecker(value, length) {
  if (!value) return true
  if (Length(value) >= length) return true
  return false
}

function alphabetChecker(value) {
  return Regex(value, /^[a-zA-Z]*$/)
}

function numberChecker(value) {
  return Regex(value, /^\d*(\.\d+)?$/)
}

function alphaNumericChecker(value) {
  return Regex(value, /^[a-zA-Z0-9]*$/)
}

function emailChecker(value) {
  const emailRegex = /^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i
  const result = emailRegex.test(value)
  if (!result) return true
  return false
}

export default {
  requiredChecker,
  minLengthChecker,
  maxLengthChecker,
  alphabetChecker,
  numberChecker,
  alphaNumericChecker,
  emailChecker
}