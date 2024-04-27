export function validatePasswordStrength(password: string) {
  // Define regular expressions for number and special character
  const numberRegex = /\d/;
  const uppercaseRegex = /[A-Z]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  // Check if the password contains at least one number and one special character
  const hasNumber = numberRegex.test(password);
  const hasUppercase = uppercaseRegex.test(password);
  const hasSpecialChar = specialCharRegex.test(password);

  return hasNumber && hasUppercase && hasSpecialChar;
}
