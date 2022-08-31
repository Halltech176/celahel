export const Validate = (values) => {
  const patterns = {
    firstName: /([a-zA-Z0-9]){3,12}/,
    lastName: /([a-zA-Z0-9]){3,12}/,
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    password: /([A-Za-z0-9]{8,})/,
    number: /([0-9]){11}/,
  };
  const errors = {};

  // First name validation
  if (!values.firstName) {
    errors.firstName = "First name is required";
  } else if (!patterns.firstName.test(values.firstName)) {
    errors.firstName = "First name should be greater than 3";
  }

  //  Last Name validation

  if (!values.lastName) {
    errors.lastName = "Last name is required";
  } else if (!patterns.lastName.test(values.lastName)) {
    errors.lastName = "First name should be greater than 3";
  }

  //   email validation

  if (!values.email) {
    errors.email = "email is required";
  } else if (!patterns.email.test(values.email)) {
    errors.email = "please enter a valid email";
  }

  // Phone number validation

  if (!values.number) {
    errors.number = "number is required";
  } else if (!patterns.number.test(values.number)) {
    errors.number = "A valid number should be 11 digits";
  }

  //   Password validation

  if (!values.password) {
    errors.password = "password is required";
  } else if (!patterns.password.test(values.password)) {
    errors.password =
      "Password must not be less than 8 characters and must contains number and Alphabets";
  }
  return errors;
};
