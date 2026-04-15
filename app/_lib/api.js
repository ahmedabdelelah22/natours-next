// lib/api.js
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

// 🔐 LOGIN (sets cookie from backend)
export async function loginUser(email, password) {
  const res = await fetch(`${API}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 🔥 THIS IS THE FIX
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
     
  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export const getMe = async (token) => {
  try {
    const res = await fetch(`${API}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`, // send token in header
      },
     cache: 'no-store', // always fresh, never cached
    });

    if (!res.ok) return null; // invalid token → return null

    const data = await res.json();
    console.log(data)
    return data.data.user;

  } catch (err) {
    console.log(err)
    return null; // network error → return null
  }
};

export const logoutUser = async () => {
  await fetch(`${API}/users/logout`, {
    method: 'GET',
    credentials: 'include',
  });
};


// ✅ Update name/email/photo
export const updateMe = async (formData) => {
  const token = localStorage.getItem('jwt');

  const res = await fetch(`${API}/users/updateMe`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      // ❌ don't set Content-Type for FormData
      // browser sets it automatically with boundary
    },
    body: formData, // FormData object
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Update failed');
  return data.data.user;
};

// ✅ Update password
export const updatePassword = async (currentPassword, newPassword, passwordConfirm) => {
  const token = localStorage.getItem('jwt');

  const res = await fetch(`${API}/users/updateMyPassword`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currentPassword,
      newPassword,
      passwordConfirm,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Password update failed');
  return data; // returns new token too
};

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
  }
  return stripePromise;
};

export const bookTour = async (tourId) => {
  try {
    const token = localStorage.getItem('jwt');
    const stripe = await getStripe();

    // 1) get checkout session from Railway backend
    const res = await fetch(`${API}/bookings/checkout-session/${tourId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, // ← send token
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

   
    // 2) ✅ new way — redirect using session.url directly
    window.location.href = data.session.url;

  } catch (err) {
    console.error(err);
    throw new Error(err.message || 'Booking failed');
  }
};
export const getMyBookings = async () => {
  const token = localStorage.getItem('jwt');

  const res = await fetch(`${API}/bookings/my-tours`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  console.log(data.data.bookings)
  return data.data.tours;
};

export const getUserPhotoUrl = (photo) =>
  `${BASE_URL}/img/users/${photo}`;

export const getTourImageUrl = (image) =>
  `${BASE_URL}/img/tours/${image}`;