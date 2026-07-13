'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/providers/AuthProvider';
import { AuthService } from '@/services/auth/auth.service';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Minimum 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      const response = await AuthService.login({
        email: data.email.trim().toLowerCase(),
        password: data.password,
      });

      const token = response.data.access_token;

      if (!token) {
        throw new Error('Access token not returned.');
      }

      await login(token);

      toast.success('Login successful.');

      router.push('/dashboard');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
            'Invalid email or password.',
        );
      } else {
        toast.error('Something went wrong. Please try again.');
      }

      console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block font-medium">
          Email
        </label>

        <input
          {...register('email')}
          type="email"
          placeholder="john@example.com"
          className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Password
        </label>

        <input
          {...register('password')}
          type="password"
          placeholder="••••••••"
          className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-sky-600 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
}