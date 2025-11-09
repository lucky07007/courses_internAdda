// components/Shared.js
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../lib/firebase';
import { useRouter } from 'next/router';

// 1. Navigation Bar Component
export const Navbar = () => {
  const { user, logout, loading } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-indigo-600 text-white sticky top-0 z-10 shadow-md">
      <Link href="/" className="text-xl font-bold">
        Course Platform
      </Link>
      <div>
        {!loading && (
          user ? (
            <>
              <Link href="/dashboard" className="mr-4 hover:underline">
                Dashboard
              </Link>
              <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="mr-4 hover:underline">
                Login
              </Link>
              <Link href="/signup" className="hover:underline">
                Signup
              </Link>
            </>
          )
        )}
      </div>
    </nav>
  );
};

// 2. Authentication Form Component
export const AuthForm = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const router = useRouter();
  const isLogin = type === 'login';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      router.push('/'); // Redirect to home/dashboard on success
    } catch (err) {
      setError(err.message.replace('Firebase:', '').trim());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100">
      <div className="p-8 bg-white rounded shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center capitalize">{type}</h1>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border rounded mt-1" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 border rounded mt-1" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"} 
          <Link href={isLogin ? "/signup" : "/login"} className="text-indigo-600 hover:underline ml-1">
            {isLogin ? "Sign Up" : "Log In"}
          </Link>
        </p>
      </div>
    </div>
  );
};
