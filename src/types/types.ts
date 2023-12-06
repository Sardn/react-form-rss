export interface IForm {
  name?: string;
  age?: number;
  gender?: 'male' | 'female';
  country?: string;
  picture?: unknown | File;
  email?: string;
  password?: string;
  confirmPassword?: string;
  accept?: boolean;
}

export interface IUncontrolledForm extends IForm {
  picture?: File;
}

export interface ISubmitForm extends IForm {
  picture: string;
}

export type FormField =
  | 'name'
  | 'age'
  | 'gender'
  | 'country'
  | 'picture'
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'accept';
