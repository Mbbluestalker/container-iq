import React, { useState } from 'react';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';

const SignupStep3 = ({ onNext, onBack, initialData, isLoading }) => {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    jobTitle: initialData?.jobTitle || '',
    govId: initialData?.govId || '',
    govIdType: initialData?.govIdType || 'NIN',
    contactPhone: initialData?.contactPhone || '',
    contactEmail: initialData?.contactEmail || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }

    if (!formData.govId.trim()) {
      newErrors.govId = 'Government ID is required';
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.contactPhone)) {
      newErrors.contactPhone = 'Invalid phone number format';
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Email is invalid';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      onNext(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
        <p className="mt-1 text-sm text-gray-600">
          Tell us about the primary contact person
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="First Name"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
          />

          <FormInput
            label="Last Name"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
          />
        </div>

        <FormInput
          label="Job Title"
          id="jobTitle"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          error={errors.jobTitle}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <FormSelect
            label="Government ID Type"
            id="govIdType"
            name="govIdType"
            value={formData.govIdType}
            onChange={handleChange}
            options={[
              { value: 'NIN', label: 'NIN' },
              { value: 'Passport', label: 'Passport' },
            ]}
          />

          <FormInput
            label="ID Number"
            id="govId"
            name="govId"
            value={formData.govId}
            onChange={handleChange}
            error={errors.govId}
            required
          />
        </div>

        <FormInput
          label="Phone Number (WhatsApp enabled)"
          id="contactPhone"
          name="contactPhone"
          type="tel"
          value={formData.contactPhone}
          onChange={handleChange}
          error={errors.contactPhone}
          placeholder="+234 xxx xxx xxxx"
          required
        />

        <FormInput
          label="Official Email Address"
          id="contactEmail"
          name="contactEmail"
          type="email"
          value={formData.contactEmail}
          onChange={handleChange}
          error={errors.contactEmail}
          required
        />

        <div className="flex gap-4 pt-2">
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 py-3 px-4 border border-transparent rounded-lg text-base font-semibold text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 cursor-pointer shadow-lg shadow-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupStep3;
