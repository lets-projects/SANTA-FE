const validateEmail = (email: string) => {
  //eslint-disable-next-line
  const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
  return emailPattern.test(email);
};

const validatePassword = (password: string) => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordPattern.test(password);
};

const validatePhoneNumber = (phoneNumber: string) => {
  if (!/^\d+$/.test(phoneNumber) || phoneNumber.length !== 11) {
    return false;
  }
  return true;
};

export { validateEmail, validatePassword, validatePhoneNumber };
