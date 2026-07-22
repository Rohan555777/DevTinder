const validator = require("validator");

function validation(value) {
  let { firstName, lastName, gender, age, password, emailId } = value;
  if (age < 18) {
    throw new Error("Use valid Age");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Use valid Email ");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("use Strong Password ");
  }
}

module.exports = { validation };
