function validatePassword(password) {
  const passFormat = /^(?=.[a-z])(?=.[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if(password.match(passFormat )) {
      return true;
  }
  return false;
}
module.exports = validatePassword;