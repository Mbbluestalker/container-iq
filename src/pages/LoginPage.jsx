import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../services/api';
import { setCredentials } from '../store/authSlice';
import { useAlert } from '../context/AlertContext';
import FormInput from '../components/common/FormInput';
import FormPasswordInput from '../components/common/FormPasswordInput';
import logo from '../assets/CIQ Logo 1.png';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSuccess, showError } = useAlert();

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const getOnboardingRedirect = (userData) => {
    const { userType, formCompleted, insuranceFormCompleted, shipperFormCompleted, fleetFormCompleted } = userData;

    // Check if basic signup is incomplete (step 1-3)
    if (formCompleted < 3) {
      return '/signup'; // Redirect to complete basic signup
    }

    // Check role-specific onboarding completion
    switch (userType) {
      case 'insurance_company':
        if (insuranceFormCompleted < 4) {
          return '/onboarding/insurance';
        }
        break;
      case 'shipper':
        if (shipperFormCompleted < 4) {
          return '/onboarding/shipper';
        }
        break;
      case 'fleet_operator':
        if (fleetFormCompleted < 3) {
          return '/onboarding/fleet';
        }
        break;
      // Add other user types when their onboarding is ready
      default:
        break;
    }

    // If all onboarding is complete, go to dashboard
    return '/dashboard';
  };

  // Demo users for user types without backend support yet
  const DEMO_USERS = {
    'shipping@demo.com': {
      password: 'demo123',
      userData: {
        id: 'DEMO-SHIPPING-001',
        email: 'shipping@demo.com',
        userType: 'shipping_company',
        formCompleted: 3,
        shippingFormCompleted: 4,
        profile: {
          fullName: 'Maersk Line Demo',
          phoneNumber: '+234-800-000-0001',
        },
        organization: {
          legalEntityName: 'Maersk Line Nigeria',
          cacRegistrationNumber: 'RC-DEMO-001',
        },
      },
    },
    'terminal@demo.com': {
      password: 'demo123',
      userData: {
        id: 'DEMO-TERMINAL-001',
        email: 'terminal@demo.com',
        userType: 'terminal_operator',
        formCompleted: 3,
        terminalFormCompleted: 4,
        profile: {
          fullName: 'Apapa Terminal Demo',
          phoneNumber: '+234-800-000-0002',
        },
        organization: {
          legalEntityName: 'Apapa Port Terminal',
          cacRegistrationNumber: 'RC-DEMO-002',
        },
      },
    },
    'admin@demo.com': {
      password: 'demo123',
      userData: {
        id: 'DEMO-ADMIN-001',
        email: 'admin@demo.com',
        userType: 'super_admin',
        formCompleted: 3,
        profile: {
          fullName: 'Tsaron Tech Admin',
          phoneNumber: '+234-800-000-0003',
        },
        organization: {
          legalEntityName: 'Tsaron Tech Back Office',
          cacRegistrationNumber: 'RC-DEMO-003',
        },
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      // Check if this is a demo user
      const demoUser = DEMO_USERS[formData.email.toLowerCase()];

      if (demoUser && formData.password === demoUser.password) {
        // Demo login - bypass API
        const userData = demoUser.userData;

        dispatch(setCredentials({
          token: 'DEMO-TOKEN-' + Date.now(),
          user: userData,
        }));

        showSuccess('Demo Login successful! Redirecting...');

        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
        return;
      }

      // Real API login for backend-supported user types
      try {
        const response = await login(formData).unwrap();

        // Store token and user data
        if (response.data?.token) {
          const userData = {
            id: response.data.id,
            email: response.data.email,
            userType: response.data.userType,
            formCompleted: response.data.formCompleted,
            insuranceFormCompleted: response.data.insuranceFormCompleted,
            shipperFormCompleted: response.data.shipperFormCompleted,
            fleetFormCompleted: response.data.fleetFormCompleted,
            profile: response.data.profile,
            organization: response.data.organization,
            fleet: response.data.fleet,
            insurance: response.data.insurance,
            shipper: response.data.shipper,
          };

          dispatch(setCredentials({
            token: response.data.token,
            user: userData,
          }));

          showSuccess('Login successful! Redirecting...');

          // Determine where to redirect based on onboarding status
          const redirectPath = getOnboardingRedirect(userData);

          setTimeout(() => {
            navigate(redirectPath);
          }, 1000);
        }
      } catch (error) {
        showError(error?.data?.message || 'Login failed. Please check your credentials.');
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-[#0d2847] to-secondary relative overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-start px-16 text-white">
          <img src={logo} alt="ContainerIQ Logo" className="h-16 mb-8" />
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Welcome Back to<br />ContainerIQ
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-md">
            Continue managing your container logistics with real-time insights and analytics.
          </p>

          {/* Feature highlights */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Real-Time Tracking</h3>
                <p className="text-white/80 text-sm">Monitor your containers 24/7</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Secure & Compliant</h3>
                <p className="text-white/80 text-sm">NIIRA compliant platform</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Advanced Analytics</h3>
                <p className="text-white/80 text-sm">Data-driven decision making</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 overflow-y-auto bg-gray-50">
        <div className="min-h-full flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <img src={logo} alt="ContainerIQ Logo" className="h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-primary">Welcome Back</h2>
            </div>

            {/* Login Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Access your ContainerIQ dashboard
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <FormInput
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="you@company.com"
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-secondary border-gray-300 rounded focus:ring-secondary cursor-pointer"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="text-secondary font-semibold hover:underline">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-base font-semibold text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 cursor-pointer shadow-lg shadow-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-secondary font-semibold hover:underline">
                Sign up
              </Link>
            </p>

            {/* Demo Credentials Section */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-3">Demo Accounts (Password: demo123)</h3>
              <div className="space-y-2 text-xs text-blue-800">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Shipping Company:</span>
                  <code className="bg-white px-2 py-1 rounded">shipping@demo.com</code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Terminal Operator:</span>
                  <code className="bg-white px-2 py-1 rounded">terminal@demo.com</code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Super Admin:</span>
                  <code className="bg-white px-2 py-1 rounded">admin@demo.com</code>
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-3 italic">
                * Use these credentials to preview different user dashboards
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
