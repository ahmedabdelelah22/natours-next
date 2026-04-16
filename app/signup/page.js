"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext"; // ← from context, not api.js
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { signup } = useAuth(); // ← get login from context
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
  e.preventDefault();
  if (loading) return; // 🛑 prevent double call
  setLoading(true);

  try {
await signup(name, email, password, passwordConfirm);


toast.success("Account created successfully!");

  setTimeout(() => {
      router.replace("/login");
    }, 300);

  } catch (err) {
    console.error("SIGNUP ERROR:", err); // 👈 ADD THIS
    toast.error(err.message);
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
         Register for new account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <input
            type="text"
            placeholder="your name here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded"
            required
          />
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded"
            required
          />

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded"
            required
            minLength={8}
          />
          <input
            type="password"
            placeholder="••••••••"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="border p-3 rounded"
            required
            minLength={8}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            disabled={loading}
            className="bg-green-600 text-white py-3 rounded"
          >
            {loading ? "SignUp..." : "SignUp"}
          </button>

        </form>
      </div>
    </main>
  );
}