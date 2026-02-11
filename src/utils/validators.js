export const validators = {
  required: (value) => {
    return value.trim().length > 0
  },
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  },
  minLength: (value, length) => {
    return value.length >= length
  },
  maxLength: (value, length) => {
    return value.length <= length
  },
  numeric: (value) => {
    const numericRegex = /^[0-9]+$/
    return numericRegex.test(value)
  },
  url: (value) => {
    try {
      new URL(value)
      return true
    } catch (_) {
      return false
    }
  },
  password: (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(value)
  }
}