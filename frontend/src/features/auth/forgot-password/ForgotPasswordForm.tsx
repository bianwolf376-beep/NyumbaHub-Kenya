'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

import { AuthService } from '@/services/auth/auth.service';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    if (loading) return;

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      toast.error('Please enter your email.');
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      toast.error('Please enter a valid email.');
      return;
    }

    setLoading(true);

    try {
      await AuthService.forgotPassword(
        trimmedEmail,
      );

      toast.success(
        'If an account exists with that email, a password reset link has been sent.',
      );

      setEmail('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
            'Unable to process your request.',
        );
      } else {
        toast.error(
          'Something went wrong. Please try again.',
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="email"
        autoComplete="email"
        placeholder="Enter your email"
        className="w-full rounded-xl border p-3"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-sky-600 p-3 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? 'Sending...'
          : 'Send Reset Link'}
      </button>
    </form>
  );
}