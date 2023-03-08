function emailValidator(email: string): boolean {
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
  return regex.test(email)
}

function usernameValidator(username: string): boolean {
  const regex = /^[\w]+(\.[\w]+)?$/
  return regex.test(username)
}

function passwordLengthValidator(password: string): boolean {
  return password.length >= 8
}

function compareFieldsValidator(password: string, passwordConfirmation: string): boolean {
  return password === passwordConfirmation
}

export default {
  emailValidator,
  usernameValidator,
  passwordLengthValidator,
  compareFieldsValidator
}
