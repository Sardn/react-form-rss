import styles from '../styles/form.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { schema } from '../constants/constants';
import { countries } from '../constants/countries';
import { IForm, ISubmitForm } from '../types/types';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setData } from '../store/reducers/dataSlice';
import { convertImage } from '../utils/utils';
import { Link, useNavigate } from 'react-router-dom';

const HookForm = () => {
  const [imagePreview, setImagePreview] = useState<string>('');
  const dispatch = useAppDispatch();
  const actualData = useAppSelector((store) => store.data);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });
  const navigate = useNavigate();

  const onSubmitHandler = async (data: IForm) => {
    if (data.picture instanceof File) {
      const base64Image = await convertImage(data.picture);
      const newData: ISubmitForm = { ...data, picture: base64Image };
      const newArrData: ISubmitForm[] = [newData, ...actualData];
      dispatch(setData(newArrData));
      navigate('/');
    } else {
      console.error('Invalid picture type');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] instanceof File) {
      const file = event.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      setValue('picture', file);
      trigger('picture');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
      <Link to="/" className={styles.smallLink}>
        HOME
      </Link>
      <h1>Hook form</h1>

      <div className={styles.inputBlock}>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input className={styles.textInput} {...register('name')} id="name" />
        {errors.name && (
          <p className={`${styles.errorMessage} ${styles.show}`}>
            {errors.name.message}
          </p>
        )}
      </div>

      <div className={styles.inputBlock}>
        <label className={styles.label} htmlFor="age">
          Age
        </label>
        <input
          className={styles.textInput}
          {...register('age')}
          id="age"
          type="number"
        />
        {errors.age && (
          <p className={`${styles.errorMessage} ${styles.show}`}>
            {errors.age.message}
          </p>
        )}
      </div>

      <div className={styles.inputBlock}>
        <p className={styles.label}>Gender:</p>
        <div className={styles.radioBlock}>
          <div className={styles.maleBlock}>
            <input
              {...register('gender')}
              type="radio"
              id="male"
              name="gender"
              value="male"
            />
            <label className={styles.labelRadio} htmlFor="male">
              Male
            </label>
          </div>

          <div className={styles.maleBlock}>
            <input
              {...register('gender')}
              type="radio"
              id="female"
              name="gender"
              value="female"
            />
            <label className={styles.labelRadio} htmlFor="female">
              Female
            </label>
          </div>
        </div>
        {errors.gender && (
          <p className={`${styles.errorMessage} ${styles.show}`}>
            {errors.gender.message}
          </p>
        )}
      </div>

      <div className={styles.inputBlock}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input className={styles.textInput} {...register('email')} id="email" />
        {errors.email && (
          <p className={`${styles.errorMessage} ${styles.show}`}>
            {errors.email.message}
          </p>
        )}
      </div>

      <div className={styles.inputBlock}>
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          className={styles.textInput}
          {...register('password')}
          id="password"
        />
        {errors.password && (
          <p className={`${styles.errorMessage} ${styles.show}`}>
            {errors.password.message}
          </p>
        )}
      </div>

      <div className={styles.inputBlock}>
        <label className={styles.label} htmlFor="confirmPassword">
          Confirm password
        </label>
        <input
          className={styles.textInput}
          {...register('confirmPassword')}
          id="confirmPassword"
        />
        {errors.confirmPassword && (
          <p className={`${styles.errorMessage} ${styles.show}`}>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className={styles.inputBlock}>
        <label className={styles.label} htmlFor="country">
          Country
        </label>
        <div>
          <input
            className={styles.textInput}
            {...register('country')}
            list="countries"
            name="country"
            id="country"
          />
          <datalist id="countries">
            {countries.map((el, i) => {
              return <option key={i} value={el} />;
            })}
          </datalist>
        </div>
        {errors.country && (
          <p className={`${styles.errorMessage} ${styles.show}`}>
            {errors.country.message}
          </p>
        )}
      </div>

      <div className={styles.inputBlock}>
        <label className={styles.label} htmlFor="picture">
          Picture
        </label>
        <input
          id="picture"
          type="file"
          onChange={(e) => {
            handleFileChange(e);
          }}
        />
        {imagePreview && (
          <img className={styles.fileImage} src={imagePreview} alt="Preview" />
        )}
        {errors.picture && (
          <p className={`${styles.errorMessage}`}>{errors.picture.message}</p>
        )}
      </div>
      <div className={styles.inputBlock}>
        <label className={styles.checkboxLabel} htmlFor="accept">
          Agree to Terms and Conditions
        </label>
        <input {...register('accept')} id="accept" type="checkbox" />
        {errors.accept && (
          <p className={`${styles.errorMessage} ${styles.show}`}>
            {errors.accept.message}
          </p>
        )}
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
export default HookForm;
