import React, { useState } from 'react';
import FormInput from '../common/FormInput';
import FormPasswordInput from '../common/FormPasswordInput';
import FormSelect from '../common/FormSelect';

const SignupStep1 = ({ onNext, initialData, isLoading }) => {
  const [formData, setFormData] = useState({
    userType: initialData?.userType || '',
    email: initialData?.email || '',
    password: initialData?.password || '',
    confirmPassword: initialData?.confirmPassword || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.userType) {
      newErrors.userType = 'Please select your role';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      // Pass data to parent without confirmPassword
      const { confirmPassword, ...signupData } = formData;
      onNext(signupData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
        <p className="mt-1 text-sm text-gray-600">
          Set up your login credentials to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormSelect
          label="I am registering as"
          id="userType"
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          error={errors.userType}
          options={[
            { value: '', label: 'Select your role' },
            { value: 'insurance_company', label: 'Insurance Company' },
            { value: 'shipper', label: 'Shipper (Cargo Owner)' },
            { value: 'fleet_operator', label: 'Fleet Operator' },
            // { value: 'shipping_company', label: 'Shipping Company' },
            // { value: 'terminal_operator', label: 'Terminal Operator' },
          ]}
          required
        />

        <FormInput
          label="Email Address"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <FormPasswordInput
          label="Password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        <FormPasswordInput
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-base font-semibold text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 cursor-pointer shadow-lg shadow-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating Account...' : 'Continue'}
        </button>
      </form>
    </div>
  );
};

export default SignupStep1;
