"use client"

import { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (e) => {
    if(successMsg){
      setSuccessMsg("")
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
    };

    if (!formData.name.trim()) {
      formIsValid = false;
      newErrors.name = 'Name is required';
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      newErrors.email = 'Invalid email address';
    }

    if (formData.password.length < 6) {
      formIsValid = false;
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formIsValid) {
      
      console.log('Form submitted:', formData);
      submitData()
    } else {
      setErrors(newErrors);
    }
  };

  const submitData = async()=>{
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:8738/api/users/register', {
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

      console.log('Form submitted:', formData);
      setSuccessMsg("Signup Successfull")
      // Reset form fields after successful submission if needed
      setFormData({
        name: '',
        email: '',
        password: '',
      });
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Register on Bidding Portal</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
        </div>
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
            {loading ? 'Wait...' : 'Sign Up'}
          </button>
        </div>
        {errorMsg && <p className="text-red-500 text-lg italic">{errorMsg}</p>}
        {successMsg && <p className="text-green-500 text-lg italic">{successMsg}</p>}
      </form>
    </div>
  );
};

export default Signup;
