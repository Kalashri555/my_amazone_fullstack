import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { login, getUser } from "../../services/userServices"; // Ensure getUser is defined here
import './LoginPage.css';
import { useLocation, Navigate } from 'react-router-dom';

const schema = z.object({
  email: z
    .string()
    .email({ message: "Please enter valid email address." })
    .min(3),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters." })
});

const LoginPage = () => {
  const [formError, setFormError] = useState("");
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      await login(formData);
      const { state } = location;
      window.location = state?.from || "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.message);
      } else {
        setFormError("Unexpected error. Please try again.");
      }
    }
  };

  if (getUser()) {
    return <Navigate to="/" />;
  }

  return (
    <section className="align_center form_page">
      <form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form_text_input"
              placeholder="Enter your email address"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form_text_input"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>

          {formError && <em className="form_error">{formError}</em>}

          <button type="submit" className="form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
