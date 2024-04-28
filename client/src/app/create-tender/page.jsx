"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

const CreateTender = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push("/");
    }
  }, [user]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
    bufferTimeInMinutes: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    if(successMsg || errorMsg){
        setErrorMsg("")
        setSuccessMsg("")
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
        ...errors,
        [e.target.name]: "",
      });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tender Name is required";
      valid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Tender Description is required";
      valid = false;
    }

    if (!formData.startTime.trim()) {
      newErrors.startTime = "Start Time is required";
      valid = false;
    }

    if (!formData.endTime.trim()) {
      newErrors.endTime = "End Time is required";
      valid = false;
    }

    if (formData.startTime >= formData.endTime) {
      newErrors.endTime = "End Time must be after Start Time";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
        console.log("Form submitted:", formData);

        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");
  
        try {
          const response = await fetch('http://localhost:8738/api/tender/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}` 
            },
            body: JSON.stringify(formData),
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
          }
          setSuccessMsg("Tender created successfully");
          setFormData({
            name: "",
            description: "",
            startTime: "",
            endTime: "",
            bufferTimeInMinutes: "",
          });
          router.push("/")
        } catch (error) {
          setErrorMsg(error.message);
        } finally {
          setLoading(false);
        }
      } 
  };

  return (
    <div className="container mx-auto py-4">
    <h1 className="text-2xl font-bold mb-4">Create Tender</h1>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Tender Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`border ${errors.name ? "border-red-500" : "border-gray-300"} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        />
        {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Tender Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className={`border ${errors.description ? "border-red-500" : "border-gray-300"} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        ></textarea>
        {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="startTime" className="block text-gray-700 font-bold mb-2">Start Time</label>
        <input
          type="datetime-local"
          id="startTime"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          className={`border ${errors.startTime ? "border-red-500" : "border-gray-300"} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        />
        {errors.startTime && <p className="text-red-500 text-xs italic">{errors.startTime}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="endTime" className="block text-gray-700 font-bold mb-2">End Time</label>
        <input
          type="datetime-local"
          id="endTime"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          className={`border ${errors.endTime ? "border-red-500" : "border-gray-300"} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        />
        {errors.endTime && <p className="text-red-500 text-xs italic">{errors.endTime}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="bufferTimeInMinutes" className="block text-gray-700 font-bold mb-2">Buffer Time (in Minutes)</label>
        <input
          type="number"
          id="bufferTimeInMinutes"
          name="bufferTimeInMinutes"
          value={formData.bufferTimeInMinutes}
          onChange={handleChange}
          className={`border ${errors.bufferTimeInMinutes ? "border-red-500" : "border-gray-300"} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        />
        {errors.bufferTimeInMinutes && <p className="text-red-500 text-xs italic">{errors.bufferTimeInMinutes}</p>}
      </div>
      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Tender'}
        </button>
      </div>
      {errorMsg && <p className="text-red-500 text-lg italic">{errorMsg}</p>}
      {successMsg && <p className="text-green-500 text-lg italic">{successMsg}</p>}
    </form>
  </div>
);
};

export default CreateTender;
