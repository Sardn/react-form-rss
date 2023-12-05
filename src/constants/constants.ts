import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is a required field')
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),
  age: yup
    .number()
    .required('Age is a required field')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  gender: yup
    .string()
    .oneOf(['male', 'female'])
    .required('Choose the gender, this is required'),
  country: yup.string().required('Country is a required field'),
  picture: yup
    .mixed()
    .required('Image is a required field')
    .test(
      'fileType',
      'Invalid file type, only JPEG and PNG are allowed',
      (value) => {
        const file = value as File;
        return !file || ['image/jpeg', 'image/png'].includes(file.type);
      }
    )
    .test('fileSize', 'File size is too large', (value) => {
      const file = value as File;
      return !file || file.size <= 1024 * 1024 * 2;
    }),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])/,
      'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  accept: yup.boolean().test({
    name: 'accepted',
    message: 'You must accept the terms and conditions',
    test: (value) => value === true,
  }),
});
