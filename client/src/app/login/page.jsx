"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext';

const Login = () => {
  const router = useRouter();
  const { user, setUser } = useUser();

  //redirect to homeif user already logged in
  useEffect(() => {
    if (user && user.name) {
      router.push("/");
    }
  }, [user]);
  

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear error message on input change
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: '',
    };

    if (!formData.email.trim()) {
      isValid = false;
      newErrors.email = 'Email is required';
    }

    if (!formData.password.trim()) {
      isValid = false;
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:8738/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userDetails', JSON.stringify(data.user));
      console.log('Login successful:', data);
      setUser(data.user)
      // Redirect to "/" after successful login
      router.push('/');
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login to Bidding Portal</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? 'Wait...' : 'Login'}
          </button>
        </div>
        {errorMsg && <p className="text-red-500 text-lg italic">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default Login;
