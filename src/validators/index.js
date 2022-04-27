import Checker from './checker'

export const required = {
  $validator: Checker.requiredChecker,
  $message: 'This field is required',
  $params: {
    type: 'required'
  }
}

export const email = {
  $validator: Checker.emailChecker,
  $message: 'This is not a valid email address',
  $params: {
    type: 'email'
  }
}

export const minLength = (min) => ({
  $validator: Checker.minLengthChecker,
  $message: () => `This field should be at least ${min} character`,
  $params: {
    min,
    type: 'minLength'
  }
})

export const maxLength = (max) => ({
  $validator: Checker.maxLengthChecker,
  $message: () => `This field should be at least ${max} character`,
  $params: {
    max,
    type: 'maxLength'
  }
})

export const alphabet = {
  $validator: Checker.alphabetChecker,
  $message: 'This field is required',
  $params: {
    type: 'alphabet'
  }
}

export const numeric = {
  $validator: Checker.numberChecker,
  $message: 'This field is required',
  $params: {
    type: 'numeric'
  }
}

export const alphaNumeric = {
  $validator: Checker.alphaNumericChecker,
  $message: 'This field is required',
  $params: {
    type: 'alphaNumeric'
  }
}