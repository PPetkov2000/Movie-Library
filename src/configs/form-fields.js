export const REGISTER_FIELDS = (formData) => [
  {
    type: 'text',
    name: 'username',
    label: 'Username',
    autoComplete: 'username',
    placeholder: 'Enter Username',
    pattern: '^[A-Za-z0-9]{3,16}$',
    errorMessage: 'Username should be 3-16 characters long and should not include any special characters!',
    required: true,
  },
  {
    type: 'password',
    name: 'password',
    label: 'Password',
    autoComplete: 'password',
    placeholder: 'Enter Password',
    pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,30}$',
    errorMessage: 'Password should be 6-30 characters long and include at least 1 letter, 1 number, 1 special character!',
    required: true,
  },
  {
    type: 'password',
    name: 'confirmPassword',
    label: 'Confirm Password',
    autoComplete: 'confirm-password',
    placeholder: 'Enter Password again',
    pattern: formData.password,
    errorMessage: 'Passwords do not match!',
    required: true,
  },
]

export const LOGIN_FIELDS = (formData) => [
  {
    type: 'text',
    name: 'username',
    label: 'Username',
    autoComplete: 'username',
    placeholder: 'Enter Username',
    errorMessage: 'Username is required',
    required: true,
  },
  {
    type: 'password',
    name: 'password',
    label: 'Password',
    autoComplete: 'password',
    placeholder: 'Enter Password',
    errorMessage: 'Password is required',
    required: true,
  },
]
