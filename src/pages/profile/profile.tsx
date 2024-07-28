import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useState } from 'react';
import { updateUserThunk } from '../../features/user/userSlice';
import { RootState } from '../../services/store';
import { useAppDispatch, useAppSelector } from '../../services/hook';

export const Profile: FC = () => {
  const userState = useAppSelector((store: RootState) => store.user);
  let user = {
    name: '',
    email: ''
  };

  if (userState.user) {
    user = {
      name: userState.user.name,
      email: userState.user.email
    };
  }
  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const dispatch = useAppDispatch();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      updateUserThunk({
        email: formValue.email,
        name: formValue.name,
        password: formValue.password
      })
    );
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
