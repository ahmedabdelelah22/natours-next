const API = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import { loadStripe } from '@stripe/stripe-js';

export const getAllTours = async () => {
  const res = await fetch(`${API}/tours`, { cache: 'no-store' });
  const data = await res.json();
  return data.data;
};

export const getTour = async (id) => {
  const res = await fetch(`${API}/tours/${id}`);
  const data = await res.json();
  return data.data;
};
export async function signUp(name,email, password,passwordConfirm) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RAILWAY_URL}/api/v1/users/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // cookie is set here
    body: JSON.stringify({ name,email, password ,passwordConfirm}),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'signUp failed');
  return data;
}
export async function loginUser(email, password) {
  const res = await fetch(`${API}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // cookie is set here
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
}

// No token param — reads cookie automatically
export const getMe = async () => {
  try {

    const res = await fetch(`${API}/users/me`, {
      credentials: 'include', // sends cookie
      cache: 'no-store',
    });

    if (!res.ok) return null;
    const data = await res.json();

    return data.data.user;
  } catch(err) {

    return null;
  }
};

export const logoutUser = async () => {
  await fetch(`${API}/users/logout`, {
    method: 'GET',
    credentials: 'include', // clears cookie
  });
};

export const updateMe = async (formData) => {
  const res = await fetch(`${API}/users/updateMe`, {
    method: 'PATCH',
    credentials: 'include',
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Update failed');
  return data.data.user;
};

export const updatePassword = async (currentPassword, newPassword, passwordConfirm) => {
  const res = await fetch(`${API}/users/updateMyPassword`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ currentPassword, newPassword, passwordConfirm }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Password update failed');
  return data;
};

let stripePromise;
const getStripe = () => {
  if (!stripePromise) stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
  return stripePromise;
};

export const bookTour = async (tourId) => {
  const stripe = await getStripe();
  const res = await fetch(`${API}/bookings/checkout-session/${tourId}`, {
    credentials: 'include', // sends cookie instead of header
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  window.location.href = data.session.url;
};

export const getMyBookings = async () => {
  const res = await fetch(`${API}/bookings/my-tours`, {
    credentials: 'include',
    cache: 'no-store',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data.data.tours;
};

export const getUserPhotoUrl = (photo) => `${BASE_URL}/img/users/${photo}`;
export const getTourImageUrl = (image) => `${BASE_URL}/img/tours/${image}`;