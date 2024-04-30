'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutAction } from '@/redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { boolean } from 'yup';

const Navbar = () => {
  const { id } = useAppSelector((state) => state.user);

  const dispactch = useDispatch();

  const logout = () => {
    localStorage.removeItem('token');
    dispactch(logoutAction());
  };

  return (
    <nav className="sticky top-0 z-50 bg-transparent">
      <div className="container mx-auto px-4">
        <div className=" flex items-center justify-between py-2">
          <h1>LOGO</h1>

          {Boolean(id) ? (
            <div className="flex items-center gap-8">
              <h2>Home</h2>
              <h2>Write</h2>
              <h2>Profile</h2>
              <h2>Logout</h2>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <h2>Home</h2>
              <h2>Login</h2>
              <h2>Register</h2>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
