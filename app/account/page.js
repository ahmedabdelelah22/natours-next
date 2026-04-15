"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateMe, updatePassword } from "../_lib/api"; // ← import from api.js
import NavItem from "../_components/NavItem";
import toast from "react-hot-toast";
import { getUserPhotoUrl } from '../_lib/api';

export default function AccountPage() {
  const { user, setUser } = useAuth();

  // data form
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photo, setPhoto] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  // password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passLoading, setPassLoading] = useState(false);

  // ✅ handle update data
  const handleUpdateData = async (e) => {
    e.preventDefault();
    setDataLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      if (photo) formData.append('photo', photo);

      const updatedUser = await updateMe(formData); // ← from api.js
      setUser(updatedUser);                          // ← update context
      toast.success('Account updated successfully!');

    } catch (err) {
      toast.error(err.message);
    } finally {
      setDataLoading(false);
    }
  };

  // ✅ handle update password
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPassLoading(true);

    try {
      const data = await updatePassword(  // ← from api.js
        currentPassword,
        newPassword,
        confirmPassword
      );

      // save new token
      localStorage.setItem('jwt', data.token);
      toast.success('Password updated successfully!');

      // clear fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

    } catch (err) {
      toast.error(err.message);
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <main className="main">
      <div className="user-view">

        {/* SIDEBAR */}
        <nav className="user-view__menu">
          <ul className="side-nav">
            <NavItem link="#" text="Settings" icon="settings" active />
            <NavItem link="/my-tours" text="My bookings" icon="briefcase" />
            <NavItem link="#" text="My reviews" icon="star" />
            <NavItem link="#" text="Billing" icon="credit-card" />
          </ul>
          {user?.role === "admin" && (
            <div className="admin-nav">
              <h5 className="admin-nav__heading">Admin</h5>
              <ul className="side-nav">
                <NavItem link="#" text="Manage tours" icon="map" />
                <NavItem link="#" text="Manage users" icon="users" />
                <NavItem link="#" text="Manage reviews" icon="star" />
                <NavItem link="#" text="Manage bookings" icon="briefcase" />
              </ul>
            </div>
          )}
        </nav>

        <div className="user-view__content">

          {/* UPDATE DATA FORM */}
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Your account settings</h2>

            <form className="form form-user-data" onSubmit={handleUpdateData}>
              <div className="form__group">
                <label className="form__label" htmlFor="name">Name</label>
                <input
                  id="name"
                  className="form__input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form__group ma-bt-md">
                <label className="form__label" htmlFor="email">Email</label>
                <input
                  id="email"
                  className="form__input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form__group form__photo-upload">
                <img
                  className="form__user-photo"
                  src={getUserPhotoUrl(user?.photo)}
                  alt="User"
                />
                <input
                  className="form__upload"
                  type="file"
                  accept="image/*"
                  id="photo"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                <label htmlFor="photo">Choose new photo</label>
              </div>

              <div className="form__group right">
                <button className="btn btn--small btn--green" disabled={dataLoading}>
                  {dataLoading ? 'Saving...' : 'Save settings'}
                </button>
              </div>
            </form>
          </div>

          <div className="line">&nbsp;</div>

          {/* UPDATE PASSWORD FORM */}
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Password change</h2>

            <form className="form form-user-settings" onSubmit={handleUpdatePassword}>
              <div className="form__group">
                <label className="form__label" htmlFor="password-current">
                  Current password
                </label>
                <input
                  id="password-current"
                  className="form__input"
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  minLength="8"
                />
              </div>

              <div className="form__group">
                <label className="form__label" htmlFor="password-new">
                  New password
                </label>
                <input
                  id="password-new"
                  className="form__input"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength="8"
                />
              </div>

              <div className="form__group ma-bt-lg">
                <label className="form__label" htmlFor="password-confirm">
                  Confirm password
                </label>
                <input
                  id="password-confirm"
                  className="form__input"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength="8"
                />
              </div>

              <div className="form__group right">
                <button className="btn btn--small btn--green" disabled={passLoading}>
                  {passLoading ? 'Saving...' : 'Save password'}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}