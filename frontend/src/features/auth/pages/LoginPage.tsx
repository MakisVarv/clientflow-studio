import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import authService from '../services/authService';
import authStorage from '../services/authStorage';
import { useNavigate } from 'react-router-dom';

// Validation rules
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must contain at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      const response = await authService.login(data);

      authStorage.setAccessToken(response.access_token);

      navigate('/dashboard');
    } catch (error) {
      console.error('LOGIN ERROR:', error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            ClientFlow
          </h1>

          <p className="mt-2 text-slate-500">
            Sign in to your CRM account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* EMAIL */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              {...register('email')}
              placeholder="admin@example.com"
              className="
                                w-full rounded-lg
                                border border-slate-300
                                px-4 py-3
                                outline-none
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-100
                            "
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              {...register('password')}
              placeholder="Enter your password"
              className="
                                w-full rounded-lg
                                border border-slate-300
                                px-4 py-3
                                outline-none
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-100
                            "
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="
                            w-full rounded-lg
                            bg-blue-600
                            px-4 py-3
                            font-medium text-white
                            hover:bg-blue-700
                        "
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
