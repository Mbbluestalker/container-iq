import React, { useState, useEffect } from 'react';
import { useGetInsuranceDetailsQuery, useSubmitInsurancePolicyMutation } from '../../../services/api';
import { useAlert } from '../../../context/AlertContext';
import FormMultiSelect from '../../common/FormMultiSelect';

const InsuranceStep3 = ({ onNext, onBack, initialData }) => {
  const [formData, setFormData] = useState({
    policyTypes: initialData?.policyTypes || [],
  });

  const [errors, setErrors] = useState({});
  const { data: insuranceData, isLoading: isFetching } = useGetInsuranceDetailsQuery();
  const [submitInsurancePolicy, { isLoading: isSubmitting }] = useSubmitInsurancePolicyMutation();
  const { showSuccess, showError } = useAlert();

  // Prefill form with existing data from API
  useEffect(() => {
    if (insuranceData?.data?.policyTypeIssued) {
      setFormData({
        policyTypes: insuranceData.data.policyTypeIssued || [],
      });
    }
  }, [insuranceData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (formData.policyTypes.length === 0) {
      newErrors.policyTypes = 'Please select at least one policy type';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      try {
        // Transform form data to match API payload structure
        const payload = {
          policyTypeIssued: formData.policyTypes,
        };

        // Submit to API
        await submitInsurancePolicy(payload).unwrap();

        // Show success message
        showSuccess('Policy types saved successfully!');

        // Pass data to parent and move to next step
        onNext(formData);
      } catch (error) {
        // Handle API errors
        showError(error?.data?.message || 'Failed to save policy types. Please try again.');
        console.error('Insurance policy submission error:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const policyTypeOptions = [
    // Marine / Cargo Insurance
    { value: 'all_risk_cargo', label: 'All-Risk Cargo Insurance', description: 'Covers all physical loss or damage except specific exclusions' },
    { value: 'named_perils_cargo', label: 'Named-Perils Cargo Insurance', description: 'Covers only specific risks like fire, theft, collision, or weather' },
    { value: 'import_export_open_cover', label: 'Import / Export Open Cover', description: 'Annual coverage for multiple shipments under one policy' },
    { value: 'single_shipment_cover', label: 'Single-Shipment Cover', description: 'Insurance for one specific shipment' },
    { value: 'container_insurance', label: 'Container Insurance', description: 'Covers containers themselves against loss or damage' },
    { value: 'breakbulk_insurance', label: 'Breakbulk Insurance', description: 'For goods shipped outside containers' },

    // Fleet Motor Insurance
    { value: 'comprehensive_motor_fleet', label: 'Comprehensive Motor Fleet Insurance', description: 'Covers vehicles for accident, theft, fire, and third-party damage' },
    { value: 'third_party_liability', label: 'Third-Party Liability (TPL)', description: 'Covers damages/injuries caused to third parties' },
    { value: 'goods_in_transit', label: 'Goods-in-Transit Insurance', description: 'Protects cargo while being transported by fleet vehicles' },
    { value: 'specialized_fleet', label: 'Specialized Fleet Policies', description: 'For tankers, refrigerated trucks, or high-value fleets' },

    // Liability & Third-Party Coverage
    { value: 'third_party_cargo_liability', label: 'Third-Party Cargo Liability', description: 'Liability for damage to cargo belonging to someone else' },
    { value: 'public_liability', label: 'Public / Third-Party Liability', description: 'Injury or damage to people or property caused by fleet operations' },
    { value: 'environmental_liability', label: 'Environmental / Pollution Liability', description: 'For spills, leaks, or contamination during transport' },

    // Reinsurance Policies
    { value: 'proportional_reinsurance', label: 'Proportional / Facultative Reinsurance', description: 'For high-value cargo or fleets' },
    { value: 'excess_of_loss', label: 'Excess-of-Loss Reinsurance', description: 'Protects insurers if total claims exceed a threshold' },

    // Specialized Insurance Types
    { value: 'telematics_based', label: 'Telematics-Based Risk Premium Insurance', description: 'Premiums adjusted based on actual fleet behaviour' },
    { value: 'short_term_spot', label: 'Short-Term / Spot Insurance', description: 'On-demand coverage for specific trips' },
    { value: 'high_value_cargo', label: 'High-Value / Sensitive Cargo Insurance', description: 'Electronics, pharmaceuticals, or perishable goods' },
    { value: 'loss_prevention', label: 'Loss Prevention or Security-Linked Policies', description: 'Premium discounts for GPS/e-lock compliance' },

    // Regulatory / Compliance Insurance
    { value: 'motor_third_party_frsc', label: 'Motor Third-Party Insurance (FRSC Required)', description: 'Required by FRSC for all fleet vehicles' },
    { value: 'cargo_customs_clearance', label: 'Cargo Insurance for Customs Clearance', description: 'Required to clear import/export shipments' },
    { value: 'port_operator_liability', label: 'Port Operator / Terminal Liability Insurance', description: 'For NPA-compliant terminals' },
  ];

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Policy Types Issued</h2>
        <p className="mt-1 text-sm text-gray-600">
          Select all types of insurance policies your company issues
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormMultiSelect
          label="Policy Types"
          id="policyTypes"
          name="policyTypes"
          options={policyTypeOptions}
          selectedValues={formData.policyTypes}
          onChange={handleChange}
          error={errors.policyTypes}
          description="Select all applicable policy types (multi-select allowed)"
          required
        />

        <div className="flex gap-4 pt-2">
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isFetching}
            className="flex-1 py-3 px-4 border border-transparent rounded-lg text-base font-semibold text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 cursor-pointer shadow-lg shadow-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isFetching ? 'Loading...' : isSubmitting ? 'Saving...' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsuranceStep3;
